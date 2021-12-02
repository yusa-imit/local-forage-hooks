import { ReturnKV } from "./types";
/**
 * Hook of localForage getItem in form of list
 * @param key Array of key of data looking for.
 * @param table Table's name where data exists.
 * @param db_name (Optional) DB's name
 * @param REAL_TIME (Optional) If it's false or undefined, it changes its state when function get all data in key list, if it's true, it changes its state when every time get data in key list.
 * @returns [data, loading]. data : Array of value of data in type of Key-Value, default is [], loading: Loading state, control render function with this.
 */
export declare function useLocalForageItemList(keys: Array<string>, table: string, db_name?: string, REAL_TIME?: boolean): [Array<ReturnKV>, boolean];
