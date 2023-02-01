import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleEditSubmit,
  bookId,
  handleCancelClick,
}) => {
  //   console.log(editFormData.title);
  return (
    <tr>
      <td>
        <input
          type="text"
          id="edit-title"
          name="title"
          placeholder="Title"
          value={editFormData.title}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          id="edit-author"
          name="author"
          placeholder="Author"
          value={editFormData.author}
          onChange={handleEditFormChange}
        />
      </td>
      <td className="actions">
        <button
          className="formButton"
          type="submit"
          onClick={(e) => handleEditSubmit(e, bookId)}
        >
          ✅
        </button>
        <button
          className="formButton"
          type="button"
          onClick={handleCancelClick}
        >
          🔙
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
