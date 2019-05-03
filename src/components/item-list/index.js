import React from "react";
import PropTypes from "prop-types";
import { Li } from "./style";

class ItemList extends React.Component {
  render() {
    const { itemList, addItem } = this.props;
    return itemList.map((item, index) => {
      return (
        <Li
          key={index}
          className="list-group-item ml-4 w-50"
          onClick={() => addItem(item)}
        >
          {item}
        </Li>
      );
    });
  }
}

ItemList.propTypes = {
  itemList: PropTypes.array,
  addItem: PropTypes.func
};

export default ItemList;
