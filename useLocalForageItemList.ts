import { useEffect, useState } from "react";
import { ReturnKV } from "./types";
import ReactLF from "./functions";

/**
 * Hook of localForage getItem in form of list
 * @param key Array of key of data looking for.
 * @param table Table's name where data exists.
 * @param db_name (Optional) DB's name
 * @param REAL_TIME (Optional) If it's false or undefined, it changes its state when function get all data in key list, if it's true, it changes its state when every time get data in key list.
 * @returns [data, loading]. data : Array of value of data in type of Key-Value, default is [], loading: Loading state, control render function with this.
 */
export function useLocalForageItemList(keys: Array<string>, table: string, db_name?: string, REAL_TIME?: boolean): [Array<ReturnKV>, boolean] {
    const [data, setData] = useState<Array<ReturnKV>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        setData([]);
        setLoading(true);
        async function get(key: string) {
            return await ReactLF.getDBItem(table, key, db_name);
        }
        async function getList() {
            if (REAL_TIME !== undefined && REAL_TIME === true) setLoading(false);
            const newValue = [];
            for (const key of keys) {
                const currentData = await get(key);
                const inputData: ReturnKV = { key: key, value: currentData };
                newValue.push(inputData);
                // if REAL_TIME = true, then change its state every time
                if (REAL_TIME !== undefined && REAL_TIME === true) {
                    setData((prev) => {
                        return [...prev, inputData];
                    });
                }
            }
            return newValue;
        }
        getList().then((newValue) => {
            setData(newValue);
            setLoading(false);
        });
    }, [keys.toLocaleString(), table, db_name, REAL_TIME]);
    return [data, loading];
}
