import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProdutoService } from '../servicos/produto.service';
import { Router } from '@angular/router';
import { Produto } from '../../../model/produto';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-produto-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './produto-form.html',
  styleUrl: './produto-form.css'
})
export class ProdutoForm {
  private produtoService = inject(ProdutoService);
  private router = inject(Router);

  enviando = signal(false);
  mensagem = signal('');
  novaCategoria = signal('');
  categoriaSelecionada = signal('');


  novoProduto: Produto = {
    id: 0,
    nome: '',
    preco: 0,
    descricao: '',
    categoria: '',
    imageUrl: ''
  }

  private produtos = toSignal(this.produtoService.listar(), { initialValue: [] });

  categorias = computed(() => {
    const lista = this.produtos().map(p => p.categoria);
    const unicas = Array.from(new Set(lista));
    unicas.sort();
    return [... unicas, 'Outra'];
  })

  mostrarNovaCategoria = computed(() => this.categoriaSelecionada() === 'Outra');

  onSubmit(form: NgForm) {
    if(form.invalid) {
      this.mensagem.set('Houve um erro de validação dos campos');
      return;
    }

    this.novoProduto.categoria = this.categoriaSelecionada() === 'Outra' ? 
                                                                          this.novaCategoria() : 
                                                                          this.categoriaSelecionada();

    this.enviando.set(true);
    this.mensagem.set('Enviando produto...');

    this.produtoService.criar(this.novoProduto).subscribe({
      next: (res) => {
        this.mensagem.set('Produto criado com sucesso!');
        console.log('Produto criado:', res);
        form.resetForm();
        setTimeout(() => this.onReturnToList(), 1200);
      },
      error: (res) => {
        this.mensagem.set('Houve um erro ao criar o produto.');
        console.error('Erro ao criar produto:', res);
      },
      complete: () => this.enviando.set(false)
    })
  }

  onReturnToList() {
    this.router.navigate(['/produtos']);
  }

  validarNome(nome: string): boolean {
    return nome.trim().length >= 3;
  }

}
