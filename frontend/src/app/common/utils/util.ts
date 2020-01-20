export function addLocalStorageItem(key: string, value: string, reset?: boolean) {
  if (reset) {
    localStorage.clear();
  }
  localStorage.setItem(key, value);
}

export function getRandomElement<T>(elements: T[]): T {
  return elements[Math.floor(Math.random() * elements.length)];
}
