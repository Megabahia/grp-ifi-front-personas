import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
                aceptarTerminos: ['', [Validators.required, Validators.requiredTrue]],
                nombreRepresentante: ['', [Validators.required]],
                apellidoRepresentante: ['', [Validators.required]],
                correoRepresentante: ['', [Validators.required, Validators.email]],
                telefonoRepresentante: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
                whatsappRepresentante: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
                tipoIdentificacionRepresentante: ['', [Validators.required]],
                identificacionRepresentante: ['', [Validators.required]],
            });

    }

    get firmaElectronica() {
        return this.firmaForm.controls;
    }

    obtenerTipoIdentificacion() {
        if (this.firmaForm.get('tipoIdentificacionRepresentante').value === 'cedula') {
            (this.firmaForm as FormGroup)
                .setControl('identificacionRepresentante',
                    new FormControl(this.firmaForm.value.identificacionRepresentante,
                        [Validators.required, ValidacionesPropias.cedulaValido])
                );
        } else {
            (this.firmaForm as FormGroup)
                .setControl('identificacionRepresentante',
                    new FormControl(this.firmaForm.value.identificacionRepresentante,
                        [Validators.required, ValidacionesPropias.rucValido])
                );
        }
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
