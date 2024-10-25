export interface IEventBus {
  $on: (eventName: string, callback: (...args: any) => any) => void;
  $once: (eventName: string, callback: (...args: any) => any) => void;
  $off: (eventName: string, callback: (...args: any) => any) => void;
  $emit: (eventName: string, ...args: any) => void;
  $flush: () => void;
  $has: (eventName: string) => boolean;
}
