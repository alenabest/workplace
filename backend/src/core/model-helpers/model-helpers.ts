export function getPropertyToClass(property: string) {
  return value => value ? value[property] : value;
}
