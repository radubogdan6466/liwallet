// db.js
import { openDB } from "idb";

const DB_NAME = "customNetworksDB";
const DB_VERSION = 1;
const STORE_NAME = "networks";

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      const store = db.createObjectStore(STORE_NAME, { keyPath: "rpcUrl" });
      store.createIndex("networkName", "networkName", { unique: true });
    }
  },
});

export const addNetwork = async (network) => {
  const db = await dbPromise;
  return db.add(STORE_NAME, network);
};

export const getNetworks = async () => {
  const db = await dbPromise;
  return db.getAll(STORE_NAME);
};
