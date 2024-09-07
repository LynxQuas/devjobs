export const formatDate = (date: string): string => {
  const now = new Date();
  const createDate = new Date(date).getTime();
  const seconds = Math.floor(
    (Number(now.getTime()) - Number(createDate)) / 1000
  );

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const interval in intervals) {
    const time = Math.floor(seconds / intervals[interval]);

    if (time > 0) {
      if (time === 1) {
        return `${time} ${interval} ago`;
      }
      return `${time} ${interval}s ago`;
    }
  }

  return "Just now";
};
