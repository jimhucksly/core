import { IEventBus } from './types/eventBus';

class EventBus implements IEventBus {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  private listeners: Record<string, Array<(args: any) => any>> = {};

  private once: Array<string> = [];

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  $on(eventName: string, callback: (...args: any) => any) {
    if (eventName in this.listeners) {
      this.listeners[eventName].push(callback);
    } else {
      this.listeners[eventName] = [];
      this.listeners[eventName].push(callback);
    }
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  $once(eventName: string, callback: (...args: any) => any) {
    this.$on(eventName, callback);
    this.once.push(eventName);
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  $off(eventName: string, callback: (...args: any) => any) {
    const map = new Map();
    if (eventName in this.listeners) {
      this.listeners[eventName].forEach((listener, index) => {
        map.set(listener, index);
      });
      const index = map.get(callback);
      /* eslint-disable-next-line no-undefined */
      if (index !== undefined) {
        this.listeners[eventName].splice(index, 1);
        if (this.listeners[eventName]?.length === 0) {
          delete this.listeners[eventName];
        }
      }
    }
  }

  $flush() {
    for (const key in this.listeners) {
      this.listeners[key] = [];
    }
    this.listeners = {};
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  $emit(eventName: string, ...args: any) {
    if (eventName in this.listeners) {
      this.listeners[eventName].forEach(listener => {
        Function.prototype.apply.call(listener, this, args);
        if (this.once.includes(eventName)) {
          this.$off(eventName, listener);
          this.once = this.once.filter(evName => evName !== eventName);
        }
      });
    }
  }

  $has(eventName: string): boolean {
    return Boolean(eventName in this.listeners && this.listeners[eventName]);
  }
}

export const eventBus: IEventBus = new EventBus();
