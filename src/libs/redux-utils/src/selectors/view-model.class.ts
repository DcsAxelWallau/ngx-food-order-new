import { curry, forEach, keys } from 'ramda';
import { Constructor } from './normalized-entity.selectors';

export function generateGetter<T extends object, K extends keyof T>(
  instance: ViewModel<T>,
  key: K
) {
  if (Object.getOwnPropertyDescriptor(Object.getPrototypeOf(instance), key) === undefined) {
    Object.defineProperty(instance, key, {
      get() {
        return instance.getProp(key);
      },
      configurable: true,
      enumerable: true,
    });
  }
}

export abstract class ViewModel<T extends object> {
  protected instanceCache: { [key: string]: any } = {};

  get loaded(): boolean {
    // naive implementation as default: presence of id
    // overwrite when necessary
    return !!(this as any).id;
  }

  constructor(protected props: Partial<T> = {}) {
    Object.defineProperty(this, 'props', {
      enumerable: false,
      configurable: false,
    });

    const generatePostGetter = curry(generateGetter)(this);
    forEach(generatePostGetter, keys(props));
  }

  public getProp(key: keyof T) {
    return (<any>this.props)[key];
  }

  public merge(data: { [key: string]: any }): this {
    const props = { ...this.toObject(), ...data };
    return new (<any>this.constructor)(props);
  }

  public toJSON(): string {
    return JSON.stringify(this.props);
  }

  public toObject(): object {
    return { ...(this.props as object) };
  }

  protected getInstance(key: keyof T, konstructor: Constructor<any>) {
    if (!this.instanceCache[key]) {
      this.instanceCache[key] = new konstructor(this.getProp(key));
    }

    return this.instanceCache[key];
  }
}
