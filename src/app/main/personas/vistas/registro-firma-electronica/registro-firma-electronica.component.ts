import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidacionesPropias} from '../../../../../utils/customer.validators';
import {FirmaElectronicaService} from './firma-electronica.service';

@Component({
    selector: 'app-registro-firma-electronica',
    templateUrl: './registro-firma-electronica.component.html',
    styleUrls: ['./registro-firma-electronica.component.scss']
})
export class RegistroFirmaElectronicaComponent implements OnInit {


    public firmaForm: FormGroup;
    public firmaFormData: FormData;
    public submitted = false;

    constructor(
        private _formBuilder: FormBuilder,
        private _firmaElectronica: FirmaElectronicaService,
    ) {
    }

    ngOnInit(): void {
        this.firmaForm = this._formBuilder.group(
            {
                archivo: ['', [Validators.required, ValidacionesPropias.firmaElectronicaValido]],
                nombreRepresentante: ['', [Validators.required]],
                apellidoRepresentante: ['', [Validators.required]],
                correoRepresentante: ['', [Validators.required, Validators.email]],
                telefonoRepresentante: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
                whatsappRepresentante: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
                cedulaRepresentante: ['', [Validators.required, ValidacionesPropias.rucValido]],
            });

    }

    get firmaElectronica() {
        return this.firmaForm.controls;
    }

    guardar() {
        this.submitted = true;
        if (this.firmaForm.invalid) {
            console.log('form', this.firmaForm);
            return;
        }
        this._firmaElectronica.crear(this.firmaForm.value).subscribe((info) => {
            console.log(info);
        });
        console.log('paso');
    }
}
