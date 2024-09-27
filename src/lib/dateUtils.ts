export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date();

  if (!date) return "";

  if (!date?.includes("T")) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date);

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo} ${yearsAgo === 1 ? "year ago" : "years ago"}`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo} ${
      monthsAgo === 1 ? "month ago" : "months ago"
    }`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo} ${daysAgo === 1 ? "day ago" : "days ago"}`;
  } else {
    formattedDate = "Today";
  }

  const fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}

export const DAY_IN_SECONDS = 86400;
