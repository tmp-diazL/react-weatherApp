import React from "react";
import "./Searchbar.css";

class Searchbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  handleChange(e) {
    e.persist();

    this.setState({ [e.target.name]: e.target.value });
  }

  handleKeydown(e) {
    if (e.key === "Enter" && this.state.userInput !== "") {
      this.props.search(this.state.userInput);
      this.setState({ userInput: "" });
      e.target.value = "";
    }
  }

  render() {
    return (
      <div className="searchbar">
        <input
          type="text"
          name="userInput"
          placeholder="i.e new york, US"
          onChange={this.handleChange}
          onKeyDown={this.handleKeydown}
        />
      </div>
    );
  }
}

export default Searchbar;
