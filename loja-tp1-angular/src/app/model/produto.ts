const estados = ["Novo", "Usado", "Esgotado"] as const;

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  categoria: string;
  imageUrl?: string;
  promo?: boolean;
  state?: 'Novo' | 'Usado' | 'Esgotado';
}

export class ProdutoMapper {
  static fromJson(json: any): Produto {
    let _estado = estados[Math.floor(Math.random() * estados.length)];
    return {
      id: json.id,
      nome: json.title,
      preco: json.price,
      descricao: json.description,
      categoria: json.category,
      imageUrl: json.image,
      state: _estado,
      promo: json.id % 5 == 0 && _estado != "Esgotado"
    }
  }

  static toJson(produto: Produto): any {
    return {
      id: produto.id,
      title: produto.nome,
      price: produto.preco,
      description: produto.descricao,
      category: produto.categoria,
      image: produto.imageUrl,
    }
  }
}

