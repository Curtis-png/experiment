import React from "react";

function Transaction({ transaction }) {
  return (
    <tr>
      <td>{transaction.date}</td>
      <td>{transaction.description}</td>
      <td>{transaction.category}</td>
      <td>{transaction.amount.toFixed(2)}</td>
    </tr>
  );
}

export default Transaction;
