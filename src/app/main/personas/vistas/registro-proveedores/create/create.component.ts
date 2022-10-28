import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  @Output() pantalla = new EventEmitter<number>();

  public proveedorForm: FormGroup;
  public cuentaForm: FormGroup;
  public submitted = false;

  constructor(
    private _formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.proveedorForm = this._formBuilder.group({
      tipoPersona: ['', [Validators.required]],
      identificacion: ['', [Validators.required]],
      nombreRepresentante: ['', [Validators.required]],
      nombreComercial: ['', [Validators.required]],
      cuentas: this._formBuilder.array([
        this._formBuilder.group({
          tipoCuenta: ['', [Validators.required]],
          banco: ['', [Validators.required]],
          cuenta: ['', [Validators.required]],
          titular: ['', [Validators.required]]
        }),
        this._formBuilder.group({
          tipoCuenta: ['', [Validators.required]],
          banco: ['', [Validators.required]],
          cuenta: ['', [Validators.required]],
          titular: ['', [Validators.required]]
        })
      ])
    });
    this.proveedorForm.patchValue({
      'tipoPersona': 'Natural',
      'identificacion': 'qqqq',
      'nombreRepresentante': 'qqqqq',
      'nombreComercial': 'qqqqqq',
      'cuentas': [
        {
          'tipoCuenta': 'Natural',
          'banco': 'aaaaa',
          'cuenta': 'aaaaaa',
          'titular': 'aaaaa'
        },
        {
          'tipoCuenta': 'Juridico',
          'banco': 'vvvv',
          'cuenta': 'vvvvv',
          'titular': 'vvv'
        }
      ]
    });
  }

  get proveedor() {
    return this.proveedorForm.controls;
  }

  get cuentas() {
    return this.proveedorForm.controls['cuentas'] as FormArray;
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
    console.log('proveedor', this.proveedorForm.value);
  }

  cancelar() {
    this.pantalla.emit(0);
  }

}
