"use client";

import { formatDate } from "@/components/formatDate/formatDate";
import Modal from "@/components/modal/modal";
import { fetchTransactionById } from "@/lib/api/clinetApi";
import { useQuery } from "@tanstack/react-query";

type Props = {
  id: string;
};

export default function TransactionPreviewClient({ id }: Props) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["transaction", id],
    queryFn: () => fetchTransactionById(id),
    refetchOnMount: false,
    retry: false,
  });

  if (!data) return <p>Transaction not found</p>;

  const { date, time } = formatDate(data.date);
  return (
    <Modal>
      <div>
        <div>
          <div>
            <h2>{data.category.name}</h2>
            <h3>{data.category.icon}</h3>
          </div>
          <p>{data.amount}</p>
          <p>{data.description}</p>
          <p>{date}</p>
          <p>{time}</p>
        </div>
      </div>
    </Modal>
  );
}
