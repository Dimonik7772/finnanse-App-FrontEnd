import { transactions } from "@/types/transaction";
import { formatDate } from "../formatDate/formatDate";
import Link from "next/link";

type TransactionListProps = {
  transactions: transactions[];
};

export default function TransactionList({
  transactions,
}: TransactionListProps) {
  return (
    <ul>
      {transactions.map((transaction) => {
        const { date, time } = formatDate(transaction.date);

        return (
          <li key={transaction._id}>
            <h2>{transaction.amount}</h2>
            <p>{transaction.description}</p>
            <h2>{transaction.category.name}</h2>
            <p>{transaction.category.icon}</p>
            <Link href={`/transaction/${transaction._id}`}>View Detail</Link>
            <p>{date}</p>
            <p>{time}</p>
          </li>
        );
      })}
    </ul>
  );
}
