export function postAgeMessage(postAge: number): string {
  if (postAge <= 0) {
    return 'today';
  }

  return `at ${postAge} day${postAge > 1 ? 's' : ''} ago`;
}

postAgeMessage.fromTodayDiff = function (publishDate: Date | string): string {
  return postAgeMessage.from(publishDate, new Date());
}

postAgeMessage.from = function(publishDate: Date | string, today: Date | string) {
  const _publishDate = new Date(publishDate);
  const _today = new Date(today);

  const postAge = dateDiffInDays(_publishDate, _today);

  return postAgeMessage(postAge);
}

export function dateDiffInDays(start: Date, end: Date = new Date()) {
  const millisecondsInADay = 24 * 60 * 60 * 1000;
  const startDayNum = start.getTime() / millisecondsInADay;
  const endDayNum = end.getTime() / millisecondsInADay;

  return Math.abs(Math.trunc(endDayNum - startDayNum));
}