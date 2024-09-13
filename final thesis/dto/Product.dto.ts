export interface Products{
    id: number,
    name: string,
    description: string,
    category: string,
    price: number
}

export interface CartItems extends Products{
    quantity: number;
}