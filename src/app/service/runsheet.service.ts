import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Runsheet } from '../Model/runsheet';

@Injectable({
  providedIn: 'root'
})
export class RunsheetService {

  private apiServerUrl =  environment.apiBaseUrl;
  constructor(private http: HttpClient) { }


  public getRunsheetById(ref : number): Observable<Runsheet> {
    return this.http.get<Runsheet>(`${this.apiServerUrl}/retrieve-Runsheet/${ref}`);
  }
  public updateRunsheet(runsheet : Runsheet): Observable<Runsheet> {
    return this.http.put<Runsheet>(`${this.apiServerUrl}/modify-Runsheet`,runsheet); 
  }
  public deleteRunsheet(ref : number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/removeRunsheet/${ref}`);
  }
  public getRunsheetPdf(ref : number): Observable<Blob> {
    return this.http.get(`${this.apiServerUrl}/runsheet/${ref}`,{responseType: 'blob' });
  }
  public addColisToRunsheet(code_runsheet : number, bar_codeList: String[] ): Observable<String> {
    return this.http.put<String>(`${this.apiServerUrl}/addColisToRunsheet/${code_runsheet}`,bar_codeList);
  }
  public totalCodPerRunsheet(ref : number): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/totalCodPerRunsheet/${ref}`);
  }
  public addRunsheet(body): Observable<Runsheet> {
    return this.http.post<Runsheet>(`${this.apiServerUrl}/addRunsheet`, body);
  }
  

  public cloturerRunsheet(id): Observable<Runsheet> {
    return this.http.put<Runsheet>(`${this.apiServerUrl}/encloseRunsheet/${id}`,{});
  }
  public retrieveAllRunsheets(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/retrieveAllRunsheets`);
  }
}
