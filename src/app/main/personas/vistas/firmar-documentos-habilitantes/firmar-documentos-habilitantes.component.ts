import {Component, OnInit} from '@angular/core';
import {CreditosPreAprobadosService} from '../creditos-pre-aprobados/creditos-pre-aprobados.service';
import {CoreMenuService} from '../../../../../@core/components/core-menu/core-menu.service';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-firmar-documentos-habilitantes',
    templateUrl: './firmar-documentos-habilitantes.component.html',
    styleUrls: ['./firmar-documentos-habilitantes.component.scss'],
    providers: [DatePipe],
})
export class FirmarDocumentosHabilitantesComponent implements OnInit {

    public usuario;
    public credito;

    constructor(
        private _creditosPreAprobadosService: CreditosPreAprobadosService,
        private _coreMenuService: CoreMenuService,
        private datePipe: DatePipe,
    ) {
        this.usuario = this._coreMenuService.grpPersonasUser;
    }

    ngOnInit(): void {
        this.obtenerCreditos();
    }

    transformarFecha(fecha) {
        return this.datePipe.transform(fecha, 'yyyy-MM-dd');
    }

    obtenerCreditos() {
        this._creditosPreAprobadosService.obtenerListaCreditos({
            page: 0,
            page_size: 10,
            estado: 'Aprobado',
            user_id: this.usuario.id
        }).subscribe((info) => {
            this.credito = info.info[0];
            console.log(info);
        });
    }
}
