export {};

type IDBIndexingOptions = Record<
  string,
  { keyPath: string | string[]; params: IDBIndexParameters }
>;

interface IDBInitOptions {
  version?: number;
  keyPath?: string;
  autoIncrement?: boolean;
  additionalIndexing?: IDBIndexingOptions;
}

var db: null | IDBDatabase = null;

function isNotSameDB(name: string, version: number) {
  return db === null || db.name !== name || db.version !== version;
}

function getVersion(version?: number) {
  return version ? Number(version.toFixed()) : 0;
}

async function getIDB(
  name: string,
  options?: IDBInitOptions
): Promise<IDBDatabase> {
  return new Promise((res, rej) => {
    const version = getVersion(options?.version);
    const req = window.indexedDB.open(name, version);
    req.onerror = function (event) {
      rej("Indexed DB is on error.");
    };
    req.onblocked = function (event) {
      rej("Indexed DB is blocked");
    };
    req.onupgradeneeded = function (event) {
      const db = req.result;
      const key = options?.keyPath ?? "__id";
      const store = db.createObjectStore(`${name}_${version}`, {
        keyPath: key,
        autoIncrement: options?.autoIncrement ?? key === "__id" ? true : false,
      });
      store.createIndex("primary", key, { unique: true });
      if (options && options.additionalIndexing) {
        const indexingOptions = options.additionalIndexing;
        Object.keys(indexingOptions).forEach((indexName) => {
          store.createIndex(
            indexName,
            indexingOptions[indexName].keyPath,
            indexingOptions[indexName].params
          );
        });
      }
    };
    req.onsuccess = (event) => {
      if (isNotSameDB(name, version)) db = req.result;
      res(req.result);
    };
  });
}

async function getTransaction(name: string, options?: IDBInitOptions) {
  const version = getVersion(options?.version);
  const this_db = !isNotSameDB(name, options?.version ?? 0)
    ? (db as IDBDatabase)
    : await getIDB(name, options);
  return this_db.transaction(`${name}_${version}`, "readwrite");
}

async function getStore(name: string, options?: IDBInitOptions) {
  const version = getVersion(options?.version);
  const transaction = await getTransaction(name, options);
  return transaction.objectStore(`${name}_${version}`);
}

interface IDBOptions {
  name: string;
  options?: IDBInitOptions;
}

export async function opAdd(item: any, dbOptions: IDBOptions): Promise<string> {
  const store = await getStore(dbOptions.name, dbOptions.options);
  if (store.keyPath === "__id" && !store.autoIncrement) {
    if (crypto) item["__id"] = crypto.randomUUID();
  }
  return new Promise((res, rej) => {
    const req = store.add(item, item["__id"]);
    req.onsuccess = () => {
      res(req.result.toString());
    };
    req.onerror = () => {
      rej("Error occured during add operation with indexed db");
    };
  });
}

export async function opDelete(
  key: string,
  dbOptions: IDBOptions
): Promise<void> {
  const store = await getStore(dbOptions.name, dbOptions.options);
  return new Promise((res, rej) => {
    const req = store.delete(key);
    req.onsuccess = () => {
      res(req.result);
    };
    req.onerror = () => {
      rej("Error occured during delete operation with indexed db");
    };
  });
}

export async function opGet<T>(key: string, dbOptions: IDBOptions): Promise<T> {
  const store = await getStore(dbOptions.name, dbOptions.options);
  return new Promise((res, rej) => {
    const req = store.get(key);
    req.onsuccess = () => {
      res(req.result as T);
    };
    req.onerror = () => {
      rej("Error occured during get operation with indexed db");
    };
  });
}
