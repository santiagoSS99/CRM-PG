export enum TableStatus { 
    Ocupado,
    Disponible,
    Reservado
}

export const TableStatusLabelMapping: Record<TableStatus | string, string> = {
    [TableStatus.Ocupado]: "Ocupado",
    [TableStatus.Disponible]: "Disponible",
    [TableStatus.Reservado]: "Reservado",
};

export enum PaymentMethods {
    Efectivo = 'Efectivo',
    Tarjeta = 'Tarjeta',
    Transferencia = 'Transferencia',
    Otros = 'Otros',
}

export const PaymentMethodsLabelMapping: Record<PaymentMethods | string, string> = {
    [PaymentMethods.Efectivo]: "Efectivo",
    [PaymentMethods.Tarjeta]: "Tarjeta",
    [PaymentMethods.Transferencia]: 'Transferencia',
    [PaymentMethods.Otros]: "Otro",
};

export enum OrderStatus { 
    En_Proceso,
    Completado,
    Cancelado
}

export const OrderStatusLabelMapping: Record<OrderStatus | string, string> = {
    [OrderStatus.En_Proceso]: "Ocupado",
    [OrderStatus.Completado]: "Completado",
    [OrderStatus.Cancelado]: "Cancelado",
};
