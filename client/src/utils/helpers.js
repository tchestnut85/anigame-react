import dayjs from 'dayjs';

export function capitalizeFirstLetter(string) {
  return `${string[0].toUpperCase()}${string.slice(1)}`;
}

export function capitalizeWords(string) {
  return string
    .split(' ')
    .map(word => capitalizeFirstLetter(word))
    .join(' ');
}

export function formatDate(date) {
  return dayjs(date).format('MMM DD, YYYY');
}

export function getYear(dateString) {
  const parts = dateString.split('-');
  return parts[0];
}

export function replaceSpaces(string) {
  return string.toLowerCase().replaceAll(' ', '_');
}
