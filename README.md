# @fromscratch/store

```sh
yarn add @fromscratch/store
```

# Usage

## Example with react

```js
import React, { Component } from "react";
import Store from "@fromscratch/store";

const store = new Store();

// Some value update from anywhere in the codebase
store.set('someValue', {
  someList: [...]
})

export default class App extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe("someValue", this.handleUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleUpdate = data => {
    this.setState({ data });
  };

  deleteItem = index => () => {
    const currentValue = store.get("someValue", []);
    store.set("someValue", [
      ...currentValue.slice(0, index),
      ...currentValue.slice(index + 1)
    ]);
  };

  deleteAll = () => {
    store.delete("someValue");
  };

  render() {
    const { data } = this.state;
    return (
      <>
        <button onClick={this.deleteAll}>Remove all</button>
        <ul>
          {data.someList.map((item, index) => (
            <li>
              {item.label} <button onClick={this.deleteItem(index)}>x</button>
            </li>
          ))}
        </ul>
      </>
    );
  }
}
```

# API

```ts
class Store {
  get: (key: string, defaultValue?: any) => any;
  set: (key: string, value: any) => void;
  delete: (key: string) => void;
  subscribe: (key: string, fn: (value: any) => void) => () => void;
}
```
