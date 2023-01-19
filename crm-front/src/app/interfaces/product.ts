export interface Product {

    id?: string;
    product_name: string;
    price: number;
    description: string;
    // createdAt?: Date;
    // updatedAt?: Date;
    quantity: number;
    provider: string;
    selled: number;
    // barcode?: string;
    images?: any[]
}
