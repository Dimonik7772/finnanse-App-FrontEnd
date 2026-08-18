import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TransactionClientPage from "./transactionClientPage";
import { fetchTransactionServer } from "@/lib/api/serverApi";

export default async function Transactions() {
  const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   // , undefined, "asc"
  //   queryKey: ["transaction", 1, ""],
  //   // , undefined, "asc"
  //   queryFn: () => fetchTransactionServer(1, ""),
  //   retry: false,
  // });

  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    <TransactionClientPage />
    // </HydrationBoundary>
  );
}
