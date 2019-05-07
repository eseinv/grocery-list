import React from "react";
import PropTypes from "prop-types";
import { Li } from "./style";

const filterItemList = (data, term) => {
  return data.filter(item => item.name.includes(term));
};

const ItemList = props => {
  const { itemList, addItem, text } = props;
  let filteredList = filterItemList(itemList, text);
  if (text.length === 0) filteredList = itemList;

  return filteredList.map((item, index) => {
    return (
      <Li
        key={index}
        className="list-group-item ml-4 w-50"
        onClick={() => addItem(item)}
      >
        {item.name}
      </Li>
    );
  });
};

ItemList.propTypes = {
  itemList: PropTypes.array,
  addItem: PropTypes.func
};

export default ItemList;
