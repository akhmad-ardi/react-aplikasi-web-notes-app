import React from "react";

import { showFormattedDate } from "../utils";

export default class NoteList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.notes.length === 0) {
      return (
        <div className="notes-list__empty-message">Tidak ada catatan.</div>
      );
    }

    return (
      <div className="notes-list">
        {this.props.notes.map((note) => (
          <div key={note.id} className="note-item">
            <div className="note-item__content">
              <h3 className="note-item__title">{note.title}</h3>
              <p className="note-item__date">
                {showFormattedDate(note.createdAt)}
              </p>
              <p className="note-item__body">{note.body}</p>
            </div>
            <div className="note-item__action">
              <button
                className="note-item__delete-button"
                onClick={() => this.props.onDelete(note.id)}
              >
                Hapus
              </button>

              {note.archived ? (
                <button
                  className="note-item__archive-button"
                  onClick={() => this.props.onUnarchive(note.id)}
                >
                  Pindahkan
                </button>
              ) : (
                <button
                  className="note-item__archive-button"
                  onClick={() => this.props.onArchive(note.id)}
                >
                  Arsipkan
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
