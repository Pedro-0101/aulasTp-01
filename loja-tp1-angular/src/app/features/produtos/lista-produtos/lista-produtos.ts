import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProduto } from '../card-produto/card-produto';
import { Produto } from '../../../model/produto';

@Component({
  selector: 'app-lista-produtos',
  standalone: true,
  imports: [CommonModule, CardProduto],
  templateUrl: './lista-produtos.html',
  styleUrls: ['./lista-produtos.css']
})
export class ListaProdutos {
  // Catálogo estático (é possível fazer com signal)
  produtos: Produto[] = [
    {
      id: 1,
      nome: 'Teclado Mecânico',
      preco: 1200,
      descricao: 'Switch blue, RGB.',
      imageUrl: 'images/keyboard.jpg',
      promo: true,
      state: 'Esgotado'
    },
    {
      id: 2,
      nome: 'Mouse Gamer 7200 DPI',
      preco: 649.5,
      descricao: '10 botões, macro programável.',
      imageUrl: 'images/mouse.jpg',
      state: 'Novo'
    },
    {
      id: 3,
      nome: 'Headset Surround 7.1',
      preco: 899.9,
      descricao: 'Microfone com redução de ruído.',
      imageUrl: 'images/headset.jpg',
      state: 'Usado'
    }
  ];

  // Filtro de promoção
  apenasPromo = signal(false);
  prodExibidos = computed(() =>
    this.apenasPromo() ? this.produtos.filter((p) => p.promo) : this.produtos
  );
  alternarPromo() {
    this.apenasPromo.update((p) => !p);
  }

  onViewProduct(id: number) {
    alert('Página de detalhe ainda não implementada.');
  }

  onAddToCart(produto: { id: number; quantity: number }) {
    alert(`Carrinho ainda não implementado. Quantidade: ${produto.quantity}`);
  }
}
