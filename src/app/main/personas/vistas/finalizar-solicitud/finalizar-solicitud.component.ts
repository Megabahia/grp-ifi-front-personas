import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {CoreConfigService} from '../../../../../@core/services/config.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../../auth/service';

@Component({
  selector: 'app-finalizar-solicitud',
  templateUrl: './finalizar-solicitud.component.html',
  styleUrls: ['./finalizar-solicitud.component.scss']
})
export class FinalizarSolicitudComponent implements OnInit {
    public coreConfig: any;
    private _unsubscribeAll: Subject<any>;

  constructor(
      private _coreConfigService: CoreConfigService,
      private _authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
      this._unsubscribeAll = new Subject();

      this._coreConfigService.config
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((config) => {
              this.coreConfig = config;
          });
  }

}
