// Define a type for the keys used in browser storage, which are elements of the browserStorageKeys array.
type BrowserStorageKey = (typeof browserStorageKeys)[number];

// Define a type for the methods that can be used with browser storage keys, which can be string, number, boolean, or null.
type BrowserStorageKeyMethods = string | number | boolean | null;

// Define a type for the browser storage object, which maps each key to an object with get, set, and clear methods.
type BrowserStorage = Record<
  BrowserStorageKey,
  {
    get: () => BrowserStorageKeyMethods;
    set: (value: BrowserStorageKeyMethods) => void;
    clear: () => void;
  }
>;

/**
 * Pre-defined browser storage keys.
 */
const browserStorageKeys = [
  'arraySize',
  'selectedAlgorithm',
  'algorithmSpeed',
] as const;

// Function to create storage methods for a given key and storage type (session or local).
const browserStorageMethods = (
  key: BrowserStorageKey,
  storageType: 'session' | 'local'
) => {
  // Check if the code is running in a browser environment.
  const isBrowser = typeof window !== 'undefined';

  // If not in a browser environment, return no-op methods.
  if (!isBrowser) {
    return {
      get: () => null,
      set: () => null,
      clear: () => null,
    };
  }

  // Select the appropriate storage type (sessionStorage or localStorage).
  const storage = storageType === 'session' ? sessionStorage : localStorage;

  // Return the methods to get, set, and clear the storage item.
  return {
    get: () => storage.getItem(key),
    set: (value: BrowserStorageKeyMethods) =>
      storage.setItem(key, value as string),
    clear: () => storage.removeItem(key),
  };
};

// Create the browserStorage object with methods for each pre-defined key.
export const browserStorage: BrowserStorage = {
  arraySize: browserStorageMethods('arraySize', 'local'),
  selectedAlgorithm: browserStorageMethods('selectedAlgorithm', 'local'),
  algorithmSpeed: browserStorageMethods('algorithmSpeed', 'local'),
};
