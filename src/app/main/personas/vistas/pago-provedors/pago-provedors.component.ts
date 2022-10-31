import {Component, OnInit} from '@angular/core';
import {RegistroProveedorService} from '../registro-proveedores/registro-proveedor.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../../auth/service';

@Component({
  selector: 'app-pago-provedors',
  templateUrl: './pago-provedors.component.html',
  styleUrls: ['./pago-provedors.component.scss']
})
export class PagoProvedorsComponent implements OnInit {

  public pagoFacturaForm: FormGroup;
  public submitted = false;
  public proveedores = [];

  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService,
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
      const imagen = new FormData();
      imagen.append('imagen', nuevaImagen, nuevaImagen.name);
    }
  }

  pagar() {
    this.submitted = true;
    if (this.pagoFacturaForm.invalid) {
      return;
    }
    console.log('se guardo');
  }

  cancelar() {
    this._authenticationService.logout();
    this._router.navigate(['/grp/login']);
  }

}
