export const LATE_NIGHT_THRESHOLD = 4;

export function isLateNight(date = new Date()) {
  return 0 <= date.getHours() < LATE_NIGHT_THRESHOLD;
}
export function isLastNightAnswer(timestamp) {
  if (timestamp) {
    const refDate = new Date(timestamp);

    const lastMidnight = new Date(
      refDate.getFullYear(),
      refDate.getMonth(),
      refDate.getDate(),
      0,
    );
    const earlyMorning = new Date(
      refDate.getFullYear(),
      refDate.getMonth(),
      refDate.getDate(),
      LATE_NIGHT_THRESHOLD,
    );

    return timestamp < +earlyMorning && timestamp > +lastMidnight;
  }

  return false;
}

export function getRefDateTimestamp(timestamp) {
  const refDate = timestamp ? new Date(timestamp) : new Date();

  if (isLateNight(refDate)) {
    return +new Date(
      refDate.getFullYear(),
      refDate.getMonth(),
      refDate.getDate() - 1,
      0,
    );
  } else {
    return refDate;
  }
}

export function getReadableDate(timestamp) {
  const refDate = timestamp ? new Date(timestamp) : new Date();

  return refDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
