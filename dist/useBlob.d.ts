/**
 * Hook of localForage getItem
 * @param key Key of data looking for.
 * @param table Table's name where data exists.
 * @param url (optional) URL where data fetch from. It works only when table-key's db data is null.
 * @param db_name (Optional) DB's name
 * @param SAVE_IF_NULL (optional) If db's data is null, then save URL's fetch data into designated table-key storage.
 * @param CHECK_NULL_RESULT (Optional, Dangerous) Check if result is null or not. This parameter can occur infinite loop.
 * @returns [data, loading]. data : value of data, default is "none", loading: Loading state, control render function with this.
 */
export declare function useBlob(key: string, table: string, url?: string, db_name?: string, SAVE_IF_NULL?: boolean, CHECK_NULL_RESULT?: boolean): [Blob | null, boolean];
