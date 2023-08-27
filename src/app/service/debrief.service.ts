import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Hub } from '../Model/hub';

@Injectable({
  providedIn: 'root'
})
export class DebriefService {

  rows: any;
  
  onDatatablessChanged: BehaviorSubject<any>;
  private apiServerUrl =  environment.apiBaseUrl;
  private societeLivraisonID = environment.societeLivraisonID;
  constructor(private http: HttpClient) { this.onDatatablessChanged = new BehaviorSubject({});}

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  public getListColisByLivreur(id,idSelectedRunsheet): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/findColisByIdLivreur/${id}/${idSelectedRunsheet}`);
  }
  public getAllAnomalies(): Observable<Hub> {
    return this.http.get<any>(`${this.apiServerUrl}/findAllAnomalie`);
  }

public treatColisDebriefBS(bar_code): Observable<any> {
  return this.http.put<any>(`${this.apiServerUrl}/treatColisDebriefBS/${bar_code}`,{});
}
getRunsheetList(idLivreur): Observable<Hub> {
  return this.http.get<any>(`${this.apiServerUrl}/findRunsheetLivreurNCltr/${idLivreur}`);
}

public treatColisDebriefBSM(body): Observable<any> {
  return this.http.put<any>(`${this.apiServerUrl}/treatColisDebriefBS`,body);
}
public assignAnomalieToColis(barCode,idAnomalie): Observable<any> {
  return this.http.put<any>(`${this.apiServerUrl}/assignAnomalieToColis/${barCode}/${idAnomalie}`,{});
}

assignAnomalieToColisList(body,idAnomalie) : Observable<any> {
  return this.http.put<any>(`${this.apiServerUrl}/assignAnomalieToColisList/${idAnomalie}`,body);
}
createDebrief(body){
  return this.http.post<any>(`${this.apiServerUrl}/createDebrief`,body);

}
updateDebrief(body){
  return this.http.put<any>(`${this.apiServerUrl}/updateDebrief`,body);
}
findDebriefById(id): Observable<any> {
  return this.http.get<any>(`${this.apiServerUrl}/findDebriefById/${id}`);
}
findAll(){
  return this.http.get<any>(`${this.apiServerUrl}/findAllDebrief`);
}
}