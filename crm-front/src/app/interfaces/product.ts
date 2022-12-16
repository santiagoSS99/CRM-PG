export interface Product {

    _id?: string;
    product_name: string;
    price: number;
    description: string;
    imageURL: string;
    createdAt?: Date;
    updatedAt?: Date;
    quantity: number;
    provider: string;
    selled: number;
    barcode?: string;
}
