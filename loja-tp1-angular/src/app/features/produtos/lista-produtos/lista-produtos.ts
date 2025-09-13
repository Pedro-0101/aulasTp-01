import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProduto } from '../card-produto/card-produto';
import { Produto } from '../../../model/produto';
import { ProdutoService } from '../servicos/produto.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-lista-produtos',
  standalone: true,
  imports: [CommonModule, CardProduto],
  templateUrl: './lista-produtos.html',
  styleUrls: ['./lista-produtos.css'],
})
export class ListaProdutos {
  private produtoService = inject(ProdutoService);

  private produtos = toSignal<Produto[], Produto[]>(this.produtoService.listar(), {
    initialValue: [],
  });

  // Filtro de promoção
  apenasPromo = signal(false);
  prodExibidos = computed(() =>
    this.apenasPromo() ? this.produtos().filter((p) => p.promo) : this.produtos()
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
