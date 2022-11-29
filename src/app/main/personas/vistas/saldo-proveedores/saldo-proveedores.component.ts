import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../../auth/service';
import {takeUntil} from 'rxjs/operators';
import {CoreConfigService} from '../../../../../@core/services/config.service';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-saldo-proveedores',
    templateUrl: './saldo-proveedores.component.html',
    styleUrls: ['./saldo-proveedores.component.scss']
})
export class SaldoProveedoresComponent implements OnInit {
    public coreConfig: any;
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _coreConfigService: CoreConfigService,
        private _router: Router,
        private _authenticationService: AuthenticationService,

    ) {

    }

    inicio = true;
    continuar = false;
    continuarPago = false;

    ngOnInit(): void {
        this._unsubscribeAll = new Subject();

        this._coreConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.coreConfig = config;
            });
    }

    continuarCick() {
        this.inicio = false;
        this.continuar = true;
    }

    continuarCickPago() {
        this.continuar = false;

        this.continuarPago = true;
    }

    logout() {
        this._authenticationService.logout();
        this._router.navigate(['/grp/login']);
    }

}
