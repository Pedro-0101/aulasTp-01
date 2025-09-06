import { Component, input, output, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { QuantidadeControle } from '../../../shared/quantidade-controle/quantidade-controle';
import { Produto } from '../../../model/produto';
import { DescontoPipe } from '../../../shared/pipes/desconto-pipe';

@Component({
  selector: 'app-card-produto',
  standalone: true,
  imports: [CommonModule, QuantidadeControle, CurrencyPipe, DescontoPipe],
  templateUrl: './card-produto.html',
  styleUrls: ['./card-produto.css']
})
export class CardProduto {
  // Input como signal (obrigatório)
  produto = input.required<Produto>();

  view = output<number>();
  add = output<{ id: number; quantity: number }>();

  qtde = signal(1);

  onView() {
    this.view.emit(this.produto().id);
  }

  onAdd() {
    this.add.emit({ id: this.produto().id, quantity: this.qtde() });
  }
}
