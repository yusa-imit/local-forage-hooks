import React, { useEffect, useState } from "react";
import { AvailableObject } from "./types";
import ReactLF from "./functions";

/**
 * Hook of localForage getItem
 * @param key Key of data looking for.
 * @param table Table's name where data exists.
 * @param db_name (Optional) DB's name
 * @param CHECK_NULL_RESULT (Optional, Dangerous) Check if result is null or not. This parameter can occur infinite loop.
 * @returns [data, loading]. data : value of data, default is "none", loading: Loading state, control render function with this.
 */
function useLocalForageItem(key: string, table: string, db_name?: string, CHECK_NULL_RESULT?: boolean): [AvailableObject | null, boolean] {
    const [data, setData] = useState<AvailableObject | null>("none");
    const [loading, setLoading] = useState<boolean>(true);
    const [nullState, setNullState] = useState<boolean>(true);
    useEffect(() => {
        setLoading(true);
        async function get() {
            return await ReactLF.getDBItem(table, key, db_name);
        }
        get().then((value) => {
            if (CHECK_NULL_RESULT === true) {
                if (value === null) {
                    setNullState((prev) => !prev);
                    return;
                }
            }
            setData(value);
            setLoading(false);
        });
    }, [key, table, db_name, nullState]);
    return [data, loading];
}

export default useLocalForageItem;
