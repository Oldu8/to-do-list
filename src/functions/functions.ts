export function truncateString(str: string) {
  const screenWidth = window.innerWidth;
  let maxLength: number = 0;
  if (screenWidth >= 1024) {
    maxLength = 30;
  } else if (screenWidth >= 768) {
    maxLength = 20;
  } else if (screenWidth < 768) {
    maxLength = 10;
  }

  if (str.length <= maxLength) {
    return str;
  } else {
    return str.slice(0, maxLength - 3) + "...";
  }
}
