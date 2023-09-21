import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import UserContent from './components/UserContent';
import WelcomeScreen from './components/WelcomeScreen';

function Content() {
  const { user, loading, error } = useAuth();
  if (!loading && error) <p>{error.message}</p>;

  if (!user) {
    return <WelcomeScreen />;
  } else {
    return <UserContent />;
  }
}

function App() {
  return (
    <>
      <div className="flex justify-between flex-col gap-2 p-2 min-h-screen">
        <Navbar />
        <main className="flex flex-col justify-start items-start flex-1">
          <Content />
        </main>
        <Footer />
      </div>
    </>
  );
}

function AuthApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AuthApp;
