export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function splitCamelCase(str: string) {
  return str.split(/([A-Z][a-z]+)/).filter((s) => s);
}
