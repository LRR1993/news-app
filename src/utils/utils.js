export default function dateConverter(dateIso) {
  const date = new Date(dateIso);
  const day = date.getDate();
  const month = date.toLocaleString('en-GB', { month: 'long' });
  const year = date.getUTCFullYear();
  return `${month} ${day}, ${year}`;
}
