import localforage from "localforage";

export interface DB_TYPE {
    [name: string]: {
        [table: string]: LocalForage;
    };
}
export interface KV {
    key: string;
    value: AvailableObject;
}
export type AvailableObject =
    | Array<unknown>
    | ArrayBuffer
    | Blob
    | Float32Array
    | Float64Array
    | Int8Array
    | Int16Array
    | Int32Array
    | number
    | object
    | Uint8Array
    | Uint8ClampedArray
    | Uint16Array
    | Uint32Array
    | string;

const DRIVER_TYPE_CONST = [localforage.INDEXEDDB, localforage.LOCALSTORAGE, localforage.LOCALSTORAGE, localforage.WEBSQL] as const;
export type DRIVER_TYPE = typeof DRIVER_TYPE_CONST[number];
