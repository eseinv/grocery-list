import React from "react";
import PropTypes from "prop-types";
import { Li, Item, Button } from "./style";
import { ArrowUp, ArrowDown } from "../../data/";

class GroceryList extends React.Component {
  state = { inputIndex: -1, inputValue: -1 };
  handleInputChange = (inputIndex, e) => {
    if (isNaN(Number(e.target.value))) return;
    return this.setState({ inputIndex, inputValue: Number(e.target.value) });
  };

  render() {
    const { cartItems, removeItem, moveItem, assignIndex } = this.props;
    return cartItems.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <Li className="ml-4 w-50 d-flex justify-content-between align-items-center">
            <Item
              className="d-inline-block list-group-item mr-2"
              onClick={() => removeItem(index)}
            >
              {item.name}
            </Item>
            {index > 0 && (
              <Button
                className="d-inline-block btn btn-sm mr-1"
                onClick={() => moveItem(index, "up")}
              >
                <ArrowUp />
              </Button>
            )}
            {index < cartItems.length - 1 && (
              <Button
                className="d-inline-block btn btn-sm"
                onClick={() => moveItem(index, "down")}
              >
                <ArrowDown />
              </Button>
            )}
            <input
              className="form-control w-25 text-right"
              onChange={e => this.handleInputChange(index, e)}
              type="text"
              placeholder={index}
            />
            <button
              className="btn btn-outline-info ml-2"
              onClick={() => assignIndex(index, this.state.inputValue)}
            >
              {" "}
              Ok{" "}
            </button>
          </Li>
        </React.Fragment>
      );
    });
  }
}

GroceryList.propTypes = {
  cartItems: PropTypes.array
};

export default GroceryList;
