import localforage from "localforage";
import { AvailableObject, DB_TYPE, DRIVER_TYPE, KV } from "./types";

abstract class ReactLF {
    // default db name
    static INITIAL_DB_NAME = "DATABASE";

    // db map
    public static db: DB_TYPE = {
        DATABASE: {},
    };

    /**
     * Set Default DataBase name
     * @param name database name, if name is null, do not change name
     */
    public static setDefaultDbName = (name: string | null) => {
        if (name === null) {
            return;
        } else {
            this.INITIAL_DB_NAME = name;
        }
    };

    /**
     * Get Database from Local Forage
     * @param DB_NAME (optional) DB's name, usually use one DB_NAME by one Security origin
     * @param TABLE_NAME Table name, contains key-value data
     * @param driver (optional) Array of driver type INDEXEDDB, LOCALSTORAGE, LOCALSTORAGE, WEBSQL
     * @returns LocalForage Instance
     */
    public static getDataBase(TABLE_NAME: string, DB_NAME?: string, driver?: Array<DRIVER_TYPE>): LocalForage {
        const DATA_BASE_NAME_CONST = DB_NAME === undefined ? this.INITIAL_DB_NAME : DB_NAME;

        if (!Object.keys(this.db).includes(DATA_BASE_NAME_CONST)) {
            this.db[DATA_BASE_NAME_CONST] = {};
        }
        const DATA_BASE = this.db[DATA_BASE_NAME_CONST];
        if (DATA_BASE !== undefined && Object.keys(DATA_BASE).includes(TABLE_NAME)) {
            return DATA_BASE[TABLE_NAME];
        } else {
            const database = localforage.createInstance({
                name: DB_NAME ? DB_NAME : this.INITIAL_DB_NAME,
                storeName: TABLE_NAME,
                driver: driver ? driver : [localforage.INDEXEDDB, localforage.LOCALSTORAGE, localforage.WEBSQL],
            });
            DATA_BASE[TABLE_NAME] = database;
            return database;
        }
    }
    /**
     * Set item into table.
     * @param TABLE_NAME Table's name where put data in.
     * @param KEY Key of data
     * @param VALUE Value of data
     * @param DB_NAME (Optional) DB's name
     * @returns Promise<void>
     */
    public static setDBItem = async (TABLE_NAME: string, KEY: string, VALUE: AvailableObject, DB_NAME?: string): Promise<void> => {
        await this.getDataBase(TABLE_NAME, DB_NAME ? DB_NAME : this.INITIAL_DB_NAME).setItem(KEY, VALUE);
        return;
    };
    /**
     * Get item from table
     * @param TABLE_NAME Table's name where get data from.
     * @param KEY Key of data.
     * @param DB_NAME (Optional) DB's name
     * @returns Promise<AvailableObject | null>, Returns Localforage's available object as value, if there's no match key in table then returns null
     */
    public static getDBItem = async (TABLE_NAME: string, KEY: string, DB_NAME?: string): Promise<AvailableObject | null> => {
        return await this.getDataBase(TABLE_NAME, DB_NAME ? DB_NAME : this.INITIAL_DB_NAME).getItem(KEY);
    };
    /**
     * Get Table's Length
     * @param TABLE_NAME Table's name where get length from.
     * @param DB_NAME (Optional) DB's name
     * @returns Promise<number>, Length of table.
     */
    public static getDBLength = async (TABLE_NAME: string, DB_NAME?: string): Promise<number> => {
        return await this.getDataBase(TABLE_NAME, DB_NAME ? DB_NAME : this.INITIAL_DB_NAME).length();
    };
    /**
     * Get table's key array
     * @param TABLE_NAME Table's name where get all keys from.
     * @param DB_NAME (Optional) DB's name
     * @returns Promise<Array<string>>, Array of keys in table.
     */
    public static getAllDBKeys = async (TABLE_NAME: string, DB_NAME?: string): Promise<Array<string>> => {
        return await this.getDataBase(TABLE_NAME, DB_NAME ? DB_NAME : this.INITIAL_DB_NAME).keys();
    };
    /**
     * Set items of array in table.2
     * @param TABLE_NAME Table's name where put data in.
     * @param KV_ARRAY Key-Value Array of data
     * @param DB_NAME (Optional) DB's name
     * @returns Promise<void>
     */
    public static setDBBulkItem = async (TABLE_NAME: string, KV_ARRAY: Array<KV>, DB_NAME?: string): Promise<void> => {
        for (const item of KV_ARRAY) {
            await this.setDBItem(TABLE_NAME, item.key, item.value, DB_NAME);
        }
        return;
    };
    /**
     * Cleaning table's data.
     * @param TABLE_NAME Table's name where remove data.
     * @param DB_NAME (Optional) DB's name
     * @returns Promise<void>
     */
    public static cleanDB = async (TABLE_NAME: string, DB_NAME?: string): Promise<void> => {
        await this.getDataBase(TABLE_NAME, DB_NAME).clear();
        return;
    };
}

export default ReactLF;
