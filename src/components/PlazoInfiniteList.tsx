import { useGetPlazosByUserId } from '../hooks/usePlazo';
import PlazoInfiniteItem from './PlazoInfiniteItem';

export default function PlazoInfiniteList() {
  const {
    isLoading,
    isFetched,
    isError,
    error,
    data: plazoList,
  } = useGetPlazosByUserId({ type: 'INFINITE' });

  if (isLoading) {
    return (
      <ul className="flex flex-col gap-4 animate-blink">
        {[0, 1, 2].map((i) => (
          <li key={i} className="cursor-pointer bg-gray-200 h-16 lg:h-12" />
        ))}
      </ul>
    );
  }

  if (isError) return <p>{error as string}</p>;
  if (isFetched && !plazoList) return <p>No Plazo Found</p>;

  return (
    <>
      <ul className="flex flex-col gap-4">
        {plazoList?.map((plazo) => (
          <PlazoInfiniteItem key={plazo.id} plazo={plazo} />
        ))}
      </ul>
    </>
  );
}
