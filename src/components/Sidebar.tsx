import Button from './Button';
import moment from 'moment';
import { useAuth } from '../hooks/useAuth';
import { useSignIn, useSignOut } from '../service/auth';
import { useRef } from 'react';

export default function Sidebar() {
  const { user, loading } = useAuth();
  const { signInWithGoogle } = useSignIn();
  const { logout } = useSignOut();

  const sidebarRef = useRef<HTMLDialogElement>(null);

  const handleSignOut = async () => {
    const { error } = await logout();
    if (!error) {
      location.reload();
    }
  };

  const handleSignIn = async () => {
    await signInWithGoogle();
  };

  if (loading) return <span className="animate-blink">Loading...</span>;

  if (!user)
    return (
      <Button variant="black" onClick={handleSignIn}>
        <span className="flex items-center justify-center text-lg gap-2 font-bold">
          <img
            className="w-5 inline h-5"
            src="https://cdn.freebiesupply.com/logos/large/2x/google-icon-logo-black-and-white.png"
          />
          Login
        </span>
      </Button>
    );

  return (
    <>
      <Button
        className="fixed bottom-4 right-4  md:relative"
        variant="black"
        onClick={() => sidebarRef.current?.showModal()}
      >
        MENU
      </Button>
      <dialog ref={sidebarRef}>
        <aside className="flex flex-col justify-between fixed p-4 bg-black text-white right-0 top-0 bottom-0 w-full md:w-80">
          <button
            className="absolute top-0 right-0 m-4"
            onClick={() => sidebarRef.current?.close()}
          >
            [X]
          </button>
          <div className="flex-col flex items-start w-full font-light">
            <div className="w-32 h-32 border border-white mb-8">Avatar</div>
            <p className="font-bold text-2xl">{user?.user_metadata.name}</p>
            <p className="text-xs opacity-40">Email: {user?.user_metadata.email}</p>
            <p className="text-xs opacity-40">
              Account created on: {moment(user?.created_at).format('DD MMM, YYYY')}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Button variant="black" onClick={handleSignOut}>
              Logout
            </Button>
            {/* <Button variant="red">Delete User</Button> */}
          </div>
        </aside>
      </dialog>
    </>
  );
}
