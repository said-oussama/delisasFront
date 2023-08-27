import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CsvModule } from '@ctrl/ngx-csv';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreDirectivesModule } from '@core/directives/directives';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Role } from 'app/auth/models';
import { AuthGuard } from 'app/auth/helpers';
import { AnomalieComponent } from './anomalie.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'gestion-anomalie',
    component: AnomalieComponent,
    canActivate: [AuthGuard],
  
    data: { roles: [Role.Admin],animation: 'table' }
  }
];

@NgModule({
  declarations: [AnomalieComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    TranslateModule,
    CoreCommonModule,
    ContentHeaderModule,
    FormsModule,
    CardSnippetModule,
    NgxDatatableModule,
    CsvModule,
    CoreDirectivesModule,
    NgSelectModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot()
  ],
  providers: []
})
export class AnomalieModule {}
