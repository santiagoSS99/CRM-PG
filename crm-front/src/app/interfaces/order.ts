export interface Order {
    id?: number | undefined;
    order_details: string;
    tableId: any;
    amount?: number;
    order_date: Date;
    quantity: number;
    order_status?: number;
    observations?: string;
    product?: any;
}