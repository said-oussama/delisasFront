import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthGuard } from 'app/auth/helpers/auth.guards';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { ProfileComponent } from 'app/main/pages/profile/profile.component';

const routes: Routes = [
  {
    path: 'apps',
    component: ProfileComponent,
    canActivate: [AuthGuard],

    data: { animation: 'calendar' }
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    CoreCommonModule,
    ContentHeaderModule,
    Ng2FlatpickrModule
  ],

})
export class ProfileModule {}
