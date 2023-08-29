import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Colis } from 'app/Model/colis';
import { ColisService } from 'app/service/colis.service';
import Stepper from 'bs-stepper';
import { ToastrService, GlobalConfig } from 'ngx-toastr';

import { FournisseurService } from 'app/service/fournisseur.service';
import { Fournisseur } from 'app/Model/fournisseur';
import { environment } from 'environments/environment';
import { User } from 'app/auth/models';
import { AuthenticationService } from 'app/auth/service';
import { Router } from '@angular/router';
import { SocieteLivService } from 'app/service/societeLiv.service';
 
@Component({
  selector: 'app-societe',
  templateUrl: './societe.component.html',
  styleUrls: ['./societe.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SocieteComponent implements OnInit { 


  imagePreview: string | ArrayBuffer;

  @ViewChild('addSocieteForm') public societeForm: NgForm;
  contentHeader : any;
  adresseVar;
  matriculeFiscaleVar;
  nomCompletVar;
  emailVar;
  sigleVar;
  telephoneVar;
  idVar;
  getLogo: any;
  societe: any;
  message: string;
  imagePath: any;
  societeFileName: any;
  imgURL: string | ArrayBuffer;
  societeFile: any;
  societeFormValue: any;
  apiServerUrl: string;

  constructor(private _toastrService: ToastrService, private societeLivService : SocieteLivService,
    private _authenticationService: AuthenticationService,private _router : Router) {
  }

  ngOnInit()  {
    this.apiServerUrl  = environment.apiBaseUrl
    this.contentHeader = {
      headerTitle: 'Sociéte Principale',
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
            name: 'Sociéte Principale',
            isLink: false
          }
        ]
      }
    };
    // this.societeLivService.getSocieteLivByIdLogo().subscribe(data=> {
    //   
    //   this.getLogo = data;
    // })
    this.societeLivService.getSocieteLivById().subscribe(data=>{
      this.societe = data;
    this.societeForm?.controls['adresse'].setValue(data.adresse)
    this.societeForm?.controls['matriculeFiscale'].setValue(data.matriculeFiscale)
    this.societeForm?.controls['nomComplet'].setValue(data.nomComplet)
    this.societeForm?.controls['sigle'].setValue(data.sigle)
    this.societeForm?.controls['telephone'].setValue(data.telephone)
    this.societeForm?.controls['email'].setValue(data.email)

     })

  }

  onSelectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      this.societeFile = file;
      this.societeFileName = file.name

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

  uploadImage(event) {
    console.log("event")
    // if (event.target.files.length > 0) {
    //   const file = event.target.files[0];
    //   this.userFile = file;
    //   var mimeType = event.target.files[0].type;
    //   if (mimeType.match(/image\/*/) == null) {
    //     this.message = "Only images are supported.";
    //     return;
    //   }
    //   var reader = new FileReader();
    //   this.imagePath = file;
    //   reader.readAsDataURL(file);
    //   reader.onload = (_event) => { this.imgURL = reader.result; }
    //   this.updateFournisseurPhoto(this.editFournisseur);
    // }
  }
  onAddSociete(form : NgForm) {
    if(form.invalid){
      return ;
    }
    // this.societeLivService.addSociete(form.value).subscribe(data=>{
    //   this._toastrService.success('Société principale est mis à jour avec succès ! ',
    //   'Mis à jour avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 1000 });
    // })
  
    if (this.societeFile) {

      const formData = new FormData();
 
      formData.append('societePrincipal', JSON.stringify(form.value));
      formData.append('logo ', this.societeFile);

      this.societeLivService.addSocieteWithLogo(formData).subscribe(data => 
       {
          this._toastrService.success('Société principale est mis à jour ' + ' avec succès ! ',
          'Ajout avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, timeOut:2000}).onHidden.subscribe((d)=> {
            window.location.reload()
          })
        }

      )

      
    }
    else {
      this.societeLivService.addSociete(form.value).subscribe(data=>{
        {
          this._toastrService.success('Société principale est mis à jour avec succès ' + ' avec succès ! ',
          'Ajout avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, timeOut:2000}).onHidden.subscribe((d)=> {
            window.location.reload()
          })
        }
      })
      ,
      (error) => {
        this._toastrService.error('', "Échec Ajout !",
          { toastClass: 'toast ngx-toastr', closeButton: true, });
    }

    }

  }

 
}
