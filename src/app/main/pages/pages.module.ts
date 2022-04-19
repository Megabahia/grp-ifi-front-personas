import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";

import { CoreCommonModule } from "@core/common.module";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";

import { AuthenticationModule } from "./authentication/authentication.module";
import { MiscellaneousModule } from "./miscellaneous/miscellaneous.module";
import { PagesViewsComponent } from "./pages-views/pages-views.component";
import { RouterModule, Routes } from "@angular/router";
import { MensajeProductosComponent } from "./mensaje-productos/mensaje-productos.component";
import { MensajeProductosFreeComponent } from "./mensaje-productos-free/mensaje-productos-free.component";

// routing
const routes: Routes = [
  {
    path: "pages-views",
    component: PagesViewsComponent,
    data: { roles: "SuperMonedas" },
  },
  {
    path: "mensajes-productos/:_id",
    component: MensajeProductosComponent,
    data: { animation: "misc" },
  },
  {
    path: "mensajes-productos-free",
    component: MensajeProductosFreeComponent,
    data: { animation: "misc" },
  },
];

@NgModule({
  declarations: [
    PagesViewsComponent,
    MensajeProductosComponent,
    MensajeProductosFreeComponent,
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
export class PagesModule {}
