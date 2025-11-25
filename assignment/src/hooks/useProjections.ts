import { useQuery } from "@tanstack/react-query";
import type { Projection } from "../types/projections";

const QUERY_KEY = ["projections"];

const getData = async (): Promise<Projection[]> => {
  try {
    const response = await fetch(
      "https://692007e431e684d7bfcb6c9a.mockapi.io/projection/projection"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useProjections = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getData,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};
