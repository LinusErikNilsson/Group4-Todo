function HourMinutesFormater(date: Date) {
  const currentHours = ("0" + date.getHours()).slice(-2);
  const currentMinutes = ("0" + date.getMinutes()).slice(-2);
  return `${currentHours}:${currentMinutes}`;
}

export default HourMinutesFormater;
