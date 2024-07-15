function calculateDuration(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const differenceInMillis = end - start;

  const differenceInDays =
    Math.floor(differenceInMillis / (1000 * 60 * 60 * 24)) + 1;

  let months = 0;
  let weeks = 0;
  let days = Math.max(differenceInDays, 1);

  if (days >= 30) {
    months = Math.floor(days / 30);
    days %= 30;
  }

  if (days >= 7) {
    weeks = Math.floor(days / 7);
    days %= 7;
  }

  return { months, weeks, days };
}

export default calculateDuration;
