export interface Order {

    id?: string;
    order_date: Date;
    order_details: string;
    quantity: number;
    amount?: number
    tableId: any

}