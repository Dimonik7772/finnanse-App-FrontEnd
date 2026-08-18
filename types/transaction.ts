type category = {
  _id: string;
  name: string;
  icon: string;
};

export type transactions = {
  _id: string;
  amount: number;
  type: "expense" | "income";
  category: category;
  description: string;
  date: string;
};

export type TransactionResponse = {
  page: number;
  perPage: number;
  totalTransaction: number;
  totalPages: number;
  transactions: transactions[];
};

export type CreateTransaction = {
  amount: number;
  type: "expense" | "income";
  category: string;
  description: string;
};
