
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalConfig, ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { ColisService } from 'app/service/colis.service';
import { Colis } from 'app/Model/colis';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx'
import readxlsxFile from 'read-excel-file';
//import { DateRangeSnippetCode } from '../form-elements/flatpickr/flatpickr.snippetcode';
import { FournisseurService } from 'app/service/fournisseur.service';
import { Fournisseur } from 'app/Model/fournisseur';
import { environment } from 'environments/environment';
import { AuthenticationService } from 'app/auth/service/authentication.service';
import { User } from 'app/auth/models';

//import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class PaymentComponent implements OnInit {

  // myForm: FormGroup;

  // constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    // this.createForm();
  }

  // createForm() {
  //   this.myForm = this.formBuilder.group({
  //     name: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]]
  //   });
  // }

  onSubmit() {
    // if (this.myForm.valid) {
      // Soumission du formulaire
      // console.log('Données du formulaire:', this.myForm.value);
    // } else {
      // Le formulaire n'est pas valide
      console.log('Formulaire non valide');
    }
  // }

}
