import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Router } from '@angular/router';
import { CoreTranslationService } from '@core/services/translation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

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
import { User } from 'app/auth/models';

@Component({
  selector: 'app-transfert-sortant',
  templateUrl: './transfert-sortant.component.html',
  styleUrls: ['./transfert-sortant.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TransfertSortantComponent implements OnInit {
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

  public id_hubVar;
  public gouvernoratVar;//
  public adresseVar;
  public titreVar;
  public displayForm: boolean = false;
  public bar_codeVar;
  public responseColis: Colis;
  public listBar_code: String[] = [];
  public testListColis: Colis[] = [];
  public ListColisRows: any;//
  public testPersonnel: Personnel;

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
  public currentUser: User;
  personnel_id: number;
  /**
   * Constructor
   *
   * @param {DatatablesService} _datatablesService
   * @param {CoreTranslationService} _coreTranslationService
   * @param {ToastrService} _toastrService
   */
  constructor(private router: Router, private ConsoleService: ConsoleService, private modalService: NgbModal,
    private _datatablesService: ConsoleService, private societeLivraisonService: SocieteLivService,
    private _coreTranslationService: CoreTranslationService, private servicePersonnel: PersonnelService,
    private _toastrService: ToastrService, private serviceColis: ColisService, private _authenticationService: AuthenticationService) {
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    this.personnel_id = this.currentUser.iduser
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
  getConsolePdf(runsheetID : number) {
    this.ConsoleService.generateConsolePDF(runsheetID).subscribe(x => {
    const blob = new Blob([x] , {type : 'application/pdf'});
    if(window.navigator && window.navigator.msSaveOrOpenBlob)
      {
        window.navigator.msSaveOrOpenBlob(blob);
        return ;
      }
    const data = window.URL.createObjectURL(blob);
    const link = document.createElement('a') ; 
    link.href = data ; 
    link.download = `Console${runsheetID}.pdf` ; 
    link.dispatchEvent(new MouseEvent('click' , { bubbles : true , cancelable : true , view : window }));
    setTimeout(function()  { 
      window.URL.revokeObjectURL(data) ; 
      link.remove 
    }, 100);});
   
 
 }
  ngOnInit(): void {
    this._datatablesService.getConsolesSortant(this.personnel_id).subscribe(response => {
      this.rows = response;
      
      this.tempData = this.rows;
      this.listConsole = this.rows;
      
      // this.selectMulti=this.gouvernoratList;
      this.servicePersonnel.getLivreurList().toPromise().then(
        (response: LivreurList[]) => { ; this.selectMulti = response; });

    });
    // content header
    this.contentHeader = {
      headerTitle: 'Transfert Sortant',
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
          {
            name: 'Gestion console',
            isLink: false
          }
        ]
      }
    };
  }
  openCreateModal() {
    this.router.navigate(['/ajouter-console/ajouter-console']);

  }
  btnDisplayForm() {

    this.displayForm = true;
  };
  btnAnnulerForm() {

    this.displayForm = false;
    this.ListColisRows = null;
  };

  openUpdateModal(consoleUpdate, modalUpdate) {
    console.log(consoleUpdate)
    this.modalService.open(modalUpdate, {
      centered: true,
      size: 'lg'
    });
    this.editHub = consoleUpdate;
  }

  openDeleteModal(Console: Console, modalDelete) {
    this.modalService.open(modalDelete, {
      centered: true,
      windowClass: 'modal modal-danger'
    });
    this.deleteHub = Console;
  }

  public async onAddHub(HWForm: NgForm): Promise<void> {
    if (HWForm.form.valid === true) {
      let testSocieteLiv;
      let hub;
      hub = Object.assign(HWForm.value);
      // await this.societeLivraisonService.getSocieteLivById(1).toPromise().then(
      // (response : SocieteLiv) =>{testSocieteLiv = response;})

      hub.societeLiv = testSocieteLiv;
      await this.servicePersonnel.getPersonnelById(this.gouvernoratVar).toPromise().then(
        (response: Personnel) => {
          this.testPersonnel = response;
        },
        (error: HttpErrorResponse) => { alert(error.message) }
      );

      hub.personnel = this.testPersonnel;
      if (this.responseColis.etat == "En stock") { hub.colis = this.responseColis; }
      hub.etat = 'En attente';
      await this.ConsoleService.addHub(hub).toPromise().then(

        (response: Console) => {
          this._toastrService.success('Vous avez ajouté lla console ' + response.id_console + ' avec succès ! ',
            'Ajout avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 2000 }).onHidden.subscribe(res => { HWForm.reset(); window.location.reload() });

          ;
        },

        (error: HttpErrorResponse) => { console.log(error.message); });
    }
    else {
      this._toastrService.error('Vérifier que vous avez bien rempli le formulaire ! ',
        "Échec d'ajout !", { toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 2000 });
    }
  }

  public async onUpdateConsole(c: Console): Promise<void> {

    let testSocieteLiv;
    // await this.societeLivraisonService.getSocieteLivById(1).toPromise().then(
    // (response : SocieteLiv) =>{testSocieteLiv = response;})

    // hub.societeLiv=testSocieteLiv;
    console.log(c.id_console)
    await this.servicePersonnel.getPersonnelById(this.editHub.personnel.iduser).toPromise().then(
      (response: Personnel) => {
        this.testPersonnel = response;
      },
      (error: HttpErrorResponse) => { alert(error.message) }
    );
    c.personnel = this.testPersonnel
    await this.ConsoleService.updateConsole(c).toPromise().then(

      (response: Console) => {
        ;
        this._toastrService.success('Vous avez modifié la console ' + response.id_console + ' avec succès ! ',
          'Modification avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 2000 }).onHidden.subscribe(res => window.location.reload());

        document.getElementById('btnAnnulerUpdate').click();

        //window.location.reload();
      },

      (error: HttpErrorResponse) => {
        alert(error.message);
        this._toastrService.error('Vérifier que vous avez bien rempli le formulaire ! ',
          "Échec Modification !", { toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 2000 });
      });

  }
  public onDeleteHub(hubId: number): void {

    this.ConsoleService.deleteHub(hubId).subscribe(

      (response: void) => { ; });
    document.getElementById('btnAnnulerDelete').click();
    this._toastrService.success('Vous avez supprimé la console ' + hubId + ' avec succès ! ',
      'Suppression avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 2000 }).onHidden.subscribe(res => window.location.reload());

  }
  async onAddBar_code() {
    await this.serviceColis.findColisByBarCode(this.bar_codeVar.toString()).toPromise().then(
      (response: Colis) => { this.responseColis = response; }
    ); console.log("hetha baad ma jebou ml bd", this.responseColis);
    if (this.responseColis.etat == "En stock") {
      this.listBar_code.push(this.bar_codeVar.toString());
      this.testListColis.push(this.responseColis)
      this.ListColisRows = this.testListColis;
      // this.bar_codeVar='';
    }
    else {
      this._toastrService.error("L'etat du colis ajouté est n'est pas: En stock ",
        "Échec d'ajout !", { toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 2000 });
      this.bar_codeVar = '';
    }
  }
}
