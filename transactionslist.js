import React, { useState, useEffect } from "react";
import Transaction from "./Transaction";
import AddTransactionForm from "./AddTransactionForm";
import Search from "./Search";

function TransactionsList() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  // Fetch transactions from backend
  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
        setFilteredTransactions(data);
      });
  }, []);

  // Handle adding a new transaction
  const handleAddTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
    setFilteredTransactions([...transactions, newTransaction]);
  };

  // Handle searching for transactions
  const handleSearch = (searchTerm) => {
    const filtered = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  const handleDelete = (transactionId) => {
    fetch(`http://localhost:8001/transactions/${transactionId}`, {
      method: "DELETE",
    }).then(() => {
      const updatedTransactions = transactions.filter(
        (transaction) => transaction.id !== transactionId
      );
      setTransactions(updatedTransactions);
      setFilteredTransactions(updatedTransactions);
    });
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      <AddTransactionForm onAddTransaction={handleAddTransaction} />
      <table className="ui celled striped padded table">
        <thead>
          <tr>
            <th>
              <h3 className="ui center aligned header">Date</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Description</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Category</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Amount</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Actions</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <Transaction
              key={transaction.id}
              transaction={transaction}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsList;
