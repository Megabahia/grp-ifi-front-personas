import { Component, OnInit } from '@angular/core';
import {CoreConfigService} from '../../../../@core/services/config.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-credit-request',
  templateUrl: './credit-request.component.html',
  styleUrls: ['./credit-request.component.scss']
})
export class CreditRequestComponent implements OnInit {

  constructor(
    private _router: Router,
      private _coreConfigService: CoreConfigService,
  ) {
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true,
        },
        footer: {
          hidden: true,
        },
        menu: {
          hidden: true,
        },
        customizer: false,
        enableLocalStorage: false,
      },
    };
    // Verificar dominio pagina
    // const ref = document.referrer;
    // const host = document.location.host;
    // if (ref !== 'https://credicompra.com/') {
    //   if (host !== '209.145.61.41:4201') {
    //     this._router.navigate([
    //       `/grp/login`,
    //     ]);
    //     localStorage.clear();
    //     return;
    //   }
    // }
    // localStorage.setItem('pagina', ref);
    localStorage.setItem('pagina', 'https://credicompra.com/');
  }

  ngOnInit(): void {
  }

}
