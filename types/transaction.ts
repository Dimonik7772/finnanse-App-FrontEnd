type category = {
  _id: string;
  name: string;
  icon: string;
};

export type transaction = {
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
  transaction: transaction[];
};

export type CreateTransaction = {
  amount: number;
  type: "expense" | "income";
  category: string;
  description: string;
};
