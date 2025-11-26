import { useProjections } from "./hooks/useProjections";
import { Chart, Loader, ErrorPage } from "./component";

function App() {
  const { data, isLoading, error } = useProjections();

  if (isLoading) return <Loader.FullPage />;
  if (error) return <ErrorPage error={error || new Error('Unknown error')} />

  return (
    <div className="flex flex-col py-3 px-4">
      <Chart data={data} />
    </div>
  );
}

export default App;
