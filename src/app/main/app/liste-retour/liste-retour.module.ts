import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { Role } from 'app/auth/models';
import { AuthGuard } from 'app/auth/helpers';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { CsvModule } from '@ctrl/ngx-csv';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ListeRetourComponent } from './liste-retour.component';

// routing
const routes: Routes = [
  {
    path: 'liste-retour',
    component: ListeRetourComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin],animation: 'feather' }
  }
];

@NgModule({
  declarations: [ListeRetourComponent],
  imports: [CommonModule,
    CardSnippetModule,
    NgxDatatableModule,
    CsvModule,
     RouterModule.forChild(routes), ContentHeaderModule, CoreCommonModule, NgbModule]
     ,
  providers: []
})
export class ListeRetourModule {}
