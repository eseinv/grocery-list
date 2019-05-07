import React from "react";
import { Header } from "./components/header";
import GroceryList from "./components/grocery-list";
import ItemList from "./components/item-list";
import { cartItems, itemList } from "./data/data";
import SearchBar from "./components/search-bar";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

class App extends React.Component {
  state = { cartItems, itemList, text: "" };

  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const cartItems = reorder(
      this.state.cartItems,
      result.source.index,
      result.destination.index
    );

    this.setState({
      cartItems
    });
  };

  addItem = item => {
    const { cartItems } = this.state;
    if (!cartItems.includes(item)) {
      cartItems.push(item);
    }
    return this.setState({ cartItems });
  };

  removeItem = itemIndex => {
    const { cartItems } = this.state;
    cartItems.splice(itemIndex, 1);
    return this.setState({ cartItems });
  };

  moveItem = (which, where) => {
    if (where === "up") {
      if (which === 0) return;
      const prevItem = which - 1;
      const whichName = cartItems[which];
      const prevName = cartItems[prevItem];
      cartItems[which] = prevName;
      cartItems[prevItem] = whichName;
      return this.setState({ cartItems });
    }
    if (where === "down") {
      if (which === cartItems.length - 1) return;
      const nextItem = which + 1;
      const whichName = cartItems[which];
      const nextName = cartItems[nextItem];
      cartItems[which] = nextName;
      cartItems[nextItem] = whichName;
      return this.setState({ cartItems });
    }
  };

  handleSearch = e => {
    this.setState({ text: e.target.value });
  };

  assignIndex = (currentIndex, newIndex) => {
    const tempCartItems = this.state.cartItems;
    const maxIndex = tempCartItems.length - 1;
    if (newIndex > maxIndex || newIndex < 0) return;
    tempCartItems.splice(newIndex, 0, tempCartItems.splice(currentIndex, 1)[0]);
    return this.setState({ cartItems: tempCartItems });
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <div className="d-flex align-items-start">
            <div className="col-4 bg-warning d-inline-block">
              {cartItems.length === 0 && <h2>Add some items!</h2>}
              {cartItems.length > 0 && <h2>Items added to cart:</h2>}
              <ul className="list-group">
                <GroceryList
                  cartItems={this.state.cartItems}
                  removeItem={this.removeItem}
                  moveItem={this.moveItem}
                  assignIndex={this.assignIndex}
                />
              </ul>
            </div>
            <div className="col-4 bg-success d-inline-block">
              <h2>Full item list:</h2>
              <SearchBar
                handleSearch={this.handleSearch}
                text={this.state.text}
              />
              <ul className="list-group">
                <ItemList
                  itemList={this.state.itemList}
                  addItem={this.addItem}
                  text={this.state.text}
                />
              </ul>
            </div>
          </div>
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {this.state.cartItems.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        {item.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </React.Fragment>
    );
  }
}

export default App;
