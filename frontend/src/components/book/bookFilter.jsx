import React from "react";
import "./bookFilter.css";

// Book filter buttons
function BookFilter({ setFilter }) {
  return (
    <div className="book-filter">
      <button onClick={() => setFilter("all")}>All Books</button>
      <button onClick={() => setFilter("available")}>Available</button>
      <button onClick={() => setFilter("on loan")}>On Loan</button>
      <button onClick={() => setFilter("due today")}>Due Today</button>
    </div>
  );
}

export default BookFilter;
