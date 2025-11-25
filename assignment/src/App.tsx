import { useProjections } from "./hooks/useProjections";
import "./App.css";
import { Chart, Loader, ErrorPage } from "./component";

function App() {
  const { data, isLoading, error } = useProjections();

  if (isLoading) return <Loader.FullPage />;
  if (error) return <ErrorPage error={error || new Error('Unknown error')} />

  return (
    <div className="flex flex-col gap-5 padding-5">
      <Chart data={data} />
    </div>
  );
}

export default App;
