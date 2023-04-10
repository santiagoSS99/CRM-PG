export interface Customer {
    id?: string;
    name: string;
    surnames: string;
    country?: string | null;
    email: string;
    t_number: string;
    gender?: string | null;
    f_birthday: string;
    notifications: boolean;
}
