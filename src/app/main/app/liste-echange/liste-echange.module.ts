import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { CsvModule } from '@ctrl/ngx-csv';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AuthGuard } from 'app/auth/helpers';
import { Role } from 'app/auth/models';
import { ListeEchangeComponent } from './liste-echange.component';

const routes: Routes = [
  {
    path: 'liste-echange',
    component: ListeEchangeComponent,
    canActivate: [AuthGuard],

    data: {  roles: [Role.Admin],animation: 'input' }
  }
];

@NgModule({
  declarations: [ListeEchangeComponent],
  imports: [CommonModule, RouterModule.forChild(routes), NgbModule, ContentHeaderModule, CardSnippetModule,  NgxDatatableModule,
    CsvModule,FormsModule],
    providers: []
})
export class ListeEchangeModule {}
