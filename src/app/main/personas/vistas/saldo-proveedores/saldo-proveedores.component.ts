import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../../auth/service';
import {takeUntil} from 'rxjs/operators';
import {CoreConfigService} from '../../../../../@core/services/config.service';
import {Subject} from 'rxjs';
import {RegistroProveedorService} from '../registro-proveedores/registro-proveedor.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-saldo-proveedores',
    templateUrl: './saldo-proveedores.component.html',
    styleUrls: ['./saldo-proveedores.component.scss']
})
export class SaldoProveedoresComponent implements OnInit {
    public coreConfig: any;
    private _unsubscribeAll: Subject<any>;
    public proveedor = null;
    public submitted = false;
    public inicio = true;
    public continuar = false;
    public continuarPago = false;
    public resumen = false;
    public documentoFirmaForm: FormGroup;

    constructor(
        private _coreConfigService: CoreConfigService,
        private _router: Router,
        private _authenticationService: AuthenticationService,
        private _proveedorService: RegistroProveedorService,
        private activatedRoute: ActivatedRoute,
        private _formBuilder: FormBuilder,
    ) {
        this.activatedRoute.params.subscribe(paramsId => {
            this.getOneProveedor(paramsId.proveedor);
        });
    }

    get documentoFirmar() {
        return this.documentoFirmaForm.controls;
    }

    ngOnInit(): void {
        this._unsubscribeAll = new Subject();

        this._coreConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.coreConfig = config;
            });
        this.documentoFirmaForm = this._formBuilder.group({
            nombreProveedor: ['', []],
            identificacion: ['', []],
            bancoDestino: ['', []],
            numeroCuenta: ['', []],
            valorPagar: ['', []],
            claveFirma: ['', [Validators.required]],
        });
    }

    getOneProveedor(proveedor) {
        this._proveedorService.getOne(proveedor).subscribe((info) => {
            this.proveedor = info;
            this.proveedor.valorPagar = localStorage.getItem('valorPagar');
            this.documentoFirmaForm.patchValue({...info, valorPagar: localStorage.getItem('valorPagar')});
        });
    }

    continuarCick() {
        this.inicio = false;
        this.continuar = true;
    }

    continuarCickPago() {
        this.submitted = true;
        if (this.documentoFirmaForm.invalid) {
            console.log('form', this.documentoFirmaForm);
            return;
        }
        this.continuar = false;

        this.continuarPago = true;
    }

    continuarClickResumen() {
        this.continuarPago = false;
        this.resumen = true;
    }

    logout() {
        this._authenticationService.logout();
        this._router.navigate(['/grp/login']);
    }

}
