import React from "react";
import Navbar from "./navbar";
import BookList from "./book/bookList";
import "./dashboard.css";

// Dashboard
function Dashboard() {
  const userEmail = JSON.parse(localStorage.getItem("user")).email;

  return (
    <>
      <Navbar userEmail={userEmail} />
      <div className="dashboard-container">
        <aside className="filter-sidebar"></aside>
        <main className="book-content">
          <BookList />
        </main>
      </div>
    </>
  );
}

export default Dashboard;
