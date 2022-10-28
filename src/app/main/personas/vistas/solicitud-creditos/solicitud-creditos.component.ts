import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-solicitud-creditos',
    templateUrl: './solicitud-creditos.component.html',
    styleUrls: ['./solicitud-creditos.component.scss']
})
export class SolicitudCreditosComponent implements OnInit {
    @ViewChild('teams') teams!: ElementRef;
    public formSolicitud: FormGroup;
    public estadoCivil;
    public casado = false;
    public submitted = false;


    constructor(private _formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.formSolicitud = this._formBuilder.group(
            {
                reprsentante: ['', [Validators.required]], //
                rucEmpresa: ['', [Validators.required]], //
                comercial: ['', [Validators.required]], //
                actividadEconomica: ['', [Validators.required]], //
                direccionDomiciolRepresentante: ['', [Validators.required]], //
                direccionEmpresa: ['', [Validators.required]], //
                referenciaDomicilio: ['', [Validators.required]], //
                esatdo_civil: ['', [Validators.required]], //
                correo: ['', [Validators.required]], //
                telefono: ['', [Validators.required]], //
                celular: ['', [Validators.required]], //
                nombreConyuge: [''], //
                telefonoConyuge: [''], //
                correoConyuge: [''], //
                nombreFamiliar: [''], //
                apellidoFamiliar: [''], //
                telefonoFamiliar: [''], //
                direccionFamiliar: [''], //
                inresosMensualesVentas: ['', [Validators.required]], //
                sueldoConyuge: [''], //
                otrosIngresos: [''], //
                gastosMensuales: ['', [Validators.required]], //
                gastosFamilaires: ['', [Validators.required]], //
                especificaIngresos: ['', [Validators.required]], //
                // checks
                // checks
            });
    }

    selectEstadoCivil() {
        this.casado = false;
        this.estadoCivil = this.teams.nativeElement.value;
        if (this.estadoCivil === 'Casado') {
            this.casado = true;
        }
    }

    get controlsFrom() {
        return this.formSolicitud.controls;
    }

    guardar() {
        this.submitted = true;
        if (this.formSolicitud.invalid) {
            return;
        }
        console.log(' va guardar', this.formSolicitud.value);
    }

}
