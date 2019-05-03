import React from "react";
import { Header } from "./components/header";
import GroceryList from "./components/grocery-list";
import ItemList from "./components/item-list";
import { cartItems, itemList } from "./data";

class App extends React.Component {
  state = { cartItems, itemList };

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
      else {
        const prevItem = which - 1;
        const whichName = cartItems[which];
        const prevName = cartItems[prevItem];
        cartItems[which] = prevName;
        cartItems[prevItem] = whichName;
        return this.setState({ cartItems });
      }
    }
    if (where === "down") {
      if (which === cartItems.length - 1) return;
      else {
        const nextItem = which + 1;
        const whichName = cartItems[which];
        const nextName = cartItems[nextItem];
        cartItems[which] = nextName;
        cartItems[nextItem] = whichName;
        return this.setState({ cartItems });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <div className="col-4 bg-warning d-inline-block">
            {cartItems.length === 0 && <h2>Add some items!</h2>}
            {cartItems.length > 0 && <h2>Items added to cart:</h2>}
            <ul className="list-group">
              <GroceryList
                cartItems={this.state.cartItems}
                removeItem={this.removeItem}
                moveItem={this.moveItem}
              />
            </ul>
          </div>
          <div className="col-4 bg-success d-inline-block">
            <h2>Full item list:</h2>
            <ul className="list-group">
              <ItemList itemList={this.state.itemList} addItem={this.addItem} />
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
