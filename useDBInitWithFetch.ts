import { useEffect, useState } from "react";
import ReactLF from "./functions";
import { KV } from "./types";

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
