import React, { useState, useEffect, Fragment, useRef } from "react";
import Table from "react-bootstrap/Table";
import { InputGroup } from "react-bootstrap";
import { ReadOnlyRow } from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

export default function BookTracker(props) {
  const [books, setBooks] = useState([{}]);
  const [addFormData, setAddFormData] = useState("");
  const [editBookId, setEditBookId] = useState(null);
  const [editFormData, setEditFormData] = useState("");

  const endpoint = "https://63b347155901da0ab37bb978.mockapi.io/api/books";

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

    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({
        title: addFormData.title,
        author: addFormData.author,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => getBooks());
    setAddFormData("");
  };

  const handleEditSubmit = (e, bookId) => {
    //NOTE function for submitting edits/PUT request
    console.log("edited");
    console.log(bookId);
    e.preventDefault();

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
    setEditBookId(null); //NOTE resets form to readable rows by no longer target editable row id
    setEditFormData("");
  };

  const handleAddFormChange = (e) => {
    const fieldName = e.target.getAttribute("name"); //NOTE - grabs input spot by name, ex: "title"
    const fieldValue = e.target.value; //NOTE - grabs value being entered into input

    const newFormData = { ...addFormData }; //NOTE - spread operator to grab object as described in state above
    newFormData[fieldName] = fieldValue; //NOTE - inserts data entered in field Value within specified fieldName to variable to hold info

    setAddFormData(newFormData); //NOTE - might be just like setBooks call?
  };

  const handleEditFormChange = (e) => {
    //NOTE function for storing edited data
    e.preventDefault();

    const fieldName = e.target.getAttribute("name"); //NOTE - grabs input spot by name, ex: "title"
    const fieldValue = e.target.value; //NOTE - grabs value being entered into input

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditClick = (e, index, book) => {
    //NOTE function for pulling up editable rows
    e.preventDefault();
    setEditBookId(index);

    const formValues = {
      title: book.title,
      author: book.author,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    //NOTE function for cancelling edit feature
    console.log("Cancelled Edit");
    setEditBookId(null);
  };

  const formRef = useRef;
  useEffect(() => {
    if (!handleNewSubmit) {
      formRef.current?.reset();
    }
  }, []);

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
            name="title"
            placeholder="Title"
            onChange={handleAddFormChange}
          />
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Author"
            onChange={handleAddFormChange}
          />
          <button
            className="btn btn-outline-dark"
            type="submit"
            onClick={handleNewSubmit}
          >
            Add to List
          </button>
        </InputGroup>
        <form>
          <Table striped bordered hover variant="light" responsive>
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
