import React from "react";

export default class AddNote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onBodyChange = this.onBodyChange.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onTitleChange(event) {
    const input = event.target.value;

    if (input.length <= 50) {
      this.setState({ title: input });
    }
  }

  onBodyChange(event) {
    this.setState({ body: event.target.value });
  }

  onSubmitHandler(event) {
    event.preventDefault();

    this.props.addNote({
      title: this.state.title,
      body: this.state.body,
    });

    this.setState({ title: "", body: "" });
  }

  render() {
    const remainingChars = 50 - this.state.title.length;

    return (
      <section className="note-input">
        <h2>Buat Catatan</h2>

        <form onSubmit={this.onSubmitHandler}>
          <p className="note-input__title__char-limit">
            Sisa karakter: {remainingChars}
          </p>

          <input
            className="note-input__title"
            type="text"
            placeholder="Ini adalah judul ..."
            value={this.state.title}
            onChange={this.onTitleChange}
            required
          />

          <textarea
            className="note-input__body"
            placeholder="Tuliskan catatanmu di sini ..."
            value={this.state.body}
            onChange={this.onBodyChange}
            required
          ></textarea>
          <button type="submit">Buat</button>
        </form>
      </section>
    );
  }
}
