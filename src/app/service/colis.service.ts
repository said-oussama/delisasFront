import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/auth/models';
import { AuthenticationService } from 'app/auth/service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Colis,HistoStateOnly } from '../Model/colis';


@Injectable({
  providedIn: 'root'
})
export class ColisService {
  fournisseurID;
  private societeLivraisonID = environment.societeLivraisonID
  private apiServerUrl =  environment.apiBaseUrl;
  currentUser: User;
  //private fournisseurID
  constructor(private http: HttpClient,private _authenticationService: AuthenticationService) { 
     this.fournisseurID = localStorage.getItem('userId');

   // this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
//this.fournisseurID=this.currentUser.iduser
  }
  public getTotalDeliveredMoney(f:number): Observable<Colis[]> {
    return this.http.get<Colis[]>(`${this.apiServerUrl}/total-delivered-money/{fournisseurID}`);
  }
  public getAllColisByFournisseur(f:number): Observable<Colis[]> {
    return this.http.get<Colis[]>(`${this.apiServerUrl}/findAllColisByFournisseur/${f}`);
  }
  public getColisCree(f:any): Observable<Colis[]> {
    return this.http.get<Colis[]>(`${this.apiServerUrl}/findColisByFournisseurAndEtat/${f}/cree`);
  }
  public getColisaenleve(f:any): Observable<Colis[]> {
    return this.http.get<Colis[]>(`${this.apiServerUrl}/findColisByFournisseurAndEtat/${f}/aenleve`);
  }
  public getColisEnAPrelevement(f:any): Observable<Colis[]> {
    return this.http.get<Colis[]>(`${this.apiServerUrl}/findColisByFournisseurAndEtat/${f}/enAttenteDePrelevement`);
  }
  public getColisEnStock(f:number): Observable<Colis[]> {
    return this.http.get<Colis[]>(`${this.apiServerUrl}/getColis/${f}/En stock`);
  }
  public getColisEnCoursLivraison(f:number): Observable<Colis[]> {
    return this.http.get<Colis[]>(`${this.apiServerUrl}/getColis/${f}/En cours de livraison`);
  }
  public getColisLivree(f:number): Observable<Colis[]> {
    return this.http.get<Colis[]>(`${this.apiServerUrl}/getColis/${f}/Livré`);
  }
  public getColisLivreePayee(f:number): Observable<Colis[]> {
    return this.http.get<Colis[]>(`${this.apiServerUrl}/getColis/${f}/Livré payé`);
  }
  public getColisPlanifierRetour(f:number): Observable<Colis[]> {
    return this.http.get<Colis[]>(`${this.apiServerUrl}/getColis/${f}/Planifié retour`);
  }
  public getColisRetournee(f:number): Observable<Colis[]> {
    return this.http.get<Colis[]>(`${this.apiServerUrl}/getColis/${f}/Retourné`);
  }
  public getColisAudit(reference : number): Observable<HistoStateOnly[]> {
    return this.http.get<HistoStateOnly[]>(`${this.apiServerUrl}/getColisAudit/${reference}`);
  }
  
  public countByEtat(etat : String,f:number): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/countColisByFournisseurAndEtat​/${f}/${etat}`);
  }
  public addColis(colis : Colis): Observable<Colis> {
    colis.etat = "cree" ;
    return this.http.post<Colis>(`${this.apiServerUrl}/saveColis`, colis);
  }
  public updateColis(colis : Colis): Observable<Colis> {
    return this.http.put<Colis>(`${this.apiServerUrl}/updateColis`,colis);
  }
  public deleteColis(ref : number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/deleteColisByReference/${ref}`);
  }
  public getGouvernorat(): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/gouvernorat`);
  }
  public getDelegation(gouvernoratId : String): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delegation/${gouvernoratId}`);
  }
  public findColisByBarCode(bar_code: String): Observable<Colis> {
    return this.http.get<Colis>(`${this.apiServerUrl}/findColisByBarCode/${bar_code}`); }

  public findColisByRunsheet_code(runsheet_code: number): Observable<Colis[]> {
    return this.http.get<Colis[]>(`${this.apiServerUrl}/findColisByRunsheet_code/${runsheet_code}`); 
  }
  public RemoveColisFromRunsheet(reference: number): Observable<void> {
    return this.http.get<void>(`${this.apiServerUrl}/RemoveColisFromRunsheet/${reference}`); 
  }

  public getColisByFournisseur(f:number): Observable<Colis[]> {
      return this.http.get<Colis[]>(`${this.apiServerUrl}/findAllColisByFournisseur/${f}`);
  }
  public getDechargePdf(listReference : number[]): Observable<Blob> {
      return this.http.put(`${this.apiServerUrl}/pdfDecharge`,listReference,{responseType: 'blob'});
  }
  public getBordereauPdf(listReference : number[]): Observable<Blob> {
      return this.http.put(`${this.apiServerUrl}/pdfFactureDordereau`,listReference,{responseType: 'blob'});
  }
  public downloadExemplaire(data){
    const REQUEST_PARAMS = new HttpParams().set('fileName', data.fileName);
    const REQUEST_URI = `${this.apiServerUrl}/download`;
    return this.http.get(REQUEST_URI, {params: REQUEST_PARAMS,responseType: 'arraybuffer'})
  }
  public findColisByEtat(etat : String): Observable<Colis[]> {
      return this.http.get<Colis[]>(`${this.apiServerUrl}/findColisByEtat/${etat}`);
  }
  public findColisByService(service : String,f:number): Observable<Colis[]> {
    return this.http.get<Colis[]>(`${this.apiServerUrl}/getColisByService/${f}/${service}`);
}
public findAllColisByService(service : String): Observable<Colis[]> {
  return this.http.get<Colis[]>(`${this.apiServerUrl}/findColisByEtat/${service}`);
}
  public getColisBySocieteLiv(): Observable<Colis[]> {
      return this.http.get<Colis[]>(`${this.apiServerUrl}/getColisBySocieteLiv/${this.societeLivraisonID}`);
  }
