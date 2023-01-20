export function formatDateTime(arg: string) {
  const date = new Date(arg);
  return [date.getDate(), date.getMonth(), date.getFullYear()].join(".");
}
