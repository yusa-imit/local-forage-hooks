import { AvailableObject, DB_TYPE, DRIVER_TYPE, KV } from "./types";
declare abstract class ReactLF {
    static INITIAL_DB_NAME: string;
    static db: DB_TYPE;
    /**
     * Set Default DataBase name
     * @param name database name, if name is null, do not change name
     */
    static setDefaultDbName: (name: string | null) => void;
    /**
     * Get Database from Local Forage
     * @param DB_NAME (optional) DB's name, usually use one DB_NAME by one Security origin
     * @param TABLE_NAME Table name, contains key-value data
     * @param driver (optional) Array of driver type INDEXEDDB, LOCALSTORAGE, LOCALSTORAGE, WEBSQL
     * @returns LocalForage Instance
     */
    static getDataBase(TABLE_NAME: string, DB_NAME?: string, driver?: Array<DRIVER_TYPE>): LocalForage;
    /**
     * Set item into table.
     * @param TABLE_NAME Table's name where put data in.
     * @param KEY Key of data
     * @param VALUE Value of data
     * @param DB_NAME (Optional) DB's name
     * @returns Promise<void>
     */
    static setDBItem: (TABLE_NAME: string, KEY: string, VALUE: AvailableObject, DB_NAME?: string | undefined) => Promise<void>;
    /**
     * Get item from table
     * @param TABLE_NAME Table's name where get data from.
     * @param KEY Key of data.
     * @param DB_NAME (Optional) DB's name
     * @returns Promise<AvailableObject | null>, Returns Localforage's available object as value, if there's no match key in table then returns null
     */
    static getDBItem: (TABLE_NAME: string, KEY: string, DB_NAME?: string | undefined) => Promise<AvailableObject | null>;
    /**
     * Get Table's Length
     * @param TABLE_NAME Table's name where get length from.
     * @param DB_NAME (Optional) DB's name
     * @returns Promise<number>, Length of table.
     */
    static getDBLength: (TABLE_NAME: string, DB_NAME?: string | undefined) => Promise<number>;
    /**
     * Get table's key array
     * @param TABLE_NAME Table's name where get all keys from.
     * @param DB_NAME (Optional) DB's name
     * @returns Promise<Array<string>>, Array of keys in table.
     */
    static getAllDBKeys: (TABLE_NAME: string, DB_NAME?: string | undefined) => Promise<Array<string>>;
    /**
     * Set items of array in table.2
     * @param TABLE_NAME Table's name where put data in.
     * @param KV_ARRAY Key-Value Array of data
     * @param DB_NAME (Optional) DB's name
     * @returns Promise<void>
     */
    static setDBBulkItem: (TABLE_NAME: string, KV_ARRAY: Array<KV>, DB_NAME?: string | undefined) => Promise<void>;
    /**
     * Cleaning table's data.
     * @param TABLE_NAME Table's name where remove data.
     * @param DB_NAME (Optional) DB's name
     * @returns Promise<void>
     */
    static cleanDB: (TABLE_NAME: string, DB_NAME?: string | undefined) => Promise<void>;
}
export default ReactLF;
