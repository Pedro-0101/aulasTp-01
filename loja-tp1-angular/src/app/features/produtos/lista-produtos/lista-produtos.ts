import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProduto } from '../card-produto/card-produto';
import { Produto } from '../../../model/produto';
import { ProdutoService } from '../servicos/produto.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

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
  loading = signal(true)
  categoriaSelecionada = signal('')

  produtos = toSignal<Produto[], Produto[]>(this.produtoService.listar().pipe(
    finalize(() => this.loading.set(false))
  ), {
    initialValue: [],
  });

  selecionarCategoria(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.categoriaSelecionada.set(selectElement.value || '');
  }

  produtosFiltrados = computed(() => {
    const categoria: string = this.categoriaSelecionada();
    const lista = this.produtos();

    if (!categoria) {
      return lista;
    }

    return lista.filter(p => p.categoria === categoria);
  });

  categorias = computed(() => {
    const todasCategorias = this.produtos().map(p => p.categoria);
    return [...new Set(todasCategorias)]; // remove duplicatas
  });

  // Filtro de promoção
  apenasPromo = signal(false);
  prodExibidos = computed(() => {
    const produtos = this.produtosFiltrados();
    return this.apenasPromo()
      ? produtos.filter((p) => p.promo)
      : produtos;
  });
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
