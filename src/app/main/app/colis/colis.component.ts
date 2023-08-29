import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';

import { HistoStateOnly } from 'app/Model/colis';
import { HttpErrorResponse } from '@angular/common/http';
import { ColisService } from 'app/service/colis.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FournisseurService } from 'app/service/fournisseur.service';
import { Fournisseur } from 'app/Model/fournisseur';
import { User } from 'app/auth/models';
import { AuthenticationService } from 'app/auth/service';


@Component({
  selector: 'app-colis',
  templateUrl: './colis.component.html',
  styleUrls: ['./colis.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ColisComponent implements OnInit {
 
  private _unsubscribeAll: Subject<any>;
  private tempData = [];
  public listFournisseur : any[];
  public contentHeader: object;
  public rows: any;
  public kitchenSinkRows: any;
  public selectedFour;
  public currentUser: User;
  private fournisseurID;
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public expanded = {};
  public SelectionType = SelectionType;    
  public listeState : HistoStateOnly[];
  public displayRows : number =0;
  
  public totalstate = {
    cree: 0,
    aenleve:0,

    enStock: 0,
    enCoursDeLivraison: 0,
    livre: 0,
    livrePaye: 0,
    planificationRetour: 0,
    retourne: 0,
    enAttenteDEnlevement: 0,
    enleve: 0,

    total: 0,
    enCoursDeTransfert: 0,
    retourEchange:0
  }
  
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;

  // Public Methods
  // -----------------------------------------------------------------------------------------------------
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
      
      return d.nom_c.toLowerCase().startsWith(val) || d.prenom_c.toLowerCase().startsWith(val) || d.bar_code.toString().toLowerCase().startsWith(val) || d.tel_c_1.toString().toLowerCase().startsWith(val) || d.cod.toString().toLowerCase().startsWith(val) || d.etat.toLowerCase().startsWith(val) || d.service.toLowerCase().startsWith(val)   ;

    });
    // update the rows
    this.kitchenSinkRows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;}
    else {
      this.ngOnInit();
    }  }

  /**
   * Constructor
   *
   * @param {DatatablesService} _datatablesService
   * @param {CoreTranslationService} _coreTranslationService
   */
  constructor(private modalService: NgbModal, private colisService: ColisService,
    private serviceFournisseur : FournisseurService,private _authenticationService: AuthenticationService) {
    this._unsubscribeAll = new Subject();
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    this.fournisseurID=this.currentUser.iduser
  }

  setDisplayRows(num?:number){
    
    this.displayRows=num ;
    this.ngOnInit();
  }

   ngOnInit() {
    this.serviceFournisseur.getFournisseurBySocieteLiv().subscribe(
      res=>{ this.listFournisseur=res
              // console.log(this.listFournisseur)

      }
    )

    this.colisService.getColisCree(this.fournisseurID).subscribe(response =>{
      this.rows = response;
      this.tempData = this.rows;
      if (this.displayRows==1)
      {this.kitchenSinkRows = this.rows;}
    } )
    this.colisService.getColisEnStock(this.fournisseurID).subscribe(response =>{
      this.rows = response;
      this.tempData = this.rows;
      if (this.displayRows==2)
      {this.kitchenSinkRows = this.rows;}
    } )
    this.colisService.getColisEnCoursLivraison(this.fournisseurID).subscribe(response =>{
      this.rows = response;
      this.tempData = this.rows;
      if (this.displayRows==3)
      {this.kitchenSinkRows = this.rows;}
    } )
    this.colisService.getColisLivree(this.fournisseurID).subscribe(response =>{
      this.rows = response;
      this.tempData = this.rows;
      if (this.displayRows==4)
      {this.kitchenSinkRows = this.rows;}
    } )
    this.colisService.getColisLivreePayee(this.fournisseurID).subscribe(response =>{
      this.rows = response;
      this.tempData = this.rows;
      if (this.displayRows==5)
      {this.kitchenSinkRows = this.rows;}
    } )
    this.colisService.getColisPlanifierRetour(this.fournisseurID).subscribe(response =>{
      this.rows = response;
      this.tempData = this.rows;
      if (this.displayRows==6)
      {this.kitchenSinkRows = this.rows;}
    } )
    this.colisService.getColisRetournee(this.fournisseurID).subscribe(response =>{
      this.rows = response;
      this.tempData = this.rows;
      if (this.displayRows==7)
      {this.kitchenSinkRows = this.rows;}
    } )
     
    this.contentHeader = {
      headerTitle: 'Gestion des colis',
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
            name: 'gestion des colis',
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
  
  filterColis(status?) {

    if (status) {
      // filter our data
      const temp = this.tempData.filter(function (d) {
        return d.etat.toLowerCase() === status.toLowerCase();
      });

      // update the rows
      this.kitchenSinkRows = temp;    // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }
    else {
      this.ngOnInit();
    }

  }

  public getAuditColis (ref : number): void {
    
    this.colisService.getColisAudit(ref).subscribe(
      (response : HistoStateOnly[])=>{ this.listeState = response ; }, 
      (error:HttpErrorResponse) => { alert(error.message); } );
  }
    
  countByEtat() {
    const listOfStatus = ['cree',
      'enStock',
      'enCoursDeLivraison',
      'livre',
      'livrePaye',
      'planificationRetour',
      'retourne',
      'enAttenteDEnlevement',
      'enleve',
      'enCoursDeTransfert',
      'retourEchange'
    ];
    listOfStatus.forEach(status => {
      this.totalstate[status] = this.kitchenSinkRows.filter((element) => element.etat === status).length;
    })
  }
  filterFournisseur(s:string){
  //   if (s!="none"){
  //     this._datatablesService.onDatatablessChanged2.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
  //       this.rows = response;
  //        this.tempData = this.rows;
  //        if (this.displayRows==0)
  //        {this.kitchenSinkRows = this.rows;}
  //        this.countByEtat ();
  //      });


  //    const temp = this.kitchenSinkRows.filter(function (d) {
  //      // console.log(d)
  //       return d.fournisseur.nom_societe.toLowerCase()===s.toLowerCase() ;
  
  //     });
  //     console.log(temp)
  //     // update the rows
  //     this.kitchenSinkRows = temp;
  //     // Whenever the filter changes, always go back to the first page
  //     this.table.offset = 0;
      
  //   } else {
  //     this.ngOnInit()
  //   }
  // }
  }
}
