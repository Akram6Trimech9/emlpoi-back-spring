import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NonDesponibilitie } from '../models/nonDisponibilites.models';   
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NonDesponibilitieService {
  private apiUrl = `${environment.backendHost}/nonDisponibilites` ;

  constructor(private http: HttpClient) {}

   getAllNonDisponibilites(): Observable<NonDesponibilitie[]> {
    return this.http.get<NonDesponibilitie[]>(this.apiUrl);
  }

   getNonDesponibilitieById(id: number): Observable<NonDesponibilitie[]> {
    const url = `${this.apiUrl}/enseignant/${id}`;
    return this.http.get<NonDesponibilitie[]>(url);
  }

   createNonDesponibilitie(NonDesponibilitie: NonDesponibilitie): Observable<NonDesponibilitie> {
    return this.http.post<NonDesponibilitie>(this.apiUrl, NonDesponibilitie);
  }

   updateNonDesponibilitie(id: number, NonDesponibilitie: NonDesponibilitie): Observable<NonDesponibilitie> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<NonDesponibilitie>(url, NonDesponibilitie);
  }

   deleteNonDisponibilite(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

   searchNonDispo(keyword: string, page: number, size: number): Observable<NonDesponibilitie[]> {
    const url = `${this.apiUrl}/search?keyword=${keyword}&page=${page}&size=${size}`;
    return this.http.get<NonDesponibilitie[]>(url);
  }
}
