export interface Mess {
  id: number;
  email: string;
  name: string;
  phone: string;
  date: string;
  mess: string;
  status: number;
  img?: string;
}

export interface MessState {
  searchFilter: string;
  filter: number;
  messs: Mess[];
}
