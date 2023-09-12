import useSupabase from '../hooks/useSupabase';

export const useSignIn = () => {
  const { auth } = useSupabase();

  const signInWithGoogle = async () => {
    const { data, error } = await auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
    return { data, error };
  };

  return { signInWithGoogle };
};

export const useSignOut = () => {
  const { auth } = useSupabase();
  const logout = async () => await auth.signOut();
  return { logout };
};
