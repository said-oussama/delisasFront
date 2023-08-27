import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { HistoStateOnly } from 'app/Model/colis';

import { cloneDeep } from 'lodash';
import { GlobalConfig, ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';

import { CustomToastrComponent } from 'app/main/extensions/toastr/custom-toastr/custom-toastr.component';
import { ColisService } from 'app/service/colis.service';
import { AuthenticationService } from 'app/auth/service';
import { User } from 'app/auth/models';

@Component({
  selector: 'app-liste-retour',
  templateUrl: './liste-retour.component.html',
  styleUrls: ['./liste-retour.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListeRetourComponent implements OnInit {
  // Public
  public contentHeader: object;
  public json = require('feather-icons/dist/icons.json');
  public copyCodeStatus: boolean = false;
  public searchText;
  public data;
  public rows: any;
  private _unsubscribeAll: Subject<any>;
  private tempData = [];
  public displayRows : number =0;
  public kitchenSinkRows1: any;
  public listeState : HistoStateOnly[];
  public SelectionType = SelectionType;    
  public ColumnMode = ColumnMode;
  public basicSelectedOption: number = 10;
  public currentUser: User;
  private fournisseurID;
  public totalstate={
    cree: 0, 
    en_stock: 0,
    encours_de_livraison :0,
    livree: 0,
    livre_paye:0,
    planifier_retour :0,
    retournee :0,
    total: 0,
  }
  // Private
  private options: GlobalConfig;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;
 
 /**
  * Search (filter)
  *
  * @param event
  */

 filterUpdate(event) {
    const val = event.target.value.toLowerCase();
    if (val !=""){

    // filter our data
   /// console.log(this.kitchenSinkRows)
    const temp = this.tempData.filter(function (d) {
      
      return d.bar_code.toLowerCase().startsWith(val) || d.prenom_c.toLowerCase().startsWith(val) || d.nom_c.toLowerCase().startsWith(val) || d.cod.toString().toLowerCase().startsWith(val) || d.service.toLowerCase().startsWith(val) || d.tel_c_1.toString().toLowerCase().startsWith(val)   ;

    });
    // update the rows
    this.kitchenSinkRows1 = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;}
    else {
      this.ngOnInit();
    } 
 }
  /**
   * Constructor
   *
   * @param {ToastrService} toastr
   *  @param {DatatablesService} _datatablesService
   * @param {CoreTranslationService} _coreTranslationService
   */
  constructor(private modalService: NgbModal, private colisService: ColisService,
    private toastr: ToastrService,private _authenticationService: AuthenticationService) {
    this._unsubscribeAll = new Subject();
    this.options = this.toastr.toastrConfig;
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    this.fournisseurID=this.currentUser.iduser
  }
   
  setDisplayRows(num?:number){
    
    this.displayRows=num ;
    this.ngOnInit();
  }

  //  Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Copy
   *
   * @param value
   */
  copy(value) {
    const selectBox = document.createElement('textarea');
    selectBox.style.position = 'fixed';
    selectBox.value = value;
    document.body.appendChild(selectBox);
    selectBox.focus();
    selectBox.select();
    document.execCommand('copy');
    document.body.removeChild(selectBox);
    setTimeout(() => {
      this.copyCodeStatus = false;
    }, 500);
    this.copyCodeStatus = true;

    const customToastrRef = cloneDeep(this.options);
    customToastrRef.toastComponent = CustomToastrComponent;
    customToastrRef.closeButton = true;
    customToastrRef.tapToDismiss = false;
    customToastrRef.toastClass = 'toast ngx-toastr';
    this.toastr.success('Icon Copied Successfully !!!', value, customToastrRef);
  }
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
     
    this.colisService.findAllColisByService('retourne').subscribe(response =>{
      this.rows = response;
      this.tempData = this.rows;
     // if (this.displayRows==1)
     {this.kitchenSinkRows1 = this.rows;

     }
    } )
    
    this.data = this.json;
    this.contentHeader = {
      headerTitle: 'Liste retour',
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
            name: 'Liste retour',
            isLink: false
          }
        ]
      }
    };
  }

  modalOpenVC(modalVC, reference? : number) {
    this.getAuditColis(reference);
    this.modalService.open(modalVC, {
      centered: true,
    });
  }  
  
  public getAuditColis (ref : number): void {
    
    this.colisService.getColisAudit(ref).subscribe(
      (response : HistoStateOnly[])=>{ this.listeState = response ; }, 
      (error:HttpErrorResponse) => { alert(error.message); } );
  }

  public countByEtat (): void{
    this.colisService.countByEtat('Crée',this.fournisseurID).subscribe(
    (response : number) =>{this.totalstate.cree= response;
      this.totalstate.total=this.totalstate.cree;}
    )
    this.colisService.countByEtat('En stock',this.fournisseurID).subscribe(
      (response : number) =>{this.totalstate.en_stock= response;
        this.totalstate.total+=this.totalstate.en_stock;}
      )
    this.colisService.countByEtat('Livré',this.fournisseurID).subscribe(
      (response : number) =>{this.totalstate.livree= response;
        this.totalstate.total+=this.totalstate.livree;}
      )
    this.colisService.countByEtat('En cours de livraison',this.fournisseurID).subscribe(
      (response : number) =>{this.totalstate.encours_de_livraison= response;
        this.totalstate.total+=this.totalstate.encours_de_livraison;}
      )
    this.colisService.countByEtat('Livré payé',this.fournisseurID).subscribe(
      (response : number) =>{this.totalstate.livre_paye= response;
        this.totalstate.total+=this.totalstate.livre_paye;}
      )
    this.colisService.countByEtat('Planifié retour',this.fournisseurID).subscribe(
      (response : number) =>{this.totalstate.planifier_retour= response;
         this.totalstate.total+=this.totalstate.planifier_retour;}
      )
    this.colisService.countByEtat('Retourné',this.fournisseurID).subscribe(
      (response : number) =>{this.totalstate.retournee= response;
        this.totalstate.total+=this.totalstate.retournee;}
      )
          
  }

}
