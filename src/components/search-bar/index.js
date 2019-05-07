import React from "react";

class SearchBar extends React.Component {
  onChange = e => {
    this.props.handleSearch(e);
  };
  render() {
    return (
      <input
        onChange={this.onChange}
        value={this.props.text}
        className="form-control my-2"
        placeholder="Enter an item to search"
      />
    );
  }
}

export default SearchBar;
