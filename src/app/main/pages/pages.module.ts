import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';

import {CoreCommonModule} from '@core/common.module';
import {ContentHeaderModule} from 'app/layout/components/content-header/content-header.module';

import {AuthenticationModule} from './authentication/authentication.module';
import {MiscellaneousModule} from './miscellaneous/miscellaneous.module';
import {PagesViewsComponent} from './pages-views/pages-views.component';
import {RouterModule, Routes} from '@angular/router';
import {MensajeProductosComponent} from './mensaje-productos/mensaje-productos.component';
import {MensajeProductosFreeComponent} from './mensaje-productos-free/mensaje-productos-free.component';
import {CreditRequestComponent} from './credit-request/credit-request.component';
import {SimulatorCrediCompraComponent} from './simulator-credi-compra/simulator-credi-compra.component';
import {CreditRequirementsComponent} from './credit-requirements/credit-requirements.component';

// routing
const routes: Routes = [
    {
        path: 'pages-views',
        component: PagesViewsComponent,
        data: {roles: 'SuperMonedas'},
    },
    {
        path: 'mensajes-productos/:_id',
        component: MensajeProductosComponent,
        data: {animation: 'misc'},
    },
    {
        path: 'mensajes-productos-free',
        component: MensajeProductosFreeComponent,
        data: {animation: 'misc'},
    },
    {
        path: 'solicitud-credito',
        component: CreditRequestComponent,
        data: {animation: 'misc'},
    },
    {
        path: 'simulador-de-credito',
        component: SimulatorCrediCompraComponent,
        data: {animation: 'misc'},
    },
    {
        path: 'requisitos-de-credito',
        component: CreditRequirementsComponent,
        data: {animation: 'misc'},
    },
];

@NgModule({
    declarations: [
        PagesViewsComponent,
        MensajeProductosComponent,
        MensajeProductosFreeComponent,
        CreditRequestComponent,
        SimulatorCrediCompraComponent,
        CreditRequirementsComponent,
    ],

    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CoreCommonModule,
        ContentHeaderModule,
        NgbModule,
        NgSelectModule,
        FormsModule,
        AuthenticationModule,
        MiscellaneousModule,
    ],

    providers: [],
})
export class PagesModule {
}
