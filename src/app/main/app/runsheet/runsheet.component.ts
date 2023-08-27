import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalConfig, ToastrService } from 'ngx-toastr';
import { CustomToastrComponent } from 'app/main/extensions/toastr/custom-toastr/custom-toastr.component';
import * as snippet from 'app/main/forms/form-layout/form-layout.snippetcode';
import { Runsheet } from 'app/Model/runsheet';
import { NgForm } from '@angular/forms'
import { RunsheetService } from 'app/service/Runsheet.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { CoreTranslationService } from '@core/services/translation.service';
import { FournisseurService } from 'app/service/fournisseur.service';
import { PersonnelService } from 'app/service/personnel.service';
import { Fournisseur } from 'app/Model/fournisseur';
import { Observable } from 'rxjs';
import { LivreurList, Personnel } from 'app/Model/personnel';
import { Colis } from 'app/Model/colis';
import { ColisService } from 'app/service/colis.service';

@Component({
  selector: 'runsheet',
  templateUrl: './runsheet.component.html',
  styleUrls: ['./runsheet.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RunsheetComponent {
  private _unsubscribeAll: Subject<any>;//
  private tempData = [];//

  // public
  public contentHeader: object;
  public rows: any;//
  public selected = [];
  public kitchenSinkRows: any;//
  public ListColisRows: any;//
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public expanded = {};
  public exportCSVData;//
  public displayForm : boolean = false ;

  public code_runsheetVar;
	public etat_debriefVar;
  public total_prixVar; 
	public fournisseur_idVar; 
	public personnel_idVar; 
  public fournisseurVar;
  public personnelVar;
  public addBar_codeVar;
  public responseCode;
  public bar_codeVar;
 public deleteColis;
 public deleteColisUpdate;

  public editRunsheet : Runsheet;
  public deleteRunsheet : {};

  public listBar_code:String []=[];
  public updateListBar_code:String []=[];
 
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;

  public testRunsheet: Runsheet;
  public testFournisseur: Fournisseur;
  public testPersonnel: Personnel;
  public testLivreurList : LivreurList[];
  public testListColis : Colis[]=[];
  public ListColisForUpdate : Colis[]=[];
  public responseColis : Colis ; 
  
  /**
   * Search (filter)
   *
   * @param event
   */
   filterUpdate(event) {
    const val = event.target.value.toLowerCase();
    if (val !=""){
    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.personnel.nom.toLowerCase().startsWith(val) || d.personnel.prenom.toLowerCase().startsWith(val) || d.etat_debrief.toLowerCase().startsWith(val) ||  d.total_prix.toString().toLowerCase().startsWith(val) ;
    });

    // update the rows
    this. kitchenSinkRows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;}
    else{
      this.ngOnInit();
    }
  }

 // private
private toastRef: any;
private options: GlobalConfig;

/**
 * Constructor
 *
 * @param {DatatablesService} _datatablesService
 * @param {CoreTranslationService} _coreTranslationService
 * @param {ToastrService} _toastrService
 */
  
  constructor(private router: Router, private runsheetService: RunsheetService, private modalService: NgbModal,
     private servicePersonnel : PersonnelService, 
     private _toastrService: ToastrService,private serviceColis : ColisService) 
     {
      this._unsubscribeAll = new Subject();
     }

     ngOnInit() {
    this.runsheetService.retrieveAllRunsheets().subscribe(data=>{
      this.kitchenSinkRows = data;
    })
      
      this.contentHeader = {
        headerTitle: 'Gestion Runsheet',
        actionButton: true,
        breadcrumb: {
          type: '',
          links: [
            {
              name: 'Home',
              isLink: true,
              link: '/'
            },
            {
              name: 'Gestion Runsheet',
              isLink: false
            }
          ]
        }
      };
    }
    openCreateModal() {
      this.router.navigate(['/ajouter-runsheet/ajouter-runsheet']);
    }
  btnDisplayForm () 
  {
     this.displayForm = true ; 
  };
  btnAnnulerForm () 
  {
    this.displayForm = false ; 
    this.ListColisRows=null;

  };

  async onAddBar_code()
  {
      await this.serviceColis.findColisByBarCode(this.bar_codeVar.toString()).toPromise().then(
        (response : Colis )=> {this.responseColis = response;}
      ); //console.log("hetha baad ma jebou ml bd",this.responseColis);
      if (this.responseColis.etat=="En stock" || this.responseColis.etat=="Planifié retour" )
          {   
              this.listBar_code.push(this.bar_codeVar.toString());
              console.log(this.listBar_code)
              this.testListColis.push(this.responseColis)
              this.ListColisRows= this.testListColis;
              this.bar_codeVar='';
          }
      else 
          {
            this._toastrService.error("L'etat du colis ajouté est ni En stock ni Planifié retour",
            "Échec d'ajout !",{ toastClass: 'toast ngx-toastr', closeButton: true, });
              this.bar_codeVar='';
          }
  }

async openUpdateModal(runsheet : Runsheet ,modalUpdate) 
  {
    this.modalService.open(modalUpdate, {centered: true,size: 'lg' });
    this.editRunsheet= runsheet;
    await this.serviceColis.findColisByRunsheet_code(this.editRunsheet.code_runsheet).toPromise().then(
      (response : Colis[] )=> {this.ListColisForUpdate = response; console.log(this.ListColisForUpdate)})
  }
    
openDeleteModal(runsheet : Runsheet, modalDelete) 
  {
    this.modalService.open(modalDelete, {centered: true,windowClass: 'modal modal-danger'});
    console.log(runsheet)
    this.deleteRunsheet= runsheet;
  } 
  openDeleteColisModal(s : string, modalDelete) 
  {
    this.modalService.open(modalDelete, {centered: true,windowClass: 'modal modal-danger'});
    this.deleteColis= s;


  } 
  openDeleteColisUpdateModal(s : number, modalDelete) 
  {
    this.modalService.open(modalDelete, {centered: true,windowClass: 'modal modal-danger'});
    this.deleteColisUpdate= s;
    console.log(this.deleteColisUpdate)


  } 

async RemoveColisFromRunsheet2(colis : String ){
  console.log(colis)
  //console.log(this.ListColisRows.indexOf(colis))
  //  await delete this.ListColisRows[0];
await  this.ListColisRows.forEach((value,index)=>{
    if(value.bar_code==colis) this.ListColisRows.splice(index,1);
});
await  this.listBar_code.forEach((value,index)=>{
  if(value==colis) this.listBar_code.splice(index,1);
});
//console.log(this.ListColisRows)
document.getElementById('btnAnnulerDelete').click(); 

    }
    async RemoveColisFromRunsheet(reference : number ){
      await this.serviceColis.RemoveColisFromRunsheet(reference).toPromise().then(
        (response : void)=> {console.log("done");},
        (error : HttpErrorResponse) => { console.log(error.message);})
  
      await this.serviceColis.findColisByRunsheet_code(this.editRunsheet.code_runsheet).toPromise().then(
        (response : Colis[] )=> {this.ListColisForUpdate = response;} )
        document.getElementById('btnAnnulerDelete').click(); 

      }

public async onUpdateRunsheetListColis(){
    await this.serviceColis.findColisByBarCode(this.addBar_codeVar.toString()).toPromise().then(
    (response : Colis )=> {this.responseColis = response;})

    if (this.responseColis.etat=="En stock" || this.responseColis.etat=="Planifié retour" )
        {  
            this.ListColisForUpdate.push(this.responseColis)
            this.ListColisForUpdate.forEach
              (
                  colis => this.updateListBar_code.push(colis.bar_code.toString())
              )
            this.addBar_codeVar='';
            await this.runsheetService.addColisToRunsheet(this.editRunsheet.code_runsheet,this.updateListBar_code).toPromise().then(
            (response2 : String )=> {console.log(response2)});
          
        } 
    else 
        {
            this._toastrService.error("L'etat du colis ajouté est ni En stock ni Planifié retour",
            "Échec d'ajout !",{ toastClass: 'toast ngx-toastr', closeButton: true, });
            this.addBar_codeVar='';
        }

}
public async onAddRunsheet (HWForm : NgForm) :Promise<void> {
    if (HWForm.form.valid === true)
        {
            let totalPrix ; 
            let runsheetForTotal;
            this.testRunsheet=Object.assign(HWForm.value);
            await this.servicePersonnel.getPersonnelById(this.personnel_idVar).toPromise().then(
            (response : Personnel)=> {this.testPersonnel = response;},
            (error : HttpErrorResponse) => { alert ( error.message)}
            );
            this.testRunsheet.personnel= this.testPersonnel;
         console.log(this.ListColisRows)
        
            await this.runsheetService.addRunsheet(this.testRunsheet).toPromise().then(
            (response : Runsheet )=> {this.responseCode= response.code_runsheet; 
            this._toastrService.success('Vous avez ajouté le runsheet '+ response.code_runsheet +' avec succès ! ',
            'Ajout avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true,timeOut:2000 }).onHidden.subscribe(res =>{
              HWForm.reset(); 
              this.servicePersonnel.getLivreurList().toPromise().then(
                (response: LivreurList[]) => { this.testLivreurList = response; }
                )
            
            });
            //window.location.reload();
          },
            (error : HttpErrorResponse) => {console.log(error.message) ; });

            await this.runsheetService.addColisToRunsheet(this.responseCode,this.listBar_code).toPromise().then(
            (response : String )=> {});
            
            this.getRunsheetPdf(this.responseCode);
        }   
    else 
        {
          this._toastrService.error('Vérifier que vous avez bien rempli le formulaire ! ',"Échec d'ajout !",
          {toastClass: 'toast ngx-toastr', closeButton: true,});
        }
  }

  public async onUpdateRunsheet (runsheet : Runsheet) :Promise<void> {
    this.runsheetService.updateRunsheet(this.editRunsheet).subscribe(
    (response : Runsheet )=> {;
    this._toastrService.success('Vous avez modifié le runsheet '+ response.code_runsheet +' avec succès ! ',
    'Modification avec succès !',{ toastClass: 'toast ngx-toastr', closeButton: true,});   
    document.getElementById('btnAnnulerUpdate').click();
    window.location.reload();},

    (error : HttpErrorResponse) => { alert ( error.message) ;
    this._toastrService.error('Vérifier que vous avez bien rempli le formulaire ! ',
    "Échec Modification !", { toastClass: 'toast ngx-toastr', closeButton: true,timeOut:2000 }).onHidden.subscribe(res => window.location.reload());
  });    
  }

