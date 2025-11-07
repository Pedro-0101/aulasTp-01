export interface Product {
    id: number,
    name: string,
    price: number,
    description: string,
    categoria?: string,
    imageUrl?: string,
    promo?: boolean,
    state?: 'Novo' | 'Usado' | 'Esgotado' 
}