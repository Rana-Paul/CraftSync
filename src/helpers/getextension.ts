export function getExtension(filename: string) {
  var parts = filename.split(".");
  return parts[parts.length - 1];
}
