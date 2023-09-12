import moment from 'moment';
import { useAuth } from '../hooks/useAuth';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { user } = useAuth();
  const [time, setTime] = useState<string>();

  useEffect(() => {
    setInterval(() => {
      setTime(moment(new Date()).format('DD MMM, YYYY hh:mm:ss'));
    }, 1000);
  }, []);

  return (
    <nav className="flex flex-col md:flex-row gap-2 justify-between">
      <div className="bg-black items-center flex text-white flex-1 p-4">
        <div className="flex-1 flex flex-col md:flex-row  md:items-center md:gap-2 leading-none">
          <span className="font-black  text-3xl tracking-widest">PLAZO</span>
          <span className="italic text-xs font-light leading-none">
            of <span>{user ? user.user_metadata.name : 'World'}</span>
          </span>
        </div>
        <span className="text-right">{time}</span>
      </div>

      <Sidebar />
    </nav>
  );
}
