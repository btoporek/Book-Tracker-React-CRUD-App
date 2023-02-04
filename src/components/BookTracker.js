import React, { useState, useEffect, Fragment } from "react";
import Table from "react-bootstrap/Table";
import { ReadOnlyRow } from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

export default function BookTracker(props) {
  const [books, setBooks] = useState([{}]); //NOTE state for book list object
  const [editBookId, setEditBookId] = useState(null); //NOTe state for setting index/id target of inline rows to edit
  const [editFormData, setEditFormData] = useState(""); //NOTE state editing form on inline rows
  const [title, setTitle] = useState(""); //NOTE state for title input
  const [author, setAuthor] = useState(""); //NOTE state for author input

  const endpoint = "https://63b347155901da0ab37bb978.mockapi.io/api/books"; //NOTE api url

  useEffect(() => {
    //NOTE starting GET request for page
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  const getBooks = () => {
    //NOTE variable assigned to call GET request
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => setBooks(data));
  };

  const deleteBook = (e, bookId) => {
    //NOTE function for deleting a book/DELETE request
    console.log("delete is working");
    e.preventDefault();
    fetch(`${endpoint}/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => getBooks());
  };

  const handleNewSubmit = (e) => {
    //NOTE function for adding new books/POST request
    console.log("submitted");
    e.preventDefault();
    //NOTE below function to send new data to api
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
    setTitle(""); //NOTE resets title form box to blank
    setAuthor(""); //NOTE resets author form box to blank
  };

  const handleEditSubmit = (e, bookId) => {
    //NOTE function for submitting edits/PUT request
    console.log("edited");
    e.preventDefault();
    //NOTE below function to send edited data to api
    fetch(`${endpoint}/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: editFormData.title,
        author: editFormData.author,
      }),
    }).then(() => getBooks());
    setEditBookId(null); //NOTE resets form to readable rows by no longer targeting editable row id
    setEditFormData(""); //NOTE resets state values to empty string
  };

  const handleEditFormChange = (e) => {
    //NOTE function for storing edited data
    e.preventDefault();

    const fieldName = e.target.getAttribute("name"); //NOTE - grabs input spot by name, ex: "title"
    const fieldValue = e.target.value; //NOTE - grabs value being entered into input

    const newFormData = { ...editFormData }; //NOTE - spread operator to grab object as described in state above
    newFormData[fieldName] = fieldValue; //NOTE - inserts data entered in field Value within specified fieldName to variable to hold info

    setEditFormData(newFormData); //NOTE sets state to newly entered form data
  };

  const handleEditClick = (e, index, book) => {
    //NOTE function for pulling up editable rows
    console.log("Editing form");
    e.preventDefault();
    setEditBookId(index); //NOTE assigns index from map to target row by Id

    const formValues = {
      title: book.title,
      author: book.author,
    };

    setEditFormData(formValues); //NOTE sets state values to form values object
  };

  const handleCancelClick = () => {
    //NOTE function for cancelling edit feature
    console.log("Cancelled Edit");
    setEditBookId(null); //NOTE resets book id to null to no longer target row
  };

  return (
    <div className="container" key={books.id}>
      <div className="card shadow-lg bg-light">
        <header className="App-header card-header">
          <h1>My Book Tracker</h1>
        </header>
        <form onSubmit={handleNewSubmit}>
          <div className="input-group mb-2 mt-2">
            <label>Log New Book: &nbsp;</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <input
              type="text"
              id="author"
              name="author"
              placeholder="Author"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            />{" "}
            <button
              className="btn btn-dark"
              id="submit-button"
              type="submit"
              // onClick={handleNewSubmit}
            >
              Add to List
            </button>
          </div>
        </form>
        <form>
          <Table
            striped
            bordered
            hover
            variant="light"
            responsive
            className="table"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Author</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <Fragment key={index}>
                  {editBookId === index ? ( //NOTE - if index of current object matches id stored in state, then will render editable row, if not then renders read only row
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleEditSubmit={handleEditSubmit}
                      bookId={book.id}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyRow
                      book={book}
                      index={index}
                      handleEditClick={handleEditClick}
                      deleteBook={deleteBook}
                      bookId={book.id}
                    />
                  )}
                </Fragment>
              ))}
            </tbody>
          </Table>
        </form>
      </div>
    </div>
  );
}
