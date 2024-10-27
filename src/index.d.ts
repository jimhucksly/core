import { IEventBus } from './types/eventBus';
import { ICookie } from './types/cookies';

declare const eventBus: IEventBus;
declare const cookie: ICookie;
declare function uniqueID(len: number, format: string): string | number;
declare function delay(timeout: number): Promise<void>;
declare function isDefined(value: unknown): boolean;
