export const TimeArray: TimeModel[] = [
  {start: '00:00', height: 60, hour: 0},
  {start: '01:00', height: 60, hour: 1},
  {start: '02:00', height: 60, hour: 2},
  {start: '03:00', height: 60, hour: 3},
  {start: '04:00', height: 60, hour: 4},
  {start: '05:00', height: 60, hour: 5},
  {start: '06:00', height: 60, hour: 6},
  {start: '07:00', height: 60, hour: 7},
  {start: '08:00', height: 60, hour: 8},
  {start: '09:00', height: 60, hour: 9},
  {start: '10:00', height: 60, hour: 10},
  {start: '11:00', height: 60, hour: 11},
  {start: '12:00', height: 60, hour: 12},
  {start: '13:00', height: 60, hour: 13},
  {start: '14:00', height: 60, hour: 14},
  {start: '15:00', height: 60, hour: 15},
  {start: '16:00', height: 60, hour: 16},
  {start: '17:00', height: 60, hour: 17},
  {start: '18:00', height: 60, hour: 18},
  {start: '19:00', height: 60, hour: 19},
  {start: '20:00', height: 60, hour: 20},
  {start: '21:00', height: 60, hour: 21},
  {start: '22:00', height: 60, hour: 22},
  {start: '23:00', height: 60, hour: 23},
];

export class TimeModel {
  start: string;
  height: number;
  hour: number;
  extra?: number;
}

export const TimeArrayMobile: TimeModel[] = [
  {start: '00', height: 60, hour: 0},
  {start: '01', height: 60, hour: 0},
  {start: '02', height: 60, hour: 0},
  {start: '03', height: 60, hour: 0},
  {start: '04', height: 60, hour: 0},
  {start: '05', height: 60, hour: 0},
  {start: '06', height: 60, hour: 0},
  {start: '07', height: 60, hour: 0},
  {start: '08', height: 60, hour: 0},
  {start: '09', height: 60, hour: 0},
  {start: '10', height: 60, hour: 0},
  {start: '11', height: 60, hour: 0},
  {start: '12', height: 60, hour: 0},
  {start: '13', height: 60, hour: 0},
  {start: '14', height: 60, hour: 0},
  {start: '15', height: 60, hour: 0},
  {start: '16', height: 60, hour: 0},
  {start: '17', height: 60, hour: 0},
  {start: '18', height: 60, hour: 0},
  {start: '19', height: 60, hour: 0},
  {start: '20', height: 60, hour: 0},
  {start: '21', height: 60, hour: 0},
  {start: '22', height: 60, hour: 0},
  {start: '23', height: 60, hour: 0},
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
