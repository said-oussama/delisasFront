import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeDbService } from '@fake-db/fake-db.service';

import 'hammerjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { ContextMenuModule } from '@ctrl/ngx-rightclick';

import { CoreModule } from '@core/core.module';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule, CoreThemeCustomizerModule } from '@core/components';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';

import { coreConfig } from 'app/app-config';
import { AuthGuard } from 'app/auth/helpers/auth.guards';
import { fakeBackendProvider } from 'app/auth/helpers'; // used to create fake backend
import { JwtInterceptor, ErrorInterceptor } from 'app/auth/helpers';
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { ContextMenuComponent } from 'app/main/extensions/context-menu/context-menu.component';
import { AnimatedCustomContextMenuComponent } from './main/extensions/context-menu/custom-context-menu/animated-custom-context-menu/animated-custom-context-menu.component';
import { BasicCustomContextMenuComponent } from './main/extensions/context-menu/custom-context-menu/basic-custom-context-menu/basic-custom-context-menu.component';
import { SubMenuCustomContextMenuComponent } from './main/extensions/context-menu/custom-context-menu/sub-menu-custom-context-menu/sub-menu-custom-context-menu.component';
import { Role } from './auth/models';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./main/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'apps',
    loadChildren: () => import('./main/apps/apps.module').then(m => m.AppsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pages',
    loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'hub',
    loadChildren: () => import('./main/app/hub/hub.module').then(m => m.HubModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'components',
    loadChildren: () => import('./main/components/components.module').then(m => m.ComponentsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'extensions',
    loadChildren: () => import('./main/extensions/extensions.module').then(m => m.ExtensionsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'personnel',
    loadChildren: () => import('./main/app/personnel/personnel.module').then(m => m.PersonnelModule),
    //canActivate: [AuthGuard]
   // ,data: { roles: ['Admin']}
  },
  {
    path: 'dispatch',
    loadChildren: () => import('./main/app/dispatch/dispatch/dispatch.module').then(m => m.DispatchModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'list-dispatch',
    loadChildren: () => import('./main/app/dispatch/dispatch/list-dispatch/list-dispatch.module').then(m => m.ListDispatcheModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'colis',
    loadChildren: () => import('./main/forms/forms.module').then(m => m.FormsModule),
    //canActivate: [AuthGuard]
   // ,data: { roles: ['Admin']}
  },
  {
    path: 'fournisseurs',
    loadChildren: () => import('./main/app/fournisseurs/fournisseurs.module').then(m => m.FournisseursModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'debrief',
    loadChildren: () => import('./main/app/debrief/debrief.module').then(m => m.DebriefModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'historique',
    loadChildren: () => import('./main/forms/historique/historique.module').then(m => m.HistoriqueModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'list-debrief',
    loadChildren: () => import('./main/app/list-debrief/list-debrief.module').then(m => m.ListDebriefModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'societe',
    loadChildren: () => import('./main/app/societe/societe.module').then(m => m.SocieteModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'coliss',
    loadChildren: () => import('./main/app/colis/colis.module').then(m => m.ColisModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'runsheet',
    loadChildren: () => import('./main/app/runsheet/runsheet.module').then(m => m.RunsheetModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ajouter-runsheet',
    loadChildren: () => import('./main/app/ajouter-runsheet/ajouter-runsheet.module').then(m => m.AjouterRunsheetModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'anomalie',
    loadChildren: () => import('./main/app/anomalie/anomalie.module').then(m => m.AnomalieModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'console',
    loadChildren: () => import('./main/app/console/console.module').then(m => m.ConsoleModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ajouter-console',
    loadChildren: () => import('./main/app/ajouter-console/ajouter-console.module').then(m => m.AjouterConsoleModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'liste-retour',
    loadChildren: () => import('./main/app/liste-retour/liste-retour.module').then(m => m.ListeRetourModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'transfert-sortant',
    loadChildren: () => import('./main/app/transfert-sortant/transfert-sortant.module').then(m => m.TransfertSortantModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'transfert-entrant',
    loadChildren: () => import('./main/app/transfert-entrant/transfert-entrant.module').then(m => m.TransfertEntrantModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'liste-echange',
    loadChildren: () => import('./main/app/liste-echange/liste-echange.module').then(m => m.ListeEchangeModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/dashboard/statistique',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/pages/miscellaneous/error' //Error 404 - Page not found
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ContextMenuComponent,
    BasicCustomContextMenuComponent,
    AnimatedCustomContextMenuComponent,
    SubMenuCustomContextMenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(FakeDbService, {
      delay: 0,
      passThruUnknownUrl: true
    }),
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled', // Add options right here
      relativeLinkResolution: 'legacy',
      useHash: true
    }),
    NgbModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot(),
    ContextMenuModule,
    CoreModule.forRoot(coreConfig),
    CoreCommonModule,
    CoreSidebarModule,
    CoreThemeCustomizerModule,
    CardSnippetModule,
    LayoutModule,
    ContentHeaderModule
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // ! IMPORTANT: Provider used to create fake backend, comment while using real API
    fakeBackendProvider
  ],
  entryComponents: [BasicCustomContextMenuComponent, AnimatedCustomContextMenuComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
