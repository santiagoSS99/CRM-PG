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
