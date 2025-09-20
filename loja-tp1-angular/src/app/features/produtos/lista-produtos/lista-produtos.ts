import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProduto } from '../card-produto/card-produto';
import { Produto } from '../../../model/produto';
import { ProdutoService } from '../servicos/produto.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-produtos',
  standalone: true,
  imports: [CommonModule, CardProduto],
  templateUrl: './lista-produtos.html',
  styleUrls: ['./lista-produtos.css'],
})
export class ListaProdutos {
  private produtoService = inject(ProdutoService);
  private router = inject(Router)

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
    this.router.navigate(['/produtos', id]);
  }

  onAddToCart(produto: { id: number; quantity: number }) {
    alert(`Carrinho ainda não implementado. Quantidade: ${produto.quantity}`);
  }

}
