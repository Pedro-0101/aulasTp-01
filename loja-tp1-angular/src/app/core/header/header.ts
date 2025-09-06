import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  tituloLoja = input.required<string>();

  exibirMensagem(msg: string): void {
    alert(msg)
  }

  textoSobre = output<string>();

  enviarSobre() {
    this.textoSobre.emit(`
      Disciplina tecnica de programacao 1.#
      Desenvolbido por pedro
    `)
  }
}
