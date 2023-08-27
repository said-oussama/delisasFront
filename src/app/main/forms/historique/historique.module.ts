import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CoreDirectivesModule } from '@core/directives/directives';


import { FormValidationComponent } from 'app/main/forms/form-validation/form-validation.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthGuard } from 'app/auth/helpers';
import { Role } from 'app/auth/models';
import { HistoriqueComponent } from './historique.component';
import { ViewColisComponent } from './view-colis/view-colis.component';

const routes: Routes = [
  {
    path: 'tracking-colis',
    component: HistoriqueComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin],animation: 'validation' }
  },


  {
    path: 'viewcolis/:ref',
    component: ViewColisComponent
  }
];

@NgModule({
  declarations: [HistoriqueComponent,  ViewColisComponent],
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
    NgxDatatableModule,
    CoreDirectivesModule
  ]
})
export class HistoriqueModule {}
