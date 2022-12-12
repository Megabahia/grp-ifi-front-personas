import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../auth/models';
import {CoreMenuService} from '../../../../../@core/components/core-menu/core-menu.service';
import {SolicitudCreditosService} from './solicitud-creditos.service';
import {Router} from '@angular/router';
import {ParametrizacionesService} from '../../servicios/parametrizaciones.service';
import {takeUntil} from 'rxjs/operators';
import {CoreConfigService} from '../../../../../@core/services/config.service';
import {Subject} from 'rxjs';
import {ValidacionesPropias} from '../../../../../utils/customer.validators';

@Component({
    selector: 'app-solicitud-creditos',
    templateUrl: './solicitud-creditos.component.html',
    styleUrls: ['./solicitud-creditos.component.scss']
})
export class SolicitudCreditosComponent implements OnInit {
    // configuracion
    public coreConfig: any;
    private _unsubscribeAll: Subject<any>;

    @ViewChild('teams') teams!: ElementRef;
    public formSolicitud: FormGroup;
    public formConyuge: FormGroup;
    public estadoCivil;
    public casado = false;
    public submitted = false;
    public usuario: User;
    public paisOpciones;
    public provinciaOpciones;
    public ciudadOpciones;
    public tipoParentesco = [];
    public listadoEstadoCivil;

    constructor(
        private _coreConfigService: CoreConfigService,
        private paramService: ParametrizacionesService,
        private _formBuilder: FormBuilder,
        private _coreMenuService: CoreMenuService,
        private _serviceUpdateEmpresa: SolicitudCreditosService,
        private _router: Router
    ) {
        this._unsubscribeAll = new Subject();
        // Subscribe to config changes
        this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
            this.coreConfig = config;
        });
    }

    ngOnInit(): void {
        this.usuario = this._coreMenuService.grpPersonasUser;
        this.declareFormConyuge();
        this.formSolicitud = this._formBuilder.group(
            {
                reprsentante: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]+')]], //
                rucEmpresa: ['', [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]*$')]], //
                comercial: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]+')]], //
                actividadEconomica: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]+')]], //
                pais: ['', Validators.required],
                provincia: ['', Validators.required],
                ciudad: ['', Validators.required],
                callePrincipal: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]+')]], //
                calleSecundaria: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]+')]], //
                refenciaNegocio: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]+')]], //
                direccionDomiciolRepresentante: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]+')]], //
                esatdo_civil: ['', [Validators.required]], //
                correo: [this.usuario.email, [Validators.required, Validators.email]], //
                telefono: ['', [Validators.required, Validators.minLength(7), Validators.minLength(10), Validators.pattern('^[0-9]*$')]], //
                celular: ['', [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]*$')]], //
                whatsapp: ['', [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]*$')]], //
                conyuge: this._formBuilder.group({
                    nombreConyuge: [''], //
                    telefonoConyuge: ['', [Validators.pattern('^[0-9]*$')]], //
                    cedulaConyuge: [''],
                }),
                familiares: this._formBuilder.array([
                    this._formBuilder.group({
                        tipoPariente: ['', [Validators.required]],
                        nombreFamiliar: ['', [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]+')]], //
                        apellidoFamiliar: ['', [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]+')]], //
                        telefonoFamiliar: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], //
                        direccionFamiliar: ['', [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]+')]], //
                        //
                    }),
                    this._formBuilder.group({
                        tipoPariente: ['', [Validators.required]],
                        nombreFamiliar: ['', [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]+')]], //
                        apellidoFamiliar: ['', [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]+')]], //
                        telefonoFamiliar: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], //
                        direccionFamiliar: ['', [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]+')]], //
                        //
                    }),
                    this._formBuilder.group({
                        tipoPariente: ['', [Validators.required]],
                        nombreFamiliar: ['', [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]+')]], //
                        apellidoFamiliar: ['', [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]+')]], //
                        telefonoFamiliar: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], //
                        direccionFamiliar: ['', [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]+')]], //
                        //
                    }),
                ], [ValidacionesPropias.parientesTelefonos, ValidacionesPropias.padres]),
                inresosMensualesVentas: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], //
                sueldoConyuge: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], //
                otrosIngresos: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], //
                gastosMensuales: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], //
                gastosFamilaires: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], //
                especificaIngresos: ['', [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]+')]], //
            });
        if (this.usuario.persona.empresaInfo) {
            this.formSolicitud.patchValue({...this.usuario.persona.empresaInfo});
            if (this.usuario.persona.empresaInfo.estadoCivil === 'Casado') {
                this.casado = true;
            }
        }
        this.obtenerPaisOpciones();
        this.obtenerProvinciaOpciones();
        this.obtenerCiudadOpciones();
        this.obtenerEstadosCiviles();
        this.paramService.obtenerListaPadres('TIPO_PARIENTE').subscribe((info) => {
            this.tipoParentesco = info;
        });
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
        if (this.formSolicitud.get('esatdo_civil').value === 'Casado' || this.formSolicitud.get('esatdo_civil').value === 'Unión libre') {
            this.formConyuge = this._formBuilder.group({
                nombreConyuge: ['', [Validators.required]], //
                telefonoConyuge: ['', [Validators.required]], //
                correoConyuge: ['', [Validators.required]],
            });
            this.casado = true;
        }
    }

    obtenerPaisOpciones() {
        this.paramService.obtenerListaPadres('PAIS').subscribe((info) => {
            this.paisOpciones = info;
        });
    }

    obtenerProvinciaOpciones() {
        this.paramService.obtenerListaHijos(this.formSolicitud.get('pais').value, 'PAIS').subscribe((info) => {
            this.provinciaOpciones = info;
        });
    }

    obtenerCiudadOpciones() {
        this.paramService.obtenerListaHijos(this.formSolicitud.get('provincia').value, 'PROVINCIA').subscribe((info) => {
            this.ciudadOpciones = info;
        });
    }

    obtenerEstadosCiviles() {
        this.paramService.obtenerListaPadresSinToken('ESTADO_CIVIL').subscribe((info) => {
            console.log(info);
            this.listadoEstadoCivil = info;
        });
    }

    get controlsFrom() {
        return this.formSolicitud.controls;
    }

    get controlsFromContuge() {
        return this.formConyuge.controls;
    }

    get controlsContuge() {
        return this.formSolicitud.get('conyuge')['controls'] ;
    }

    guardar() {
        this.submitted = true;
        if (this.formSolicitud.invalid) {
            console.log('fomulario', this.formSolicitud);
            return;
        }
        // this.formSolicitud.setValue('conyuge', this.formConyuge.value);
        const values = {
            empresaInfo: this.formSolicitud.value,
            user_id: this.usuario.id,
        };

        this._serviceUpdateEmpresa.actualiarEmpresa(values).subscribe((valor) => {
            console.log('guardado', valor);
            const newJson = JSON.parse(localStorage.getItem('grpPersonasUser'));
            newJson.persona.empresaInfo = values.empresaInfo;
            localStorage.setItem('grpPersonasUser', JSON.stringify(newJson));
            this._router.navigate([`/personas/requisitosCredito/${777}`]);
        });
        console.log('values', this.formSolicitud.value, values);
        // this._perfilUsuarioService
        //     .guardarInformacion(values)
        //     .subscribe(
        //         (info) => {
        //             // if (info.error) {
        //             //     return;
        //             // }
        //             // const newJson = JSON.parse(localStorage.getItem('grpPersonasUser'));
        //             // newJson.empresaInfo = values.empresaInfo;
        //             // localStorage.setItem('grpPersonasUser', JSON.stringify(newJson));
        //         });
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
