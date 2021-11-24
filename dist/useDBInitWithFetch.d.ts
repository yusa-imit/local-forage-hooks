import { KV } from "./types";
export declare function useDBInitWithFetch(KeyValue: () => Promise<Array<KV>>, table: string, db_name?: string, customDependancy?: Array<unknown>): boolean;
