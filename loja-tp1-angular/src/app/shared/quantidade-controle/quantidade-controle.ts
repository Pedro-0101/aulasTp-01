import { Component, model } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quantidade-controle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quantidade-controle.html',
  styleUrls: ['./quantidade-controle.css']
})
export class QuantidadeControle {
  // Habilita [(contador)] no pai (gera automaticamente contadorChange)
  contador = model<number>(1);

  decrementar() {
    this.contador.set(Math.max(1, this.contador() - 1));
  }

  incrementar() {
    this.contador.update(v => v + 1);
  }
}
