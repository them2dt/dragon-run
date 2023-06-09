export type Config = Array<{
  poolAddress?: string;
  country: string;
  name: string;
  month_date: string;
  day_date: string;
  racetrack: string;
  status?: string;
  staked?: number;
}>;
