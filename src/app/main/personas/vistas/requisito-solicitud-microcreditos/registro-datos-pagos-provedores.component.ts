import {Component, OnInit} from '@angular/core';
import {log} from 'util';
import {RegistroDatosPagoProvedoresService} from './registro-datos-pago-provedores.service';

@Component({
    selector: 'app-requisito-solicitud-microcreditos',
    templateUrl: './registro-datos-pagos-provedores.component.html',
    styleUrls: ['./registro-datos-pagos-provedores.component.scss']
})
export class RegistroDatosPagosProvedoresComponent implements OnInit {
    checks: any;
    public monto;
    public datos;
    requisitos = [];
    montoBASEDATOS;
    requisitosINFEROR;
    requisitosSUPERIOR;


    constructor(private _registroDatosService: RegistroDatosPagoProvedoresService) {
    }

    ngOnInit(): void {
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
            });
        });
    }

    caculate_value() {
        this.monto > this.montoBASEDATOS ? console.log('mas de 8000') : console.log('menor de 8000');
        if (this.monto > this.montoBASEDATOS) {
            this.requisitos = this.requisitosSUPERIOR;
        } else {
            this.requisitos = this.requisitosINFEROR;
        }
    }

}
