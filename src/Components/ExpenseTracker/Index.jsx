import { useMemo, useState } from "react";
import "./styles.css";

const transObj = {
  //   id: 1,
  title: "",
  type: "income",
  amount: "",
};

const ExpenseTracker = () => {
  // Initilize useState using transactions, title, amount, type, showForm and search
  const [showForm, setShowForm] = useState(false);
  const [transaction, setTransaction] = useState(transObj);
  const [transactionList, setTransactionList] = useState([]);
  const [filteredTransactionList, setFilteredTransactionList] = useState([]);
  const [search, setSearch] = useState("");

  //create filteredTransactions

  //Calculate balance using totalIncome and totalExpense

  const handleAddTransaction = () => {
    // complete logic to create a new transaction object
    // update the state and reset form fields
    const isAllFieldValid = Object.values(transaction).every(
      (value) => value.length > 0
    );
    if (isAllFieldValid) {
      const updatedTransactionList = [
        ...transactionList,
        {
          ...transaction,
          id:
            transactionList.length === 0
              ? 1
              : transactionList[transactionList.length - 1].id + 1,
        },
      ];
      setTransactionList(updatedTransactionList);
      setFilteredTransactionList(updatedTransactionList);
      setTransaction(transObj);
      setShowForm(false);
      handleSearch(search, updatedTransactionList);
    }
  };

  const handleDelete = (id) => {
    // implement delete logic
    const updatedTransactionList = transactionList.filter(
      (item) => item.id !== id
    );
    setTransactionList(updatedTransactionList);
    setFilteredTransactionList(updatedTransactionList);
    handleSearch(search, updatedTransactionList);
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleTransaction = (e, key) => {
    setTransaction((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const [balance, income, expense] = useMemo(() => {
    let newBalance = 0;
    let totalIncome = 0;
    let totalExpense = 0;

    transactionList.forEach((item) => {
      if (item.type === "income") {
        totalIncome += Number(item.amount);
      } else {
        totalExpense += Number(item.amount);
      }
    });

    newBalance = totalIncome - totalExpense;

    return [newBalance, totalIncome, totalExpense];
  }, [transactionList]);

  const handleOnChangeSearch = (e) => {
    const { value } = e.target;
    handleSearch(value, transactionList);
    setSearch(value);
  };

  const handleSearch = (value, list) => {
    const updatedTransactionList = list.filter((item) =>
      item.title.includes(value)
    );
    setFilteredTransactionList(updatedTransactionList);
  };

  return (
    <div className="tracker-container">
      <h2>Expense Tracker</h2>

      <div className="header-container">
        <div className="balance">
          <h3 data-testid="balance-amount">Balance: ₹{balance}</h3>
        </div>

        <button
          className="toggle-form-button"
          data-testid="toggle-form-button"
          onClick={handleShowForm}
        >
          {showForm ? "Close Form" : "Open Form"}
        </button>
      </div>

      {showForm && (
        <div className="form">
          <input
            type="text"
            data-testid="title-input"
            placeholder="Title"
            value={transaction.title}
            onChange={(e) => handleTransaction(e, "title")}
          />
          <input
            type="number"
            data-testid="amount-input"
            placeholder="Amount"
            min="0"
            value={transaction.amount}
            onChange={(e) => handleTransaction(e, "amount")}
          />
          <select
            data-testid="type-select"
            value={transaction.type}
            onChange={(e) => handleTransaction(e, "type")}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <button data-testid="add-button" onClick={handleAddTransaction}>
            Add Transaction
          </button>
        </div>
      )}

      <div className="summary">
        <div data-testid="income-amount">Income: ₹{income}</div>
        <div data-testid="expenses-amount">Expense: ₹{expense}</div>
      </div>

      <input
        type="text"
        data-testid="search-input"
        placeholder="Search..."
        className="search"
        value={search}
        onChange={handleOnChangeSearch}
      />
      {filteredTransactionList.length === 0 ? (
        <div className="no-transactions" data-testid="no-transactions">
          No transactions found
        </div>
      ) : (
        <ul className="transactions">
          {filteredTransactionList.map((item, index) => (
            <li
              key={index}
              className={`${item.type === "income" ? "income" : "expense"}`}
              data-testid="transaction-item"
            >
              {item.title}: ₹{item.amount}
              <button
                type="button"
                data-testid="delete-button"
                onClick={() => handleDelete(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseTracker;
