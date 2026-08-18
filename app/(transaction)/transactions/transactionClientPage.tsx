"use client";

import TransactionList from "@/components/trnsactionList/transactionList";
import { fetchTransaction } from "@/lib/api/clinetApi";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function TransactionClientPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // amount, sort

  const handleSearch = useDebouncedCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, 500);
  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryKey: ["transaction", currentPage, searchQuery],
    queryFn: () => fetchTransaction(currentPage, searchQuery),
    placeholderData: keepPreviousData,
    retry: false,
  });

  return (
    <div className="container">
      {data && data.transactions.length > 0 && (
        <TransactionList transactions={data.transactions} />
      )}
    </div>
  );
}
