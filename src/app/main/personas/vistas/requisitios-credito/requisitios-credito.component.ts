import {Component, OnInit} from '@angular/core';
import {RegistroDatosPagoProvedoresService} from '../requisito-solicitud-microcreditos/registro-datos-pago-provedores.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: 'app-requisitios-credito',
    templateUrl: './requisitios-credito.component.html',
    styleUrls: ['./requisitios-credito.component.scss']
})
export class RequisitiosCreditoComponent implements OnInit {

    tiutlo;
    requisitos = [];
    montoBASEDATOS;
    requisitosINFEROR;
    requisitosSUPERIOR;


    constructor(
        private _registroDatosService: RegistroDatosPagoProvedoresService,
        private rutaActiva: ActivatedRoute,
    ) {
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
    }

}
