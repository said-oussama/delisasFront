
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { CoreTranslationService } from '@core/services/translation.service';
import { HubService } from 'app/service/hub.service';
import { Hub } from 'app/Model/hub';
import { SocieteLiv } from 'app/Model/societeLiv';
import { SocieteLivService } from 'app/service/societeLiv.service';
import { ConsoleService } from 'app/service/console.service';
import { ColisService } from 'app/service/colis.service';
@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HubComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;//
  private tempData = [];//
  public contentHeader: object;
  public rows: any;//
  public selected = [];
  public listHub: any;//
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public expanded = {};
  public exportCSVData;//

  public id_hubVar;
  public gouvernoratVar;//
  public adresseVar;
  public titreVar;
  public displayForm: boolean = false;
  newHub;
  public editHub: Hub;
  public deleteHub: Hub;
  public selectMulti;
  public selectMultiSelected = [];
  public gouvernoratList = ['ARIANA', 'BEJA', 'BEN AROUS', 'BIZERTE', 'GABES', 'GAFSA', 'JENDOUBA', 'KAIROUAN', 'KASSERINE',
    'KEBILI', 'KEF', 'MAHDIA', 'MANOUBA', 'MEDENINE', 'MONASTIR', 'NABEUL', 'SFAX', 'SIDI BOUZID', 'TOZEUR', 'ZAGHOUAN', 'SOUSSE',
    'SILIANA', 'TATAOUINE', 'TUNIS']

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  toBeMovedColis: any = [];
  deletedHub: any;
  availableHubs: any;

  /**
   * Constructor
   *
   * @param {DatatablesService} _datatablesService
   * @param {CoreTranslationService} _coreTranslationService
   * @param {ToastrService} _toastrService
   */

  constructor(private router: Router, private hubService: HubService, private modalService: NgbModal,
    private _datatablesService: HubService, private societeLivraisonService: SocieteLivService,
    private _coreTranslationService: CoreTranslationService,
    private _toastrService: ToastrService, private colisService: ColisService) {

    this._unsubscribeAll = new Subject();
  }
  /**
   * Search (filter)
   *
   * @param event
   */
  filterUpdate(event) {

    const val = event.target.value.toLowerCase();
    if (val != "") {
      // filter our data
      const temp = this.tempData.filter(function (d) {
        return d.gouvernorat.toLowerCase().startsWith(val) || d.titre.toLowerCase().startsWith(val) || d.gouvernorat_lie.forEach(item => { item.toLowerCase().startsWith(val) });
      });

      // update the rows
      this.listHub = temp;
      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }
    else {
      this.ngOnInit();
    }
  }

  ngOnInit() {
    this._datatablesService.getHubBySocieteLiv().subscribe(response => {
      this.rows = response;

      this.tempData = this.rows;
      this.listHub = this.rows;
      this.selectMulti = this.gouvernoratList;
    });
    this.contentHeader = {
      headerTitle: 'Gestion Hub',
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
            name: 'Gestion Hub',
            isLink: false
          }
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
  };

  openUpdateModal(hub: Hub, modalUpdate) {
    this.modalService.open(modalUpdate, {
      centered: true,
      size: 'lg'
    });
    this.editHub = hub;

  }

  openDeleteModal(hub: Hub, modalDelete) {
    this.modalService.open(modalDelete, {
      centered: true,
      windowClass: 'modal modal-danger'
    });
    this.deleteHub = hub;
  }

  public async onAddHub(HWForm: NgForm): Promise<void> {
    if (HWForm.form.valid === true) {
      let testSocieteLiv;
      let hub;
      let value = HWForm.value;
      console.log(HWForm.value["gouvernorat_lie"])
      HWForm.value["gouvernorat_lie"] = HWForm.value["gouvernorat_lie"].map(item => item)
      hub = Object.assign(HWForm.value);
      // await this.societeLivraisonService.getSocieteLivById(1).toPromise().then(
      // (response : SocieteLiv) =>{testSocieteLiv = response;})

      this.hubService.addHub(hub).subscribe(

        (response: Hub) => {
          this._toastrService.success('Vous avez ajouté le hub ' + response.id_hub + ' avec succès ! ',
            'Ajout avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true });
          this.loadData();
          HWForm.reset();
          this.closeModel();
          // window.location.reload();
        }   ,
        (error=> {
          this._toastrService.error('Nom de hub existe déja ! ', "Échec d'ajout !",
          { toastClass: 'toast ngx-toastr', closeButton: true, });
  
        }));
      //  this.modalService.dismissAll;
    }
    else {
      this._toastrService.error('Vérifier que vous avez bien rempli le formulaire ! ',
        "Échec d'ajout !", { toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 2000 }).onHidden.subscribe(res => { });
    }
  }
  loadData() {
    this._datatablesService.getHubBySocieteLiv().subscribe(response => {
      this.rows = response;

      this.tempData = this.rows;
      this.listHub = this.rows;
      this.selectMulti = this.gouvernoratList;
    });
  }
  closeModel() {
    this.modalService.dismissAll();

  }
  public async onUpdateHub(hub: Hub): Promise<void> {

    let testSocieteLiv;
    // await this.societeLivraisonService.getSocieteLivById(1).toPromise().then(
    // (response : SocieteLiv) =>{testSocieteLiv = response;})

    hub.societeLiv = testSocieteLiv;

    await this.hubService.updateHub(hub).subscribe(

      (response: Hub) => {
        ;
        this._toastrService.success('Vous avez modifié le hub ' + response.id_hub + ' avec succès ! ',
          'Modification avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true });

        this.closeModel();

        this.loadData();
        // window.location.reload();

      },

      (error: HttpErrorResponse) => {
        alert(error.message);
        this._toastrService.error('Vérifier que vous avez bien rempli le formulaire ! ',
          "Échec Modification !", { toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 2000 }).onHidden.subscribe(res => window.location.reload());

      });

  }
  public onDeleteHub(row, modal): void {
    this.deletedHub = row;
    this.hubService.deleteHub(this.deletedHub.id_hub).subscribe(

      (response => {
        this.toBeMovedColis = response;
        if (this.toBeMovedColis.length > 0) {
          this.availableHubs = this.listHub.filter((item) => item.id_hub !== this.deletedHub.id_hub)
          this.openDeleteModal(row, modal)

        }
        else {
          this._toastrService.success('Vous avez supprimé le hub ' + this.deletedHub.titre + ' avec succès ! ',
            'Suppression avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 2000 });
          this.closeModel();
          this.loadData()
        }
      }),
      (err) => {
      });




    //window.location.reload();
  }

  async update() {
    if (this.gouvernoratVar != null) {

      this.selectMultiSelected = [...this.selectMultiSelected, { gouv: this.gouvernoratVar }]
      console.log(this.selectMultiSelected)
    }
  }
  onAssignHubToAnomaly(deleteHub) {
    // const body = {
    //   barcodes : this.toBeMovedColis
    // }
    this.colisService.assignHubColis(this.newHub.id_hub, this.toBeMovedColis).subscribe(response => {
      this._toastrService.success('Vous avez supprimé le hub ' + deleteHub.titre + ' et déplacé ' + this.toBeMovedColis.length + ' colis au hub ' + this.newHub.titre + ' avec succès ! ',
        'Suppression avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 5000 });
      this.hubService.deleteHub(deleteHub).subscribe(

        (response => {
          this.closeModel();
          this.loadData();
          this.toBeMovedColis = [];
          this.newHub = null;
        }),
        (err) => {
        });



    },
      (err) => {
        this._toastrService.success('Vous avez supprimé le hub ' + deleteHub.titre + ' et déplacé ' + this.toBeMovedColis.length + ' colis au hub ' + this.newHub.titre + ' avec succès ! ',
          'Suppression avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 5000 })
        this.hubService.deleteHub(deleteHub.id_hub).subscribe(

          (response => {
            this.closeModel();
            this.loadData();
            this.toBeMovedColis = [];
            this.newHub = null;
          }),
          (err) => {
          });


      }

    )
  }

}