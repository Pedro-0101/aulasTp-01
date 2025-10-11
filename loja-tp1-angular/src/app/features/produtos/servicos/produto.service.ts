import { inject, Injectable } from '@angular/core';
import { LoggerService } from '../../../core/service/logger/logger.service';
import { Produto, ProdutoMapper } from '../../../model/produto';
import { catchError, delay, Observable, of, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  logger = inject(LoggerService);
  http = inject(HttpClient);

  listar(): Observable<Produto[]> {
    this.logger.info('[ProdutoService] - Listando produtos');
    return this.http.get<any[]>('https://fakestoreapi.com/products').pipe(
      map(lista => lista.map(json => ProdutoMapper.fromJson(json))),
      catchError(err => of([]))
    )
  }

  getById(id: number): Observable<Produto | null>{
    this.logger.info('[ProdutoService] - Buscando produto com id' + id);
    if(!id){
      throw new Error('Id invalido');
    }
    const url = 'https://fakestoreapi.com/products/' + id;
    const produto = this.http.get<any>(url).pipe(
      map(json => ProdutoMapper.fromJson(json)),
      catchError(err => of(null))
    )
    if(!produto){
      throw new Error('Produto nao encontrado');
    }else {
      return produto
    }
  }
}
