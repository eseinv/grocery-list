import React from "react";
import PropTypes from "prop-types";
import { Li, Item, Button } from "./style";

class GroceryList extends React.Component {
  render() {
    const { cartItems, removeItem, moveItem } = this.props;
    return cartItems.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <Li className="ml-4 w-50 d-flex justify-content-between">
            <Item
              className="d-inline-block list-group-item mr-2"
              onClick={() => removeItem(index)}
            >
              {item}
            </Item>
            {index > 0 && (
              <Button
                className="d-inline-block btn btn-sm mr-1"
                onClick={() => moveItem(index, "up")}
              >
                Up
              </Button>
            )}
            {index < cartItems.length - 1 && (
              <Button
                className="d-inline-block btn btn-sm"
                onClick={() => moveItem(index, "down")}
              >
                Down
              </Button>
            )}
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
