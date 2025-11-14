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
  apiUrl = 'https://fakestoreapi.com/products'

  listar(): Observable<Produto[]> {
    this.logger.info('[ProdutoService] - Listando produtos');
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(lista => lista.map(json => ProdutoMapper.fromJson(json))),
      catchError(err => of([]))
    )
  }

  getById(id: number): Observable<Produto | null>{
    this.logger.info('[ProdutoService] - Buscando produto com id' + id);
    if(!id){
      throw new Error('Id invalido');
    }
    const url = this.apiUrl + id;
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

  criar(produto: Produto): Observable<any> {
    let body = {
      title: produto.nome,
      price: produto.preco,
      description: produto.descricao,
      category: produto.categoria,
      image: produto.imageUrl,
    }
    return this.http.post(this.apiUrl, body);
  }
}
