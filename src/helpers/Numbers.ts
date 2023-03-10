export function numberWithSpaces(x: string | number) {
  if (!isNaN(Number(x))) {
    return String(x).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  return false;
}
