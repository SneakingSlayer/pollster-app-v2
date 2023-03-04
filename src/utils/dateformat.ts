export const formatDate = (value: string) => {
  const date = new Date(value);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const formatted =
    months[date.getMonth()] +
    ' ' +
    date.getDate() +
    ',' +
    ' ' +
    date.getFullYear();
  return formatted.toString();
};
