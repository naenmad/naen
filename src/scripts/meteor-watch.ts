// Ranges and peaks follow the IMO annual shower calendar.
type MonthDay = readonly [month: number, day: number];
type Shower = { name: string; start: MonthDay; end: MonthDay; peak: MonthDay };

const SHOWERS: Shower[] = [
  { name: 'Quadrantids', start: [12, 28], end: [1, 12], peak: [1, 3] },
  { name: 'Eta Aquariids', start: [4, 19], end: [5, 28], peak: [5, 6] },
  { name: 'Perseids', start: [7, 17], end: [8, 24], peak: [8, 12] },
  { name: 'Orionids', start: [10, 2], end: [11, 7], peak: [10, 21] },
  { name: 'Leonids', start: [11, 6], end: [11, 30], peak: [11, 17] },
  { name: 'Geminids', start: [12, 4], end: [12, 20], peak: [12, 14] },
];

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const dayOfYear = ([month, day]: MonthDay) => {
  let total = day;
  for (let index = 0; index < month - 1; index += 1) total += MONTH_DAYS[index];
  return total;
};

// The sky note is written for Bogor, not for the visitor's timezone.
const todayInJakarta = (): MonthDay => {
  try {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Jakarta',
      month: 'numeric',
      day: 'numeric',
    }).formatToParts(new Date());
    const month = Number(parts.find((part) => part.type === 'month')?.value ?? 1);
    const day = Number(parts.find((part) => part.type === 'day')?.value ?? 1);
    return [month, day];
  } catch {
    const now = new Date();
    return [now.getMonth() + 1, now.getDate()];
  }
};

const label = ([month, day]: MonthDay) => `${day} ${MONTHS[month - 1]}`;

export const meteorReport = (today: MonthDay = todayInJakarta()) => {
  const todayNumber = dayOfYear(today);
  const active = SHOWERS.find((shower) => {
    const start = dayOfYear(shower.start);
    const end = dayOfYear(shower.end);
    return start <= end
      ? todayNumber >= start && todayNumber <= end
      : todayNumber >= start || todayNumber <= end;
  });

  if (active) {
    if (dayOfYear(active.peak) >= todayNumber) {
      return { active: true, text: `The ${active.name} are active, peaking around ${label(active.peak)}.` };
    }
    return { active: true, text: `The ${active.name} are active until ${label(active.end)}.` };
  }

  const next = SHOWERS.map((shower) => {
    const gap = (dayOfYear(shower.peak) - todayNumber + 365) % 365;
    return { shower, gap };
  }).sort((a, b) => a.gap - b.gap)[0];

  return { active: false, text: `Next shower: the ${next.shower.name}, around ${label(next.shower.peak)}.` };
};

export const initMeteorWatch = () => {
  const report = meteorReport();
  if (report.active) {
    document.querySelector<HTMLElement>('.cosmic-scene')?.classList.add('is-meteor-active');
  }

  const note = document.querySelector<HTMLElement>('[data-sky-event]');
  const text = document.querySelector<HTMLElement>('[data-sky-event-text]');
  if (!note || !text) return;
  text.textContent = report.text;
  note.hidden = false;
};
