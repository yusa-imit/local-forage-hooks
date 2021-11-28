# local-forage-hooks
![score](https://api.codiga.io/project/30038/score/svg)
![grade](https://api.codiga.io/project/30038/status/svg)


React hook component &amp; useful functions for Local Forage

### install

```bash
npm install local-forage-hooks
```
```bash
yarn add local-forage-hooks
```

### quick usage
```javascript
import React, { useEffect } from "react";
import { ReactLF, useLocalForageItem } from "local-forage-hooks";
function Component () {
    const [value, loading] = useLocalForageItem("MyTable", "MyKey");
    useEffect(() => {
        // Initialize DB manually
        async function init(){
            await ReactLF.setDBItem("MyTable", "MyKey", "MyValue");
        }
        init();
    }, [])
    return(
    ...render
    )
}

```

## hooks
### useDBInitWithFetch

Initialize localforage Database with fetch function.

return : 

    loading:
    
        whether its loading or not

| Parameter | type |
|-----------|------|
|      KeyValue     |   () => Promise&lt;KV&gt;   |
|      table     |   string   |
|     db_name?      |   string   |
| customDependancy? | Array&lt;unknown&gt; |

##### KeyValue
Promise function that promises type of Array of KV.

###### Example of KeyValue
```javascript
function getKeyValue () {
  return axios.get("https://somewhere.to.get.data")
  .then((response) => {
      // process response data into KV type
      const key_value = [];
      for (const items of response.data) {
          key_value.push({key: items.some_key_value, value: item})
      }
      return key_value;
  })
}
```

###### Example of return type of KeyValue
```javascript
[
    {key: "key1", value: "value1"},
    {key: "key2", value: "value2"},
    ...
]
```

##### Table
string of data base's table name

##### db_name
(optional)

##### customDependancy
Array of some state or value.

If customDependancy's value changes, then re-init database.

### useLocalForageItem

Get DB's item.

return :

    data: value from DB
    loading: whether its loading or not
    
| Parameter | type |
|-----------|------|
|      key     |   string   |
|      table     |   string   |
|     db_name?      |   string   |
| CHECK_NULL_RESULT? | boolean |

##### key
Key of data looking for

##### table
Table's name where data exists.

##### db_name
(Optional) DB's name.

##### CHECK_NULL_RESULT
(Optional) Check if result is null or not. This parameter can occur infinite loop.

## Function Class
### ReactLF
React is collection of functions of localforage's little upgraded version.
```typescript
abstract class ReactLF{
    // Initial DB's Name. default "DATABASE"
    static INITIAL_DB_NAME: string;
    // Dictionary of DB's Name
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
```


#### Usage of ReactLF
Almost every functions in ReactLF's are not able to called in React Component itself.

Because its async-await function.

```javascript
const Component = (props) => {
    const value = ReactLF.getAllDBKeys("table") // ERROR!!
    return (
        ...render
    )
}
```

So, if you want to use ReactLF functions by yourself. Set it in useEffect.

This is also same as process of hooks.
```javascript
import { useState, useEffect } from "react";
const Componenet = (props) => {
    const [loading, setLoading] = useEffect(false);
    useEffect(()=>{
        async get(){
            setLoading(true);
            await ReactLF.getAllDBKeys("table");
            return;
        }
        get().then(()=>{
            setLoading(false);
        });
    }, [])
    return (
        ...render
    )
}
```

## FutureWorks
- [ ] More Hooks
- [ ] Improve Documentation
