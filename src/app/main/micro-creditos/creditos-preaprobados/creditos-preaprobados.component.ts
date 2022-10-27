import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GanarSuperMoneda} from '../../personas/models/supermonedas';
import {MicroCreditosService} from '../micro-creditos.service';

@Component({
  selector: 'app-creditos-preaprobados',
  templateUrl: './creditos-preaprobados.component.html',
  styleUrls: ['./creditos-preaprobados.component.scss']
})
export class CreditosPreaprobadosComponent implements OnInit {

  public submitted = false;
  public validarForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _microCreditosServicios: MicroCreditosService,
  ) {

  }

  get f() {
    return this.validarForm.controls;
  }

  ngOnInit(): void {
    this.validarForm = this._formBuilder.group({
      rucEmpresa: ['', [Validators.required]],
      codigo: ['', [Validators.required]],
    });
  }

  validarCodigo() {
    this.submitted = true;
    if (this.validarForm.invalid) {
      return;
    }
    this._microCreditosServicios.compararCodigo(this.validarForm.value).subscribe(info => {

    },
      error => alert('Usted no tiene un credito'));
  }

}
