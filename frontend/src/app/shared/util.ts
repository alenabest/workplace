export function addLocalStorageItem(key: string, value: string, reset?: boolean) {
  if (reset) {
    localStorage.clear();
  }
  localStorage.setItem(key, value);
}
