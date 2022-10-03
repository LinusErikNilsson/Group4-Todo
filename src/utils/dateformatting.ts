function HourMinutesFormater(date: Date) {
  const currentHours = ("0" + date.getHours()).slice(-2);
  const currentMinutes = ("0" + date.getMinutes()).slice(-2);
  return `${currentHours}:${currentMinutes}`;
}

export function isToday(date: Date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export default HourMinutesFormater;
