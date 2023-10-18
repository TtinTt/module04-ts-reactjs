export interface Admin {
  admin_id?: number;
  email: string;
  password: string;
  date: string;
  status: number;
  img?: string;
}

export interface AdminLogined {
  admin_id: number;
  email: string;
  date: string;
  status: number;
}

export interface AdminState {
  adminLogined: AdminLogined | null;
  admins: Admin[];
  searchFilter: string;
  filter: any | null; // Specify the type of filter if known
}
