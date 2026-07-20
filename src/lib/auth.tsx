import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from './supabase';

/**
 * Mobile-based auth. We synthesize a stable email from the mobile number
 * (<mobile>@mymentors.app) and use Supabase email/password under the hood.
 * This avoids magic links / email confirmation entirely.
 */

export type StudentProfile = {
  id: string;
  mobile: string;
  father_name: string;
  father_mobile: string;
  photo_url: string | null;
};

type AuthCtx = {
  session: Session | null;
  user: User | null;
  profile: StudentProfile | null;
  loading: boolean;
  signUp: (data: {
    mobile: string;
    password: string;
    fatherName: string;
    fatherMobile: string;
    photoFile?: File | null;
  }) => Promise<{ error: string | null }>;
  signIn: (data: {
    mobile: string;
    password: string;
  }) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthCtx>({
  session: null,
  user: null,
  profile: null,
  loading: true,
  signUp: async () => ({ error: 'not implemented' }),
  signIn: async () => ({ error: 'not implemented' }),
  signOut: async () => {},
});

const emailFor = (mobile: string) => `${mobile.replace(/\D/g, '')}@mymentors.app`;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (uid: string) => {
    const { data } = await supabase
      .from('students')
      .select('id, mobile, father_name, father_mobile, photo_url')
      .eq('id', uid)
      .maybeSingle();
    setProfile((data as StudentProfile) || null);
  };

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      if (data.session?.user) {
        loadProfile(data.session.user.id).finally(() => mounted && setLoading(false));
      } else {
        setLoading(false);
      }
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_evt, sess) => {
      setSession(sess);
      if (sess?.user) {
        loadProfile(sess.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const signUp: AuthCtx['signUp'] = async ({
    mobile,
    password,
    fatherName,
    fatherMobile,
    photoFile,
  }) => {
    const cleanMobile = mobile.replace(/\D/g, '');
    if (cleanMobile.length < 10) return { error: 'Enter a valid mobile number.' };
    if (password.length < 4)
      return { error: 'Password must be at least 4 characters.' };

    const email = emailFor(cleanMobile);

    // Sign up — email confirmation is OFF, so this returns a session immediately.
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return { error: error.message };
    const user = data.user;
    if (!user) return { error: 'Sign-up failed. Please try again.' };

    // Upload photo (optional) to private student-photos bucket
    let photoPath: string | null = null;
    if (photoFile) {
      const ext = photoFile.name.split('.').pop() || 'jpg';
      const path = `${user.id}/photo.${ext}`;
      const { error: upErr } = await supabase.storage
        .from('student-photos')
        .upload(path, photoFile, { upsert: true });
      if (!upErr) photoPath = path;
    }

    // Insert student profile row
    const { error: insertErr } = await supabase.from('students').insert({
      id: user.id,
      mobile: cleanMobile,
      father_name: fatherName,
      father_mobile: fatherMobile,
      photo_url: photoPath,
    });
    if (insertErr) {
      // best-effort cleanup of orphan auth user
      await supabase.auth.signOut();
      return { error: 'Could not save your profile. Try again.' };
    }

    await loadProfile(user.id);
    return { error: null };
  };

  const signIn: AuthCtx['signIn'] = async ({ mobile, password }) => {
    const cleanMobile = mobile.replace(/\D/g, '');
    if (cleanMobile.length < 10) return { error: 'Enter a valid mobile number.' };
    const { error } = await supabase.auth.signInWithPassword({
      email: emailFor(cleanMobile),
      password,
    });
    if (error) return { error: 'Invalid mobile number or password.' };
    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        profile,
        loading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
