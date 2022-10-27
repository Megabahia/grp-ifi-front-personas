import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

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
  }

  get proveedor() {
    return this.proveedorForm.controls;
  }

  get cuentas() {
    return this.proveedorForm.controls['cuentas'] as FormArray;
  }

  agregarCuenta() {
    const lessonForm = this._formBuilder.group({
      tipoCuenta: ['', [Validators.required]],
      banco: ['', [Validators.required]],
      cuenta: ['', [Validators.required]],
      titular: ['', [Validators.required]]
    });
    this.cuentas.push(lessonForm);
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

}
