import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { CoreCommonModule } from '@core/common.module';
import { CsvModule } from '@ctrl/ngx-csv';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CoreDirectivesModule } from '@core/directives/directives';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperComponent } from 'app/main/extensions/swiper/swiper.component';

import { HubService } from 'app/service/hub.service';
import { AuthGuard } from 'app/auth/helpers';
import { Role } from 'app/auth/models';
import { DebriefComponent } from './debrief.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};
// routing
const routes: Routes = [
  {
    path: 'debrief',
    component: DebriefComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin],animation: 'colors' }
  }
];

@NgModule({
  declarations: [DebriefComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes), 
    CardSnippetModule,
    ContentHeaderModule, 
    FormsModule, 
    NgbModule,
    NgxDatatableModule,
    SwiperModule,
    CoreCommonModule,
    NgSelectModule,
    CsvModule,
    CoreDirectivesModule,
    SweetAlert2Module.forRoot()
    ],
    providers: [HubService,  {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }]
})
export class DebriefModule {}
