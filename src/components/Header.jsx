import React from "react";

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
    };

    this.onChangeHandleSearch = this.onChangeHandleSearch.bind(this);
  }

  onChangeHandleSearch(e) {
    const query = e.target.value;
    this.setState({ searchQuery: query });
    this.props.onSearch(query);
  }

  render() {
    return (
      <header className="note-app__header">
        <h1>Notes</h1>

        <div className="note-search">
          <input
            type="text"
            placeholder="Cari catatan..."
            onChange={this.onChangeHandleSearch}
            value={this.state.searchQuery}
          />
        </div>
      </header>
    );
  }
}
