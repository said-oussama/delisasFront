import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { FormValidationComponent } from 'app/main/forms/form-validation/form-validation.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthGuard } from 'app/auth/helpers';
import { Role } from 'app/auth/models';

const routes: Routes = [
  {
    path: 'gestion-colis',
    component: FormValidationComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Fournisseur,Role.Admin],animation: 'validation' }
  }
];

@NgModule({
  declarations: [FormValidationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    NgbModule,
    ContentHeaderModule,
    CardSnippetModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ]
})
export class FormValidationModule {}
