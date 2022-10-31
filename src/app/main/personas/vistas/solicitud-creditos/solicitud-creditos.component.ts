import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../auth/models';
import {CoreMenuService} from '../../../../../@core/components/core-menu/core-menu.service';
import {PerfilUsuarioService} from '../../../center/perfil-usuario/perfil-usuario.service';
import {LOADIPHLPAPI} from 'dns';

@Component({
    selector: 'app-solicitud-creditos',
    templateUrl: './solicitud-creditos.component.html',
    styleUrls: ['./solicitud-creditos.component.scss']
})
export class SolicitudCreditosComponent implements OnInit {
    @ViewChild('teams') teams!: ElementRef;
    public formSolicitud: FormGroup;
    public formConyuge: FormGroup;
    public estadoCivil;
    public casado = false;
    public submitted = false;
    public usuario: User;

    constructor(private _formBuilder: FormBuilder,
                private _coreMenuService: CoreMenuService,
                private _perfilUsuarioService: PerfilUsuarioService) {
    }

    ngOnInit(): void {
        this.usuario = this._coreMenuService.grpPersonasUser;
        this.declareFormConyuge();
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
                conyuge: this.formConyuge,
                familiares: this._formBuilder.array([
                    this._formBuilder.group({
                        nombreFamiliar: [''], //
                        apellidoFamiliar: [''], //
                        telefonoFamiliar: [''], //
                        direccionFamiliar: [''],
                        //
                    })
                ]),
                inresosMensualesVentas: ['', [Validators.required]], //
                sueldoConyuge: [''], //
                otrosIngresos: [''], //
                gastosMensuales: ['', [Validators.required]], //
                gastosFamilaires: ['', [Validators.required]], //
                especificaIngresos: [''], //
            });
        for (const atributo in this.formSolicitud.controls) {
            this.formSolicitud.controls[atributo].setValue(this.usuario.empresaInfo[atributo]);
        }
    }

    declareFormConyuge() {
        this.formConyuge = this._formBuilder.group({
            nombreConyuge: [''], //
            telefonoConyuge: [''], //
            correoConyuge: [''],
        });
    }

    selectEstadoCivil() {
        this.casado = false;
        this.estadoCivil = this.teams.nativeElement.value;
        this.declareFormConyuge();
        if (this.estadoCivil === 'Casado') {
            this.formConyuge = this._formBuilder.group({
                nombreConyuge: ['', [Validators.required]], //
                telefonoConyuge: ['', [Validators.required]], //
                correoConyuge: ['', [Validators.required]],
            });
            this.casado = true;
        }
    }

    get controlsFrom() {
        return this.formSolicitud.controls;
    }

    get controlsFromContuge() {
        return this.formConyuge.controls;
    }

    guardar() {
        this.submitted = true;
        if (this.formSolicitud.invalid) {
            return;
        }
        console.log(this.usuario);
        const values = {
            empresaInfo: this.formSolicitud.value,
            user_id: this.usuario.id,
            ...this.usuario.persona
        };
        delete values.imagen;
        this._perfilUsuarioService
            .guardarInformacion(values)
            .subscribe(
                (info) => {
                    if (info.error) {
                        return;
                    }
                    const newJson = JSON.parse(localStorage.getItem('grpPersonasUser'));
                    newJson.empresaInfo = values.empresaInfo;
                    localStorage.setItem('grpPersonasUser', JSON.stringify(newJson));
                });
    }

    get conyuges() {
        return this.formSolicitud.controls['conyuges'] as FormArray;
    }

    get familiares() {
        return this.formSolicitud.controls['familiares'] as FormArray;
    }

    agregarFamiliar() {
        const cuentaForm = this._formBuilder.group({
            nombreFamiliar: [''], //
            apellidoFamiliar: [''], //
            telefonoFamiliar: [''], //
            direccionFamiliar: [''],
        });
        this.familiares.push(cuentaForm);
    }

}
