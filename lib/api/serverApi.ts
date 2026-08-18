import { TransactionResponse } from "@/types/transaction";
import { api } from "./api";

import { cookies } from "next/headers";

export const fetchTransactionServer = async (
  page: number,
  search?: string,
  amount?: number,
  sort?: "asc" | "desc",
) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const response = await api.get<TransactionResponse>("/transaction", {
    params: {
      page,
      perPage: 8,
      ...(search ? { search } : {}),
      ...(amount !== undefined ? { amount } : {}),
      ...(sort ? { sort } : {}),
    },
    headers: {
      Cookie: cookieHeader,
    },
  });
  return response.data;
};
