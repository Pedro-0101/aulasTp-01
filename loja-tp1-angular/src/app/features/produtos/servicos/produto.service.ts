import { inject, Injectable } from '@angular/core';
import { LoggerService } from '../../../core/service/logger/logger.service';
import { Produto } from '../../../model/produto';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  logger = inject(LoggerService);

  private readonly listaMock: Produto[] = [
    {
      id: 1,
      nome: 'Teclado Mecânico',
      preco: 1200,
      descricao: 'Switch blue, RGB.',
      imageUrl: 'images/keyboard.jpg',
      promo: true,
      state: 'Esgotado',
    },
    {
      id: 2,
      nome: 'Mouse Gamer 7200 DPI',
      preco: 649.5,
      descricao: '10 botões, macro programável.',
      imageUrl: 'images/mouse.jpg',
      state: 'Novo',
    },
    {
      id: 3,
      nome: 'Headset Surround 7.1',
      preco: 899.9,
      descricao: 'Microfone com redução de ruído.',
      imageUrl: 'images/headset.jpg',
      state: 'Usado',
    },
  ];

  listar(): Observable<Produto[]> {
    this.logger.info('[ProdutoService] - Listando produtos');
    return of(this.listaMock).pipe(delay(1000));
  }

  getById(id: number): Observable<Produto | undefined>{
    return of(this.listaMock.find( p => p.id == id)).pipe(delay(500));
  }
}
