import { useState } from 'react';
import PlazoList from './PlazoFiniteList';
import PlazoAddFiniteButton from './PlazoAddFiniteButton';
import PlazoInfiniteList from './PlazoInfiniteList';
import PlazoAddInfiniteButton from './PlazoAddInfiniteButton';

export default function UserContent() {
  const [activeTab, setActiveTab] = useState<'FINITE' | 'INFINITE'>('FINITE');

  return (
    <section className="w-full border border-black">
      <div className="text-center flex">
        <button
          className={`px-4 py-2 w-full ${
            activeTab == 'FINITE' ? 'text-black' : 'bg-black text-white'
          }`}
          onClick={() => setActiveTab('FINITE')}
        >
          FINITE
        </button>
        <button
          className={`px-4 py-2 w-full ${
            activeTab == 'INFINITE' ? 'text-black' : 'bg-black text-white'
          }`}
          onClick={() => setActiveTab('INFINITE')}
        >
          INFINITE
        </button>
      </div>

      {activeTab === 'FINITE' && (
        <div className="p-2 flex flex-col gap-4">
          <PlazoList />
          <PlazoAddFiniteButton />
        </div>
      )}
      {activeTab === 'INFINITE' && (
        <div className="p-2 flex flex-col gap-4">
          <PlazoInfiniteList />
          <PlazoAddInfiniteButton />
        </div>
      )}
    </section>
  );
}
