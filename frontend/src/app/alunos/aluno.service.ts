import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment} from 'src/environments/environment';
import { Aluno} from '../models/Aluno';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  baseUrl = `${environment.baseUrl}/api/aluno`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.baseUrl}`);
  }

  getById(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.baseUrl}/${id}`);
  }

  put(aluno: Aluno) {
    return this.http.put(`${this.baseUrl}/${aluno.id}`, aluno);
  }

  post(aluno: Aluno) {
    return this.http.post(`${this.baseUrl}`, aluno);
  }

  delete(id: number): Observable<Aluno> {
    return this.http.delete<Aluno>(`${this.baseUrl}/${id}`);
  }
}
