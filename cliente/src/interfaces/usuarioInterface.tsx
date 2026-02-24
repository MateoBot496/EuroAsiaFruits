export default interface Usuario {
  id: number;
  email: string;
  password_hash: string;
  role: number; // 0 = cliente, 1 = admin
  is_active: any;
  created_by: number;
}
