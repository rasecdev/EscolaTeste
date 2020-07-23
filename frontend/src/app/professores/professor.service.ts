import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment} from '../../environments/environment';
import { Professor} from '../models/Professor';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  baseUrl = `${environment.baseUrl}/api/professor`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Professor[]> {
    return this.http.get<Professor[]>(`${this.baseUrl}`);
  }

  getById(id: number): Observable<Professor> {
    return this.http.get<Professor>(`${this.baseUrl}/${id}`);
  }

  put(professor: Professor) {
    return this.http.put(`${this.baseUrl}/${professor.id}`, professor);
  }

  post(professor: Professor) {
    return this.http.post(`${this.baseUrl}`, professor);
  }

  delete(id: number): Observable<Professor> {
    return this.http.delete<Professor>(`${this.baseUrl}/${id}`);
  }
}
