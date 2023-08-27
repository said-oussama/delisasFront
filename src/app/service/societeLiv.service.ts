import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { SocieteLiv } from '../Model/societeLiv';

@Injectable({
  providedIn: 'root'
})

export class SocieteLivService {

  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getSocieteLivById(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/initializeCompanyInfos`);
  }

  public getSocieteLivByIdLogo(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/logoSocietePrincipal`);
  }
  addSociete(form): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/configureSocietePrincipal`, form); 
  }
  addSocieteWithLogo(form): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/configureSocietePrincipalWithLogo`, form);
  }
}