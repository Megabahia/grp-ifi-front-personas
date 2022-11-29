import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-registro-firma-electronica',
    templateUrl: './registro-firma-electronica.component.html',
    styleUrls: ['./registro-firma-electronica.component.scss']
})
export class RegistroFirmaElectronicaComponent implements OnInit {

    constructor(
        private _formBuilder: FormBuilder,
    ) {
    }

    public formSolicitud: FormGroup;

    ngOnInit(): void {
        this.formSolicitud = this._formBuilder.group(
            {
                reprsentante: ['', [Validators.required]],
            });

    }
}
