export default class Store<T> {
  private data = new Map<string, T>();
  private subscriptions = new Map<string, ((value?: T) => void)[]>();

  public get = (key: string, defaultValue?: T) =>
    this.data.get(key) || defaultValue;
  public set = (key: string, value: T) => {
    this.data.set(key, value);

    const subscriptions = this.subscriptions.get(key);

    if (subscriptions) {
      subscriptions.forEach(fn => fn(value));
    }
  };
  public delete = (key: string) => {
    this.data.delete(key);

    const subscriptions = this.subscriptions.get(key);

    if (subscriptions) {
      subscriptions.forEach(fn => fn());
    }
  };

  public subscribe = (key: string, fn: (value?: T) => void) => {
    const subscriptions = this.subscriptions.get(key);

    if (subscriptions) {
      this.subscriptions.set(key, [...subscriptions, fn]);
    } else {
      this.subscriptions.set(key, [fn]);
    }

    return () => this.unsubscribe(key, fn);
  };

  private unsubscribe = (key: string, fnToDelete: (value?: T) => void) => {
    const subscriptions = this.subscriptions.get(key);
    this.subscriptions.set(
      key,
      subscriptions.filter(fn => fn !== fnToDelete)
    );
  };
}

module.exports = Store;
module.exports.default = Store;
