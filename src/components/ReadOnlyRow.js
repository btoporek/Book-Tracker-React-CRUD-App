import React from "react";

export const ReadOnlyRow = ({
  book,
  index,
  handleEditClick,
  deleteBook,
  bookId,
}) => {
  return (
    <tr key={index}>
      <td className="table-content" id={book.id}>
        {book.title}
      </td>
      <td className="table-content" id={book.id}>
        {book.author}
      </td>
      <td className="actions">
        <button
          className="formButton"
          onClick={(e) => handleEditClick(e, index, book)}
        >
          ✏️
        </button>
        <button className="formButton" onClick={(e) => deleteBook(e, bookId)}>
          🗑️
        </button>
      </td>
    </tr>
  );
};

//BUTTON DELETE onClick={() => deleteBook(book.id)}
