import React from "react";
import NewBookForm from "./NewBookForm";
import BookList from "./BookList";

export default function Book(props) {
  return (
    <div className="col-12 col-lg-6 col-xl-4">
      <div className="card bg-dark text-light mb-3" id="movie-card">
        <div className="card-header">
          <NewBookForm />
        </div>
        <div className="card-body">
          <BookList />
        </div>
      </div>
    </div>
  );
}
