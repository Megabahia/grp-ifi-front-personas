import {Component, OnInit} from '@angular/core';
import {RegistroDatosPagoProvedoresService} from '../requisito-solicitud-microcreditos/registro-datos-pago-provedores.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SolicitarCredito} from '../../models/persona';
import {User} from '../../../../auth/models';
import {CoreMenuService} from '../../../../../@core/components/core-menu/core-menu.service';
import {CreditosAutonomosService} from '../creditos-autonomos/creditos-autonomos.service';
import Decimal from 'decimal.js';
import {Subject} from 'rxjs';
import {CoreConfigService} from '../../../../../@core/services/config.service';

@Component({
    selector: 'app-requisitios-credito',
    templateUrl: './requisitios-credito.component.html',
    styleUrls: ['./requisitios-credito.component.scss']
})
export class RequisitiosCreditoComponent implements OnInit {

    private _unsubscribeAll: Subject<any>;
    tiutlo;
    requisitos = [];
    montoBASEDATOS;
    requisitosINFEROR;
    requisitosSUPERIOR;
    public usuario: User;
    private solicitarCredito: SolicitarCredito;


    constructor(
        private _coreConfigService: CoreConfigService,
        private _registroDatosService: RegistroDatosPagoProvedoresService,
        private _router: Router,
        private _coreMenuService: CoreMenuService,
        private _creditosAutonomosService: CreditosAutonomosService,
        private rutaActiva: ActivatedRoute,
    ) {
        this._unsubscribeAll = new Subject();
        this._coreConfigService.config = {
            layout: {
                navbar: {
                    hidden: true,
                },
                footer: {
                    hidden: true,
                },
                menu: {
                    hidden: true,
                },
                customizer: false,
                enableLocalStorage: false,
            },
        };
        this.solicitarCredito = this.inicialidarSolicitudCredito();
    }

    ngOnInit(): void {
        this.rutaActiva.params.subscribe(
            (params: Params) => {
                this._registroDatosService.consultaRequisitos('REQUISITOS_MICROCREDIOS').subscribe(data => {
                    data.map(item => {
                        if (item.nombre === 'MONTO') {
                            this.montoBASEDATOS = item.valor;
                        }
                        if (item.nombre === 'INFERIOR_INGRESOS_MENSUALES') {
                            this.requisitosINFEROR = item.config;
                        }
                        if (item.nombre === 'SUPERIOR_INGRESOS_MENSUALES') {
                            this.requisitosSUPERIOR = item.config;
                        }
                        if (item.nombre === 'TITULO') {
                            this.tiutlo = item.valor.replace('$montoPago', this.montoBASEDATOS).replace('$cuotaMensual', params.monto);
                        }
                        if (params.monto > this.montoBASEDATOS) {
                            this.requisitos = this.requisitosSUPERIOR;
                        } else {
                            this.requisitos = this.requisitosINFEROR;
                        }
                    });
                });
            }
        );
        this.usuario = this._coreMenuService.grpPersonasUser;
    }

    inicialidarSolicitudCredito(): SolicitarCredito {
        return {
            _id: '',
            aceptaTerminos: 0,
            empresaComercial_id: '',
            empresaIfis_id: '',
            estado: 'Nuevo',
            monto: new Decimal(localStorage.getItem('montoCreditoFinal')).toNumber(),
            cuota: new Decimal(localStorage.getItem('coutaMensual')).toNumber(),
            plazo: 12,
            user_id: '',
            canal: 'Pymes-Normales',
            tipoCredito: 'Pymes-Normales',
            concepto: 'Pymes-Normales',
            nombres: '',
            apellidos: '',
            numeroIdentificacion: '',
            empresaInfo: JSON.parse(localStorage.getItem('grpPersonasUser')).persona.empresaInfo,
            estadoCivil: JSON.parse(localStorage.getItem('grpPersonasUser')).persona.estadoCivil,
        };
    }

    crearCredito() {
        // Agregar informacion al credito
        this.solicitarCredito.user_id = this.usuario.id;
        this.solicitarCredito.nombres = this.usuario.persona.nombres;
        this.solicitarCredito.apellidos = this.usuario.persona.apellidos;
        this.solicitarCredito.numeroIdentificacion = this.usuario.persona.identificacion;
        this.solicitarCredito.email = this.usuario.email;
        this._creditosAutonomosService.crearCredito(this.solicitarCredito).subscribe((info) => {
        });
        this._router.navigate(['/personas/finalizar-credito']);
    }

}
