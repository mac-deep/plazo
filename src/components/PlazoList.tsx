import PlazoItem from './PlazoItem';
import { useGetPlazosByUserId } from '../hooks/usePlazo';

export default function PlazoList() {
  const { isLoading, isFetched, isError, error, data: plazoList } = useGetPlazosByUserId();

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
      <h2>Ongoing Plazo List:</h2>
      <ul className="flex flex-col gap-4">
        {plazoList?.map((plazo) => <PlazoItem plazo={plazo} key={plazo.id} />)}
      </ul>
    </>
  );
}
