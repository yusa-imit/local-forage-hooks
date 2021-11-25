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

### hooks
#### useDBInitWithFetch

Initialize localforage Database with fetch function.

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
  axios.get("https://somewhere.to.get.data")
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
