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

export interface StudentTable {
  id: number;
  full_name: string;
  phone: string;
  contract: number;
  spent: number;
  get_status_display: string;
  given: number;
  institute: { id: number; name: string };
  type: number;
}
export interface Students {
  count: number;
  next: string;
  previous: string;
  results: StudentTable[];
}