public countColisByEtatAndSocieteLiv(etat : String): Observable<number> {
      return this.http.get<number>(`${this.apiServerUrl}/countColisByEtatAndSocieteLiv/${this.societeLivraisonID}/${etat}`);
  }
public getColisCreeBySocieteLiv(): Observable<Colis[]> {
    return this.http.get<Colis[]>(`${this.apiServerUrl}/findColisByFournisseurAndEtat/${this.fournisseurID}/cree`);
}
public findColisByFournisseurAndEtat(id,etat): Observable<Colis[]> {
  return this.http.get<Colis[]>(`${this.apiServerUrl}/findColisByFournisseurAndEtat/${id}/${etat}`);
}
public getColisEnstockBySocieteLiv(): Observable<Colis[]> {
    return this.http.get<Colis[]>(`${this.apiServerUrl}/findColisByFournisseurAndEtat/${this.fournisseurID}/enStock`);
}
public getColisEncoursDeLivraisonBySocieteLiv(): Observable<Colis[]> {
  return this.http.get<Colis[]>(`${this.apiServerUrl}/findColisByFournisseurAndEtat/${this.fournisseurID}/enCoursDeLivraison`);
}
public getColisLivreBySocieteLiv(): Observable<Colis[]> {
  return this.http.get<Colis[]>(`${this.apiServerUrl}/findColisByFournisseurAndEtat/${this.fournisseurID}/livre`);
}
public getColisLivrePayeBySocieteLiv(): Observable<Colis[]> {
  return this.http.get<Colis[]>(`${this.apiServerUrl}/findColisByFournisseurAndEtat/${this.fournisseurID}/livrePaye`);
}
public getColisplanificationRetourBySocieteLiv(): Observable<Colis[]> {
  return this.http.get<Colis[]>(`${this.apiServerUrl}/findColisByFournisseurAndEtat/${this.fournisseurID}/planificationRetour`);
}
public getColisRetourneBySocieteLiv(): Observable<Colis[]> {
  return this.http.get<Colis[]>(`${this.apiServerUrl}/findColisByFournisseurAndEtat/${this.fournisseurID}/retourne`);
}
importColis(colisList):  Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/massiveSaveColis`,colisList );
  }
  getAllColis(): Observable<Colis[]> {
    return this.http.get<Colis[]>(`${this.apiServerUrl}/findAllColis`);
  }
  getHistory(barcode): Observable<Colis[]> {
    return this.http.get<Colis[]>(`${this.apiServerUrl}/findColisAuditByReference/${barcode}`);
  }
  
​forceModificationsColis(body): Observable<any> {
  return this.http.put<any>(`${this.apiServerUrl}/forceModificationsColis`,body);
  
  
}
forceModificationsColisList(body:any[]) {
  return this.http.post<Colis[]>(`${this.apiServerUrl}/aenleve`,body);  //colisPayloadList: ColisForceModificationsPayload[]

  
}
getConsoleStatistics(): Observable<any> {
  return this.http.get<any>(`${this.apiServerUrl}/consoleStatistics`);
}
getDebriefStatistics(): Observable<any> {
  return this.http.get<any>(`${this.apiServerUrl}/debriefStatistics`);
}
  getColisByRef(ref): Observable<any> {
    return this.http.get<Colis[]>(`${this.apiServerUrl}/findColisByBarCode/${ref}`);
  }
  assignHubColis(idHub,body): Observable<any> {
    return this.http.put<any>(`${this.apiServerUrl}/assignHubColis/${idHub}`,body);
  }
}



