import { fetchTransactionById } from "@/lib/api/clinetApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TransactionDetails from "./transactionDetails";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function transactionPreview({ params }: Props) {
  const { id } = await params;
  // const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ["transaction", id],
  //   queryFn: () => fetchTransactionById(id),
  // retry: false,

  // });

  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    <TransactionDetails id={id} />
    // </HydrationBoundary>
  );
}
