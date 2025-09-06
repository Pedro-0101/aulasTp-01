export interface Product {
    id: number,
    name: string,
    price: number,
    description: string
    imageUrl?: string,
    promo?: boolean,
    state?: 'Novo' | 'Usado' | 'Esgotado' 
}