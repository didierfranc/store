export default class Store {
  private data = new Map<string, any>();
  private subscriptions = new Map<string, ((value?: any) => void)[]>();

  public get = (key: string, defaultValue?: any) =>
    this.data.get(key) || defaultValue;
  public set = (key: string, value: any) => {
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

  public subscribe = (key: string, fn: (value?: any) => void) => {
    const subscriptions = this.subscriptions.get(key);

    if (subscriptions) {
      this.subscriptions.set(key, [...subscriptions, fn]);
    } else {
      this.subscriptions.set(key, [fn]);
    }

    return () => this.unsubscribe(key, fn);
  };

  private unsubscribe = (key: string, fnToDelete: (value?: any) => void) => {
    const subscriptions = this.subscriptions.get(key);
    this.subscriptions.set(key, subscriptions.filter(fn => fn !== fnToDelete));
  };
}

module.exports = Store;
module.exports.default = Store;
