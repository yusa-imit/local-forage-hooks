export interface DB_TYPE {
    [name: string]: {
        [table: string]: LocalForage;
    };
}
export interface KV {
    key: string;
    value: AvailableObject;
}
export declare type AvailableObject = Array<unknown> | ArrayBuffer | Blob | Float32Array | Float64Array | Int8Array | Int16Array | Int32Array | number | object | Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | string;
declare const DRIVER_TYPE_CONST: readonly [string, string, string, string];
export declare type DRIVER_TYPE = typeof DRIVER_TYPE_CONST[number];
export {};
