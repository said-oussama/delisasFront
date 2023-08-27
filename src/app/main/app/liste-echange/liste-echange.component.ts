import { Component, OnInit ,ViewChild,ViewEncapsulation} from '@angular/core';
import { CoreTranslationService } from '@core/services/translation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';

import * as snippet from 'app/main/app/liste-echange/liste-echange.snippetcode';
import { HistoStateOnly } from 'app/Model/colis';
import { ColisService } from 'app/service/colis.service';
//import { constructor } from 'assert';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'app/auth/models';
import { AuthenticationService } from 'app/auth/service';

@Component({
  selector: 'app-liste-echange',
  templateUrl: './liste-echange.component.html',
  styleUrls: ['./liste-echange.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListeEchangeComponent implements OnInit {
  
  
  // public
  public contentHeader: object;
  public listeState : HistoStateOnly[];
  private _unsubscribeAll: Subject<any>;
  public rows: any;
  public displayRows : number =0;
  public kitchenSinkRows1: any;
  public SelectionType = SelectionType;    
  public ColumnMode = ColumnMode;
  public basicSelectedOption: number = 10;
  private tempData = [];
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
  
  *
  * 
  @param {DatatablesService} _datatablesService
  @param {CoreTranslationService} _coreTranslationService
*/
  constructor(private modalService: NgbModal, private colisService: ColisService,
    private _authenticationService: AuthenticationService) {
      this._unsubscribeAll = new Subject();
      this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    this.fournisseurID=this.currentUser.iduser

    }

    setDisplayRows(num?:number){
    
      this.displayRows=num ;
      this.ngOnInit();
    }
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void  {

    this.colisService.findAllColisByService('retourEchange').subscribe(response =>{
      this.rows = response;
      this.tempData = this.rows;
     // if (this.displayRows==1)
     {this.kitchenSinkRows1 = this.rows;

     }
    } )


    // content header
    this.contentHeader = {
      headerTitle: 'Liste échange',
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
            name: 'Liste échange',
            isLink: false,
            link: '/'
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
}
