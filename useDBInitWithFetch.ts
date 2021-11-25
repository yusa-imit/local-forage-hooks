import { useEffect, useState } from "react";
import ReactLF from "./functions";
import { KV } from "./types";

/**
 * Init db with fetch function.
 * @param KeyValue Function that returns Promise array of K-V
 * @param table table's name
 * @param db_name (optional) db's name
 * @param customDependancy same as React's useEffect Array, re-init array when customDependancy array changed.
 * @returns boolean(Loading or not)
 */
export function useDBInitWithFetch(KeyValue: () => Promise<Array<KV>>, table: string, db_name?: string, customDependancy: Array<unknown> = []): boolean {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        async function set() {
            const kv = await KeyValue();
            await ReactLF.setDBBulkItem(table, kv, db_name);
        }
        set().then(() => {
            setLoading(false);
        });
    }, [table, db_name, ...customDependancy]);
    return loading;
}
