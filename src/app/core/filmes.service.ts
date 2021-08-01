import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ConfigPrams } from '../shared/models/config-prams';
import { Filme } from '../shared/models/filme';
import { ConfigparamnsService } from './configparamns.service';

const url = 'http://localhost:3000/filmes/';
@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(private http: HttpClient,
              private configService: ConfigparamnsService) { }

  salvar(filme: Filme): Observable<Filme>{
    return this.http.post<Filme>(url, filme);
  }

  editar(filme: Filme): Observable<Filme>{
    return this.http.put<Filme>(url + filme.id, filme);
  }

  lista(config: ConfigPrams): Observable<Filme[]> {
    const configPrams = this.configService.configParametros(config);
    return this.http.get<Filme[]>(url, {params: configPrams});
  }

  visualizar(id: number): Observable<Filme>{
    return this.http.get<Filme>(url + id);
  }

  excluir(id: number): Observable<void>{
    return this.http.delete<void>(url + id);
  }
}
  