public onDeleteRunsheet (runsheetId : number) :void {

    this.runsheetService.deleteRunsheet(runsheetId).subscribe(
    (response : void )=> {;});
    document.getElementById('btnAnnulerDelete').click(); 
    this._toastrService.success('Vous avez supprimé le runsheet '+ runsheetId +' avec succès ! ',
    'Suppression avec succès !',{ toastClass: 'toast ngx-toastr', closeButton: true,timeOut:2000 }).onHidden.subscribe(res => 
{      this.ngOnInit();
}      
      );
    }
    
    cloturerRunsheet(id){
      this.runsheetService.cloturerRunsheet(id).subscribe(data=>{
        this._toastrService.success("Runsheet cloturé avec succées",
        "Cloturé !",{ toastClass: 'toast ngx-toastr', closeButton: true, });
      })
    }
public getRunsheetPdf(runsheetID : number) {
    this.runsheetService.getRunsheetPdf(runsheetID).subscribe(x => {
    const blob = new Blob([x] , {type : 'application/pdf'});
    if(window.navigator && window.navigator.msSaveOrOpenBlob)
      {
        window.navigator.msSaveOrOpenBlob(blob);
        return ;
      }
    const data = window.URL.createObjectURL(blob);
    const link = document.createElement('a') ; 
    link.href = data ; 
    link.download = `Runsheet${runsheetID}.pdf` ; 
    link.dispatchEvent(new MouseEvent('click' , { bubbles : true , cancelable : true , view : window }));
    setTimeout(function()  { 
      window.URL.revokeObjectURL(data) ; 
      link.remove 
    }, 100);});
   
 
 }
 isdisabled(colis){
  const acceptedEtat = ['enStock', 'planificationRetour','retourEchange'];
  console.log(colis.every(item=> acceptedEtat.includes(item.etat)))
  return colis.every(item=> acceptedEtat.includes(item.etat));
 }
}
