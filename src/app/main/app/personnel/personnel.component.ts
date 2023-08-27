import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalConfig, ToastrService } from 'ngx-toastr';
import { Personnel } from 'app/Model/personnel';
import { NgForm } from '@angular/forms'
import { PersonnelService } from 'app/service/personnel.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { HubService } from 'app/service/hub.service';
import { Hub } from 'app/Model/hub';
import { repeaterAnimation } from './personnel.animation';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [repeaterAnimation]
})
export class PersonnelComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;//
  private tempData = [];//

  // public
  public contentHeader: object;
  public rows: any;//
  public selected = [];
  public listPersonnel: any;//
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public expanded = {};
  public exportCSVData;//
  booleanConnect= {
    
    true:'Oui',
    false:'Non'
    
}
  public roles = [
    { value: 'livreur', viewValue: 'Livreur' },
    { value: 'magasinier', viewValue: 'Magasinier' },
    { value: 'commercial', viewValue: 'Commercial' },
    { value: 'gerant', viewValue: 'Gérant' }
  ];
  public cinVar;
  public nomVar;
  public prenomVar;
  public role_personnelVar;
  public telVar;
  public emailVar;
  public permisVar;
  public matricule_vehVar;
  public carte_griseVar;
  public hubVar;
  public disabledButton: boolean = false;

  public displayForm: boolean = false;
  public isDisabled: boolean = true;
  public isRequired: boolean = false;
  private apiServerUrl = environment.apiBaseUrl;

  userFile;
  carteGrise;
  permis;
  public imagePath;
  imgURL: any;
  imgURL1: any;
  imgURL2: any;
  public message: string;

  public editPersonnel: Personnel;
  public deletePersonnel: Personnel;
  public testPersonnel: Personnel;
  public listHub: Hub[];
  public gouvernoratList = ['ARIANA', 'BEJA', 'BEN AROUS', 'BIZERTE', 'GABES', 'GAFSA', 'JENDOUBA', 'KAIROUAN', 'KASSERINE',
    'KEBILI', 'KEF', 'MAHDIA', 'MANOUBA', 'MEDENINE', 'MONASTIR', 'NABEUL', 'SFAX', 'SIDI BOUZID', 'TOZEUR', 'ZAGHOUAN', 'SOUSSE',
    'SILIANA', 'TATAOUINE', 'TUNIS'];

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  viewPersonnel: Personnel;

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
        return d.nom.toLowerCase().startsWith(val) || d.nom.toLowerCase().startsWith(val) || d.prenom.toLowerCase().startsWith(val) || d.role_personnel.toLowerCase().startsWith(val) || d.email.toLowerCase().startsWith(val) || d.tel.toString().toLowerCase().startsWith(val);
      });

      // update the rows
      this.listPersonnel = temp;
      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }
    else {
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

  constructor(private router: Router, private personnelService: PersonnelService, private modalService: NgbModal,
    private hubService: HubService, private _toastrService: ToastrService,) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.loadData()
    this.hubService.getHubBySocieteLiv().subscribe(
      (response: Hub[]) => { this.listHub = response }
    )
    this.contentHeader = {
      headerTitle: 'Gestion personnel',
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
            name: 'Gestion personnel',
            isLink: false
          }
        ]
      }
    };
  }
  loadData() {
    this.personnelService.getAllPersonnel().subscribe(response => {
      response = response.filter((item)=> item.isDeleted !== true)
      this.rows = response;
      this.tempData = this.rows;
      this.listPersonnel = this.rows;
      this.exportCSVData = this.rows;
    });
  }

  onChangeRole(roleValue) {
    this.isDisabled = false;
    if (roleValue == "livreur") {
      this.isRequired = true;
    }
    else {
      this.isRequired = false;
    }
  }
  openUpdateModal(personnel: Personnel, modalUpdate) {
    this.modalService.open(modalUpdate, {
      centered: true,
      size: 'lg'
    });
    this.editPersonnel = personnel;
    console.log(this.editPersonnel)

  }
  openCreateModal(createModel) {
    this.modalService.open(createModel, {
      centered: true,
      size: 'lg'
    });
  }
  openDeleteModal(personnel: Personnel, modalDelete) {
    this.modalService.open(modalDelete, {
      centered: true,
      windowClass: 'modal modal-danger'
    });
    this.deletePersonnel = personnel;
  }


  btnDisplayForm() {
    this.displayForm = true;
  };
  btnAnnulerForm() {
    this.displayForm = false;
  };
  onSelectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file, "1");
      this.userFile = file;

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }

      var reader = new FileReader();

      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => { this.imgURL = reader.result; }
    }
  }
  onSelectImage1(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file, "2");
      this.carteGrise = file;

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }

      var reader = new FileReader();

      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => { this.imgURL1 = reader.result; }
    }
  }
  onSelectImage2(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file, "2");
      this.permis = file;

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }

      var reader = new FileReader();

      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => { this.imgURL2 = reader.result; }
    }
  }

  public gestListHub() {
    this.hubService.getHubBySocieteLiv().subscribe(
      (response: Hub[]) => { this.listHub = response }
    )
  }

  async onAddPersonnelWithImage(HWForm: NgForm) {

    if (this.userFile || this.carteGrise) {
      if (HWForm.form.valid === true) {
        this.disabledButton = true;
        let hub;
        const formData = new FormData();
        const personnel = this.testPersonnel = Object.assign(HWForm.value);

        await this.hubService.getHubById(this.hubVar).toPromise().then(
          (response : Hub)=>{hub = response })
           personnel.hub= hub ; 

        formData.append('personnel', JSON.stringify(personnel));
        formData.append('image', this.userFile);
        formData.append('carteGrise', this.carteGrise);
        formData.append('permis', this.permis);

        await this.personnelService.createData(formData).subscribe(data => { 
        this._toastrService.success('Vous avez ajouté le personnel avec succès ! ',
          'Ajout avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 1000 });
          this.disabledButton = false;
          this.closeModel();
          HWForm.reset();
          this.loadData();
          this.userFile = null;
          this.carteGrise = null;
          this.permis = null;

        },
        (error=> {
          this._toastrService.error('Email existe déja ! ', "Échec d'ajout !",
          { toastClass: 'toast ngx-toastr', closeButton: true, });
          this.disabledButton = false;
  
        }));

      }
      else {
        this._toastrService.error('Vérifier que vous avez bien rempli le formulaire ! ', "Échec d'ajout !",
          { toastClass: 'toast ngx-toastr', closeButton: true, });
      }
    }
    else {
      this.onAddPersonnel(HWForm);
    }
  }
  public async onAddPersonnel(HWForm: NgForm): Promise<void> {
    if (HWForm.form.valid === true) {
      this.disabledButton = true;
      let personnel;
      let hub;
      personnel = Object.assign(HWForm.value);

      await this.hubService.getHubById(this.hubVar).toPromise().then(
        (response: Hub) => { hub = response })
      personnel.hub = hub;

      this.personnelService.addPersonnel(personnel).subscribe(data => {
        this._toastrService.success('Vous avez ajouté le personnel avec succès ! ',
          'Ajout avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true });
        this.disabledButton = false;
        this.closeModel();
        HWForm.reset();
        this.loadData();
        this.userFile = null;
        this.carteGrise = null;
        this.permis = null;
      },
      (error=> {
        this._toastrService.error('Email existe déja ! ', "Échec d'ajout !",
        { toastClass: 'toast ngx-toastr', closeButton: true, });
        this.disabledButton = false;

      }));

      // window.location.reload();
    }

    else {
      this._toastrService.error('Vérifier que vous avez bien rempli le formulaire ! ', "Échec d'ajout !",
        { toastClass: 'toast ngx-toastr', closeButton: true, });
    }
  }
  closeModel() {
    this.modalService.dismissAll();

  }

  public async onUpdatePersonnel(personnel: Personnel): Promise<void> {

    this.personnelService.updatePersonnel(this.editPersonnel).subscribe(
      (response: Personnel) => {
        ;
        this._toastrService.success('Vous avez modifié le personnel ' + response.iduser + ' avec succès ! ',
          'Modification avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true });
        this.closeModel()

        this.loadData()

        // window.location.reload();
      },

      (error: HttpErrorResponse) => {
        alert(error.message);
        this._toastrService.error('Vérifier que vous avez bien rempli le formulaire ! ', "Échec Modification !",
          { toastClass: 'toast ngx-toastr', closeButton: true, });
      });


  }

  updateFournisseurPhoto(personnel: Personnel) {

    if (this.userFile) {
      const formData = new FormData();
      formData.append('personnel', JSON.stringify(personnel));
      formData.append('image', this.userFile);

      this.personnelService.updatePersonnelPhoto(formData).subscribe(
        data => {
          
          this.loadData();
        });
    }
  }
  uploadImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }
      var reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => { this.imgURL = reader.result; }
      this.updateFournisseurPhoto(this.editPersonnel);
    }
  }
  uploadImage1(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }
      var reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => { this.imgURL = reader.result; }
      this.updateFournisseurPhoto(this.editPersonnel);
    }
  }
  public onDeletePersonnel(personnelId: number): void {

    this.personnelService.deletePersonnel(personnelId).subscribe(

      (response: void) => {
        ;
        this._toastrService.success('Vous avez supprimé le personnel ' + personnelId + ' avec succès ! ',
          'Suppression avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true });
        this.loadData();
        this.closeModel();
      },
      (error=> {
        this._toastrService.success('Vous avez supprimé le personnel ' + personnelId + ' avec succès ! ',
        'Suppression avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true });
      this.loadData();
      this.closeModel();

      }));


  }
  openDetailsModal(personnel: Personnel, modalView) {
    setTimeout(() => {
      this.modalService.open(modalView, {
        centered: true,
        size: 'lg'
      });
      console.log(personnel)
      this.viewPersonnel = personnel;
      });

  }


}
