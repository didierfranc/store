import Store from "./store";

test("basic set, get, remove", () => {
  const store = new Store();
  store.set("value", 1);
  expect(store.get("value")).toEqual(1);
  store.delete("value");
  expect(store.get("value")).toBeUndefined();
});

test("listener set, delete", () => {
  const store = new Store();
  store.set("value", 1);
  const listener = jest.fn();
  store.subscribe("value", listener);
  store.set("value", 2);
  expect(listener).toBeCalledWith(2);
  store.delete("value");
  expect(listener).toBeCalledWith();
});
