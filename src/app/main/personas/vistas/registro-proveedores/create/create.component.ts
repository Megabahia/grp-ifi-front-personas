import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RegistroProveedorService} from '../registro-proveedor.service';
import {ParametrizacionesService} from '../../../servicios/parametrizaciones.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  @Output() pantalla = new EventEmitter<number>();
  @Input() proveedorPadre;

  public proveedorForm: FormGroup;
  public cuentaForm: FormGroup;
  public submitted = false;
  public bancos = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _proveedorService: RegistroProveedorService,
    private paramService: ParametrizacionesService,
  ) {
  }

  ngOnInit(): void {
    this.proveedorForm = this._formBuilder.group({
      _id: [''],
      tipoPersona: ['', [Validators.required]],
      identificacion: ['', [Validators.required]],
      nombreRepresentante: ['', [Validators.required]],
      nombreComercial: ['', [Validators.required]],
      cuentas: this._formBuilder.array([], Validators.required)
    });
    this.proveedorPadre?.cuentas.forEach(item => this.agregarCuenta());
    this.proveedorForm.patchValue({...this.proveedorPadre});
    this.obtenerBancos();
  }

  get proveedor() {
    return this.proveedorForm.controls;
  }

  get cuentas() {
    return this.proveedorForm.controls['cuentas'] as FormArray;
  }

  obtenerBancos() {
    this.paramService.obtenerListaPadres('BANCOS').subscribe((info) => {
      this.bancos = info;
    });
  }

  agregarCuenta() {
    const cuentaForm = this._formBuilder.group({
      tipoCuenta: ['', [Validators.required]],
      banco: ['', [Validators.required]],
      cuenta: ['', [Validators.required]],
      titular: ['', [Validators.required]]
    });
    this.cuentas.push(cuentaForm);
  }

  deleteCuenta(index: number) {
    this.cuentas.removeAt(index);
  }

  guardar() {
    this.submitted = true;
    if (this.proveedorForm.invalid) {
      return;
    }
    if (this.proveedorForm.get('_id').value === '') {
      this._proveedorService.create(this.proveedorForm.value).subscribe(info => {
        this.pantalla.emit(0);
      });
    } else {
      this._proveedorService.update(this.proveedorForm.get('_id').value, this.proveedorForm.value).subscribe(info => {
        this.pantalla.emit(0);
      });
    }
  }

  cancelar() {
    this.pantalla.emit(0);
  }

}
