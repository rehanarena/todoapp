import React, { Component } from "react";
import "./TodoApp.css";

export default class TodoApp extends Component {
  state = {
    input: "",
    items: [],
    editIndex: null,
    editValue: "",
  };

  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  storeItems = (event) => {
    event.preventDefault();
    const { input } = this.state;
    if (input.trim() === "") return; 

    this.setState((prevState) => ({
      items: [...prevState.items, input],
      input: "",
    }));
  };

  deleteItem = (index) => {
    this.setState((prevState) => ({
      items: prevState.items.filter((_, i) => i !== index),
    }));
  };

  editItem = (index) => {
    this.setState({
      editIndex: index,
      editValue: this.state.items[index],
    });
  };

  handleEditChange = (event) => {
    this.setState({
      editValue: event.target.value,
    });
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.saveEdit();
    }
  };

  saveEdit = () => {
    const { items, editIndex, editValue } = this.state;
    const updatedItems = items.map((item, index) =>
      index === editIndex ? editValue : item
    );
    this.setState({
      items: updatedItems,
      editIndex: null,
      editValue: "",
    });
  };

  render() {
    const { input, items, editIndex, editValue } = this.state;

    return (
      <div className="todo-container">
        <form className="input-section" onSubmit={this.storeItems}>
          <h1>Todo App</h1>
          <input
            type="text"
            value={input}
            onChange={this.handleChange}
            placeholder="Enter items..."
          />
        </form>
        <ul>
          {items.map((data, index) => (
            <li key={index}>
              {editIndex === index ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={this.handleEditChange}
                  onKeyPress={this.handleKeyPress}
                  className="edit-input"
                />
              ) : (
                data
              )}
              <div className="actions">
                {editIndex === index ? (
                  <i className="fa-regular fa-save" onClick={this.saveEdit}></i>
                ) : (
                  <i
                    className="fa-regular fa-pen-to-square"
                    onClick={() => this.editItem(index)}
                  ></i>
                )}
                <i
                  className="fa-regular fa-trash-can"
                  onClick={() => this.deleteItem(index)}
                ></i>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
