import { AvailableObject } from "./types";
/**
 * Hook of localForage getItem
 * @param key Key of data looking for.
 * @param table Table's name where data exists.
 * @param db_name (Optional) DB's name
 * @param CHECK_NULL_RESULT (Optional, Dangerous) Check if result is null or not. This parameter can occur infinite loop.
 * @returns [data, loading]. data : value of data, default is "none", loading: Loading state, control render function with this.
 */
export declare function useLocalForageItem(key: string, table: string, db_name?: string, CHECK_NULL_RESULT?: boolean): [AvailableObject | null, boolean];
