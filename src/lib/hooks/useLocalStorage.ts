import { useState } from "react";
import useEffectOnUpdate from "./useEffectOnUpdate";

/**
 * React hook for managing a local storage item.
 *
 * Automatically saves state updates to local storage.
 *
 * Using state for a local storage item has the benefit of not needing to call
 * the Storage API to get the updated value.
 *
 * @example
 * const [theme, setTheme] = useLocalStorage("theme");
 * setTheme("dark"); // saves to local storage
 * console.log(theme === "dark") // variable updated without needing to call Storage.getItem();
 *
 * @param key The name of the key you want to retrieve the value of.
 * @returns an array containing the current state and a setState function.
 */
export function useLocalStorage(key: string) {
  const [value, setValue] = useState(localStorage.getItem(key));

  useEffectOnUpdate(() => {
    localStorage.setItem(key, JSON.stringify(String(value)));
  }, [value]);

  return [value, setValue] as const;
}
