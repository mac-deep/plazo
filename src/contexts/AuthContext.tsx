import { ReactElement, createContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import useSupabase from '../hooks/useSupabase';

export type AuthState = {
  user: User | undefined;
  loading: boolean;
  error?: Error | undefined;
};

export const AuthContext = createContext<AuthState>({ loading: false, user: undefined });

const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const { auth } = useSupabase();

  useEffect(() => {
    async function getSession() {
      setLoading(true);
      await auth
        .getSession()
        .then((session) => {
          if (session.error) {
            setError(session.error);
          }

          if (!session.data.session?.user) {
            setError(new Error('No user found'));
          } else {
            setUser(session.data.session.user);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }

    getSession();
  }, []);

  return <AuthContext.Provider value={{ user, loading, error }}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
