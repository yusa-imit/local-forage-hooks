import { KV } from "./types";
/**
 * Init db with fetch function.
 * @param KeyValue Function that returns Promise array of K-V
 * @param table table's name
 * @param db_name (optional) db's name
 * @param customDependancy same as React's useEffect Array, re-init array when customDependancy array changed.
 * @returns boolean(Loading or not)
 */
export declare function useDBInitWithFetch(KeyValue: () => Promise<Array<KV>>, table: string, db_name?: string, customDependancy?: Array<unknown>): boolean;
