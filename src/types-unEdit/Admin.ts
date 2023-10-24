export interface Admin {
  admin_id?: number;
  email: string;
  password: string;
  date: string;
  status: number;
  img?: string;
}

export type AdminLogined = Omit<Admin, "password" | "img"> & {
  admin_id: number;
}; //omit: xóa bớt các key không dùng

export interface AdminState {
  adminLogined: AdminLogined | null;
  admins: Admin[];
  searchFilter: string;
  filter: number | null;
}
