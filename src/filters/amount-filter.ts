export default function (value: number | null): string {
  if (value) {
    return '\xA5' + value.toLocaleString();
  }
  return '-';
}
