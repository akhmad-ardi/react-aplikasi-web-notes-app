import React from "react";
import Header from "./components/Header";
import AddNote from "./components/AddNote";
import NoteList from "./components/NoteList";
import { getInitialData } from "./utils";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allNotes: getInitialData(),
      notes: getInitialData(),
    };

    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.deleteNoteHandler = this.deleteNoteHandler.bind(this);
    this.archiveNoteHandler = this.archiveNoteHandler.bind(this);
    this.unarchiveNoteHandler = this.unarchiveNoteHandler.bind(this);
    this.searchNotes = this.searchNotes.bind(this);
  }

  onAddNoteHandler({ title, body }) {
    this.setState((prevState) => {
      const newNote = {
        id: +new Date(),
        title,
        body,
        createdAt: new Date().toISOString(),
        archived: false,
      };

      return {
        allNotes: [...prevState.allNotes, newNote],
        notes: [...prevState.notes, newNote],
      };
    });
  }

  deleteNoteHandler(id) {
    this.setState((prevState) => {
      const updatedAllNotes = prevState.allNotes.filter(
        (note) => note.id !== id,
      );
      const updatedNotes = prevState.notes.filter((note) => note.id !== id);

      return {
        allNotes: updatedAllNotes,
        notes: updatedNotes,
      };
    });
  }

  archiveNoteHandler(id) {
    this.setState((prevState) => {
      const updatedAllNotes = prevState.allNotes.map((note) =>
        note.id === id ? { ...note, archived: true } : note,
      );
      const updatedNotes = prevState.notes.map((note) =>
        note.id === id ? { ...note, archived: true } : note,
      );

      return {
        allNotes: updatedAllNotes,
        notes: updatedNotes,
      };
    });
  }

  unarchiveNoteHandler(id) {
    this.setState((prevState) => {
      const updatedAllNotes = prevState.allNotes.map((note) =>
        note.id === id ? { ...note, archived: false } : note,
      );
      const updatedNotes = prevState.notes.map((note) =>
        note.id === id ? { ...note, archived: false } : note,
      );

      return {
        allNotes: updatedAllNotes,
        notes: updatedNotes,
      };
    });
  }

  searchNotes(query) {
    this.setState((prevState) => {
      const filteredNotes = prevState.allNotes.filter((note) =>
        note.title.toLowerCase().includes(query.toLowerCase()),
      );

      return { notes: filteredNotes };
    });
  }

  render() {
    return (
      <>
        <Header onSearch={this.searchNotes} />

        <main className="note-app__body">
          <AddNote addNote={this.onAddNoteHandler} />

          <h2>Catatan Aktif</h2>
          <NoteList
            notes={this.state.notes.filter((note) => !note.archived)}
            onDelete={this.deleteNoteHandler}
            onArchive={this.archiveNoteHandler}
          />

          <h2>Catatan Arsip</h2>
          <NoteList
            notes={this.state.notes.filter((note) => note.archived)}
            onDelete={this.deleteNoteHandler}
            onUnarchive={this.unarchiveNoteHandler}
          />
        </main>
      </>
    );
  }
}
