import { fetchTransactionById } from "@/lib/api/clinetApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TransactionPreviewClient from "./transactionPreviewClient";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TransactionPreview({ params }: Props) {
  const { id } = await params;

  const queryClinet = new QueryClient();

  await queryClinet.prefetchQuery({
    queryKey: ["transaction", id],
    queryFn: () => fetchTransactionById(id),
  });
  <HydrationBoundary state={dehydrate(queryClinet)}>
    <TransactionPreviewClient id={id} />
  </HydrationBoundary>;
}
