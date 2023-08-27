import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { User } from 'app/auth/models';
import { AuthenticationService } from 'app/auth/service';
import { idText } from 'typescript';

@Injectable()
export class AnomalieService{
  
  private apiServerUrl =  environment.apiBaseUrl;
  currentUser: User;
  userId: string;
  //private fournisseurID
  constructor(private http: HttpClient,private _authenticationService: AuthenticationService) { 
     this.userId = localStorage.getItem('userId');

   // this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
//this.fournisseurID=this.currentUser.iduser
  }




  /**
   * Get rows
   */

  public findAll(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/findAllAnomalie`);
}
public addAnomalie(body): Observable<any> {
  return this.http.post<any>(`${this.apiServerUrl}/createAnomalie`,body);
}

public updateAnomalie(body): Observable<any> {
  return this.http.put<any>(`${this.apiServerUrl}/updateAnomalie`,body);
}

public deleteAnomalie(id): Observable<any> {
  return this.http.delete<any>(`${this.apiServerUrl}/deleteAnomalie/${id}`);
}
}
