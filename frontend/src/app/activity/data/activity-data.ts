export const HourArray: string[] = [
  '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00',
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
  '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
];

export const HourArrayMobile: string[] = [
  '00', '01', '02', '03', '04', '05', '06', '07',
  '08', '09', '10', '11', '12', '13', '14', '15',
  '16', '17', '18', '19', '20', '21', '22', '23'
];

export const WeekArray: { label: string, date: Date }[] = [
  { label: 'ПН', date: null },
  { label: 'ВТ', date: null },
  { label: 'СР', date: null },
  { label: 'ЧТ', date: null },
  { label: 'ПТ', date: null },
  { label: 'СБ', date: null },
  { label: 'ВС', date: null }
];

export const BackgroundColors: string[] = [
  '#f9a98d',
  '#ffd8a1',
  '#faf5b3',
  '#d5e6af',
  '#c5e2b6',
  '#b8def5',
  '#abb7dd',
  '#c5acd3',
  '#e6b3d2',
  '#f7aec1'
];

export class DateValue {
  value: Date;
}
