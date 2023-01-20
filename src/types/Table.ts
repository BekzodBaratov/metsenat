export interface Table {
  id: number;
  full_name: string;
  phone: string;
  sum: number;
  spent: number;
  created_at: string;
  get_status_display: string;
}
export interface Sponsors {
  count: number;
  next: string;
  previous: string;
  results: Table[];
}
