import {Component, OnInit} from '@angular/core';
import {RegistroProveedorService} from '../registro-proveedores/registro-proveedor.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../../auth/service';
import {PagoProvedorsService} from './pago-provedors.service';
import {log} from 'util';

@Component({
    selector: 'app-pago-provedors',
    templateUrl: './pago-provedors.component.html',
    styleUrls: ['./pago-provedors.component.scss']
})
export class PagoProvedorsComponent implements OnInit {

    public pagoFacturaForm: FormGroup;
    public submitted = false;
    public proveedores = [];
    public pagoProveedor = new FormData();

    constructor(
        private _router: Router,
        private _authenticationService: AuthenticationService,
        private _pagoProvedorsService: PagoProvedorsService,
        private _formBuilder: FormBuilder,
        private _proveedorService: RegistroProveedorService,
    ) {
    }

    get pagoFactura() {
        return this.pagoFacturaForm.controls;
    }

    ngOnInit(): void {
        this.pagoFacturaForm = this._formBuilder.group({
            _id: [''],
            valorPagar: ['', [Validators.required]],
            proveedor: ['', [Validators.required]],
            factura: ['', [Validators.required]],
        });
        this.obtenerProveedores();
    }

    obtenerProveedores() {
        this._proveedorService.list({
            page: 0, page_size: 10
        }).subscribe(info => {
            this.proveedores = info.info;
        });
    }

    subirImagen(event: any) {
        if (event.target.files && event.target.files[0]) {
            const nuevaImagen = event.target.files[0];
            this.pagoProveedor.delete('numeroFacturaproveedor');
            this.pagoProveedor.append('numeroFacturaproveedor', nuevaImagen, nuevaImagen.name);
        }
        console.log('this.pagoProveedor', this.pagoProveedor);
    }

    pagar() {
        this.submitted = true;
        if (this.pagoFacturaForm.invalid) {
            return;
        }
        const infoEmpresa = JSON.parse(localStorage.getItem('grpPersonasUser')).persona.empresaInfo;
        console.log('info ruc', infoEmpresa.rucEmpresa);
        console.log('this.pagoFacturaForm.get(\'valorPagar\').value', this.pagoFacturaForm.get('valorPagar').value);
        this.pagoProveedor.delete('razonSocial');
        this.pagoProveedor.append('razonSocial', infoEmpresa.comercial);
        this.pagoProveedor.delete('rucEmpresa');
        this.pagoProveedor.append('rucEmpresa', infoEmpresa.rucEmpresa);
        this.pagoProveedor.delete('monto');
        this.pagoProveedor.append('monto', this.pagoFacturaForm.get('valorPagar').value);
        this.pagoProveedor.delete('proveedor');
        this.pagoProveedor.append('proveedor', this.pagoFacturaForm.get('proveedor').value);
        this.pagoProveedor.delete('empresaInfo');
        this.pagoProveedor.append('empresaInfo', JSON.stringify(infoEmpresa));
        this.pagoProveedor.delete('estado');
        this.pagoProveedor.append('estado', 'Nuevo');
        this.pagoProveedor.delete('tipoCredito');
        this.pagoProveedor.append('tipoCredito', 'Pymes-Normales');

        this._pagoProvedorsService.crearCredito(this.pagoProveedor).subscribe((info) => {
                console.log('guardado', info);
            }
        );
        this._router.navigate(['/personas/validarResultados']);
        console.log('se guardo');
    }

    cancelar() {
        this._authenticationService.logout();
        this._router.navigate(['/grp/login']);
    }

}
