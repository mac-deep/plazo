import Footer from './components/Footer';
import Navbar from './components/Navbar';
import PlazoAddButton from './components/PlazoAddButton';
import PlazoList from './components/PlazoList';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';

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

function Content() {
  const { user, loading, error } = useAuth();
  if (!loading && error) <p>{error.message}</p>;

  if (!user) {
    return <WelcomeScreen />;
  } else {
    return <AuthenticatedUserContent />;
  }
}

function AuthenticatedUserContent() {
  return (
    <section className="w-full">
      {/* <div className=" border mb-4 text-center   flex">
        <div className="px-4 border-black py-2 bg-black text-white w-full">Limited</div>
        <div className="px-4 border border-black py-2 w-full">Open</div>
      </div> */}
      <PlazoList />
      <PlazoAddButton />
    </section>
  );
}

function WelcomeScreen() {
  return (
    <div className="flex-1 w-full bg-black flex flex-col justify-center text-white items-center text-center font-serif">
      <p className="text-7xl  font-extrabold ">Value your Time!</p>
      <span>Dont let it slip!</span>
    </div>
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
