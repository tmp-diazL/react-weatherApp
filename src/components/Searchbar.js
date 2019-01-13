import React from "react";
import "./Searchbar.css";

class Searchbar extends React.Component {
  constructor(props) {
    super(props);

    this.btnControl = React.createRef();
    this.inputControl = React.createRef();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.btnControl.current.classList.toggle("close");
    this.inputControl.current.classList.toggle("square");

    if (this.btnControl.current.classList.contains("close")) {
      this.inputControl.current.focus();
    } else {
      this.inputControl.current.blur();
    }
  }

  render() {
    return (
      <form id="content">
        <input
          type="text"
          name="input"
          ref={this.inputControl}
          className="input"
        />
        <button
          type="reset"
          className="btn-search"
          ref={this.btnControl}
          onClick={this.handleClick}
        />
      </form>
    );
  }
}

export default Searchbar;
