import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Router } from '@angular/router';
import { CoreTranslationService } from '@core/services/translation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';

import * as snippet from 'app/main/app/console/console.snippetcode';
import { Hub } from 'app/Model/hub';
import { Console } from 'app/Model/Console';

import { SocieteLiv } from 'app/Model/societeLiv';
import { ConsoleService } from 'app/service/console.service';
import { HubService } from 'app/service/hub.service';
import { SocieteLivService } from 'app/service/societeLiv.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { LivreurList, Personnel } from 'app/Model/personnel';
import { PersonnelService } from 'app/service/personnel.service';
import { Colis } from 'app/Model/colis';
import { ColisService } from 'app/service/colis.service';
import { AuthenticationService } from 'app/auth/service';
import { RunsheetService } from 'app/service/Runsheet.service';

@Component({
  selector: 'app-ajouter-runsheet',
  templateUrl: './ajouter-runsheet.component.html',
  styleUrls: ['./ajouter-runsheet.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AjouterRunsheetComponent implements OnInit {
  // public
  private _unsubscribeAll: Subject<any>;//

  public contentHeader: object;
  private tempData = [];//
  public rows: any;//
  public selected = [];
  public listConsole: any;//
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public expanded = {};
  public exportCSVData;//
  public testLivreurList: LivreurList[];
  public personnel_idVar;
  livreur;
  public id_hubVar;
  public gouvernoratVar;//
  public adresseVar;
  public titreVar;
  public displayForm: boolean = false;
  public responseColis: Colis;
  public listBar_code: String[] = [];
  public testListColis: Colis[] = [];
  public ListColisRows: any;//
  public testPersonnel: Personnel;
  listLivreur: any;

  count = 0;
  barCodeColis;
  hubDepart;
  hubArrive;
  items : any = [];
  public SelectionType = SelectionType;

  public editHub: Console;
  public deleteHub: Console;
  public selectMulti: LivreurList[];
  public selectMultiSelected;
  public gouvernoratList = ['ARIANA', 'BEJA', 'BEN AROUS', 'BIZERTE', 'GABES', 'GAFSA', 'JENDOUBA', 'KAIROUAN', 'KASSERINE',
    'KEBILI', 'KEF', 'MAHDIA', 'MANOUBA', 'MEDENINE', 'MONASTIR', 'NABEUL', 'SFAX', 'SIDI BOUZID', 'TOZEUR', 'ZAGHOUAN', 'SOUSSE',
    'SILIANA', 'TATAOUINE', 'TUNIS']
  /**
   * Marker Circle Polygon Component
   */
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  idHubArrivee: any;
  idHubDepart: any;
  currentUser: any;
  deleteBarcode: any;
  isAdmin: boolean;
  /**
   * Constructor
   *
   * @param {DatatablesService} _datatablesService
   * @param {CoreTranslationService} _coreTranslationService
   * @param {ToastrService} _toastrService
   */
  constructor(private _authenticationService: AuthenticationService,private runsheetService : RunsheetService, private colisService: ColisService, private router: Router, private ConsoleService: ConsoleService, private modalService: NgbModal,
    private _datatablesService: ConsoleService, private societeLivraisonService: SocieteLivService,
    private _coreTranslationService: CoreTranslationService, private servicePersonnel: PersonnelService,
    private _toastrService: ToastrService, private serviceColis: ColisService) {
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    this.isAdmin = this.currentUser.roleUser === "Admin";

    this._unsubscribeAll = new Subject();

  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   *//**
* Search (filter)
*
* @param event
*/
  filterUpdate(event) {

    const val = event.target.value.toLowerCase();
    if (val != "") {
      // filter our data
      const temp = this.tempData.filter(function (d) {
        return d.personnel.prenom.toLowerCase().startsWith(val) || d.depart.toLowerCase().startsWith(val) || d.personnel.prenom.toLowerCase().startsWith(val) || d.arrivee.toLowerCase().startsWith(val) || d.colis.bar_code.toLowerCase().startsWith(val);
      });

      // update the rows
      this.listConsole = temp;
      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }
    else {
      this.ngOnInit();
    }
  }

  ngOnInit(): void {
    this.items = [];
    this._datatablesService.getConsoleBySocieteLiv().subscribe(response => {
      this.rows = response;
      this.tempData = this.rows;
      this.listConsole = this.rows;
      // this.selectMulti=this.gouvernoratList;
      this.servicePersonnel.getLivreurList().toPromise().then(
        (response: LivreurList[]) => {  this.listLivreur = response; });

    });
    // content header
    this.contentHeader = {
      headerTitle: 'Ajouter Runsheet',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },/*
          {
            name: 'Charts & Maps',
            isLink: true,
            link: '/'
          },*/
          // {
          //   name: 'Gestion console',
          //   isLink: false
          // }
        ]
      }
    };
  }
  openCreateModal(createModel) {
    this.modalService.open(createModel, {
      centered: true,
      size: 'lg'
    });
  }
  btnDisplayForm() {

    this.displayForm = true;
  };
  btnAnnulerForm() {

    this.displayForm = false;
    this.ListColisRows = null;
  };
  ajouter() {
    const acceptedEtat = ['enStock', 'planificationRetour','retourEchange'];
    this.colisService.findColisByBarCode(this.barCodeColis).subscribe((res: any) => {
      if (!res) {
        this._toastrService.error('Colis introuvable ! ', "Échec Ajout !",
          { toastClass: 'toast ngx-toastr', closeButton: true, });
      }
      else if (res && res.etat && !acceptedEtat.includes(res.etat)) {
        this._toastrService.error('Que les colis en stock ou en planification retour sont sont acceptés ', "Échec Ajout !",
          { toastClass: 'toast ngx-toastr', closeButton: true, });
      }

      else {

        const found = this.items.some(el => el.bar_code == this.barCodeColis);
        if (!found) {
          const obj = {
            bar_code: this.barCodeColis,
          }

          let item = [];
          item.push(res);
          this.count++;
          this.items = this.items.concat(item);
          this.barCodeColis = null;

        }

      }
    });


  }
  ajouterConsole(createModel) {
    this.modalService.open(createModel, {
      centered: true,
      size: 'lg'
    });
  }
  onAddConsole() {
    const body = {
      "colisBarCodes": this.items.map(item => item.bar_code),
      // "idCreator": localStorage.getItem('userId'),
      "livreurId": this.livreur,
      "creatorId": localStorage.getItem('userId'),

    }
    this.runsheetService.addRunsheet(body).subscribe((data) => {
      this._toastrService.success('Vous avez ajouter un runsheet  ' + ' avec succès ! ',
        'Modification avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 1000 }).onHidden.subscribe(res => {
          this.closeModel();

          this.router.navigate(['runsheet/runsheet']);



        });
    })

  }
  closeModel() {
    this.modalService.dismissAll();
  }
  openUpdateModal(Console: Console, modalUpdate) {
    this.modalService.open(modalUpdate, {
      centered: true,
      size: 'lg'
    });
    this.editHub = Console;
  }

  openDeleteModal(modalDelete, barcode) {
    this.modalService.open(modalDelete, {
      centered: true,
      windowClass: 'modal modal-danger'
    });
    this.deleteBarcode = barcode;
  }

  onDeleteFournisseur() {
    this.items = this.items.filter((item, i) => 
      item.bar_code !== this.deleteBarcode 
       
    )
    this.closeModel()
  }



}
