import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import BookItem from "./bookItem";
import BookFilter from "./bookFilter";
import "./bookList.css";

// Book list function
function BookList() {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState("all");

  // Fetching all books
  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).token
        : null;
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await axios.get("http://localhost:5000/api/books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { status: filter === "all" ? "" : filter },
      });

      if (response.data) {
        setBooks(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  useEffect(() => {
    //console.log(`Filter set to: ${filter}`);
    fetchBooks();
  }, [filter]);

  // Borrow books
  const borrowBook = async (bookId, returnDate) => {
    try {
      const token = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).token
        : null;
      if (!token) {
        console.error("No token found");
        return;
      }
      await axios.post(
        `http://localhost:5000/api/books/borrow/${bookId}`,
        {
          expectedReturnDate: returnDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchBooks(); // Refresh the book list after borrowing
    } catch (error) {
      console.error("Error borrowing book:", error);
    }
  };

  // Checking all books on loan with 'due today' date
  const isDueToday = (book) => {
    if (book.status !== "on loan" || !book.expectedReturnDate) {
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set today's date at the start of the day in local time

    const expectedReturn = new Date(book.expectedReturnDate);
    expectedReturn.setHours(0, 0, 0, 0); // Set expected return date at the start of the day in local time

    return today.getTime() === expectedReturn.getTime();
  };

  // Filter books using Memo
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      switch (filter) {
        case "all":
          return true; // Return all books
        case "available":
          return book.status === "available";
        case "on loan":
          return book.status === "on loan";
        case "due today":
          const dueTodayBooks = books.filter((book) => isDueToday(book));
          return dueTodayBooks;
        default:
          return true;
      }
    });
  }, [books, filter]);

  // Function to determine the heading based on the filter
  const getHeadingTitle = () => {
    switch (filter) {
      case "all":
        return "All Books";
      case "available":
        return "Available Books";
      case "on loan":
        return "Books On Loan";
      case "due today":
        return "Books Due Today";
      default:
        return "Book List";
    }
  };

  //console.log(`Filtered books for '${filter}':`, filteredBooks);

  return (
    <div className="book-list-container">
      <BookFilter setFilter={setFilter} />
      <h2>{getHeadingTitle()}</h2>
      {filteredBooks.length > 0 ? (
        filteredBooks.map((book) => (
          <BookItem
            key={book._id}
            book={book}
            onBorrow={borrowBook}
            refreshBooks={fetchBooks}
          />
        ))
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );
}

export default BookList;
