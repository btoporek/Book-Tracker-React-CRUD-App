import React, { useState, useEffect, Fragment } from "react";
import Table from "react-bootstrap/Table";
import { InputGroup } from "react-bootstrap";

export default function BookList(props) {
  const [books, setBooks] = useState([{}]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const endpoint = "https://63b347155901da0ab37bb978.mockapi.io/api/books";

  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  const getBooks = () => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => setBooks(data));
  };

  const deleteBook = (bookId) => {
    console.log("delete is working");
    fetch(`${endpoint}/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => getBooks());
  };

  const handleSubmit = (e) => {
    console.log("submitted");
    e.preventDefault();
    // const fieldName = e.target.getAttribute("name");
    // const fieldValue = e.target.value;
    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({
        title: title,
        author: author,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => getBooks());
    setTitle("");
    setAuthor("");
  };

  return (
    <div className="container" key={books.id}>
      <div className="card bg-light">
        <header className="App-header card-header">
          <h1>My Book Tracker</h1>
        </header>
        <InputGroup className="form-control">
          <label>Log New Book: &nbsp;</label>
          <input
            type="text"
            id="title"
            name="author"
            placeholder="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
          <input
            type="text"
            id="author"
            name="author"
            placeholder="author"
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
            value={author}
          />
          <button
            className="btn btn-outline-dark"
            type="submit"
            onClick={handleSubmit}
          >
            Add to List
          </button>
        </InputGroup>
        <Table striped bordered hover variant="light" responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => {
              return (
                <tr key={index}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td id="td-actions">
                    <button id="edit">✏️ &nbsp;</button>
                    <button id="delete" onClick={() => deleteBook(book.id)}>
                      🗑️
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
