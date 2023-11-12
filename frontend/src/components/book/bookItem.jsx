import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./bookItem.css";

// Book item function
function BookItem({ book, onBorrow, refreshBooks }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [borrowing, setBorrowing] = useState(false);

  // Handle borrow
  const handleBorrow = async () => {
    setBorrowing(true);
    try {
      await onBorrow(book._id);
    } catch (error) {
      console.error("Error borrowing book", error);
    }
    setBorrowing(false);
  };

  // Function to determine the class based on book status
  const statusClass = (status) => {
    if (status === "available") return "status-available";
    if (status === "on loan") return "status-on-loan";
    if (status === "due today") return "status-due-today";
    return "";
  };

  // Calculate expected return date (5 days from now)
  const calculateReturnDate = () => {
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 7);
    return returnDate.toLocaleDateString();
  };

  return (
    <div className="book-item">
      <h3>{book.title}</h3>
      {book.image && (
        <img src={book.image} alt={book.title} className="book-image" />
      )}
      <div className="book-details">
        <p>{book.description}</p>
        <p className={`status ${statusClass(book.status)}`}>
          Status: {book.status}
        </p>
      </div>
      {book.status === "available" ? (
        <div>
          <p>Expected Return Date: {calculateReturnDate()}</p>
          <button
            className="borrow-button"
            onClick={handleBorrow}
            disabled={borrowing}
          >
            {borrowing ? "Borrowing..." : "Borrow"}
          </button>
        </div>
      ) : (
        <div>
          {book.borrower && (
            <>
              <p>
                Borrower: {book.borrower.firstName} {book.borrower.lastName}
              </p>
              <p>Email: {book.borrower.email}</p>
            </>
          )}
          <p>
            Expected Return Date:{" "}
            {book.expectedReturnDate &&
              new Date(book.expectedReturnDate).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
}

export default BookItem;
