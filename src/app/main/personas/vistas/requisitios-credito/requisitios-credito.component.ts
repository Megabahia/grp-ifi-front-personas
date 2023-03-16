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
import {ParametrizacionesService} from '../../servicios/parametrizaciones.service';

@Component({
    selector: 'app-requisitios-credito',
    templateUrl: './requisitios-credito.component.html',
    styleUrls: ['./requisitios-credito.component.scss']
})
export class RequisitiosCreditoComponent implements OnInit {
    public checksSolteroInferior = [
        {'label': 'Copia de cédula Representante legal', 'valor': false},
        {'label': 'RUC del negocio', 'valor': false},
        {'label': 'Foto tamaño carnet', 'valor': false},
        {'label': 'Copia de papeleta de votación Representante Legal.', 'valor': false},
        {'label': 'Copia de planilla de luz del Negocio', 'valor': false},
        {'label': 'Copia de planilla de luz del Domicilio', 'valor': false},
        {'label': 'Copia de Factura de Ventas del negocio del último mes (factura de hace 1 mes)', 'valor': false},
        {'label': 'Copia de Factura de Ventas del negocio del penúltimo mes (factura de hace 2 meses)', 'valor': false},
        {'label': 'Copia de Factura de Compra del negocio del último mes (factura de hace 1 mes)', 'valor': false},
        {'label': 'Copia de Factura de Compra del negocio del penúltimo mes (factura de hace 2 meses)', 'valor': false},
        {'label': 'Factura pendiente de pago del proveedor.', 'valor': false},
        {'label': 'Copia de matrícula del vehículo (obligatorio)', 'valor': false},
        {'label': 'Copia de pago de impuesto predial o copia de escrituras', 'valor': false},
        {'label': 'Buró de crédito', 'valor': false},
        {'label': 'Calificación de Buró de Crédito', 'valor': false},
    ];
    public checksSolteroSuperior = [
        {'label': 'Copia de cédula del Representante Legal', 'valor': false},
        {'label': 'Copia de papeleta de votación del Representante Legal', 'valor': false},
        {'label': 'RUC del negocio', 'valor': false},
        {'label': 'Nombramiento del Representante Legal inscrito en el Registro Mercantil.', 'valor': false},
        {'label': 'Certificado de cumplimiento de la Superintendencia de Compañías.', 'valor': false},
        {'label': 'Certificado de cumplimiento de obligaciones patronales con el IESS. (En caso de que la empresa no cuente con empleados se requiere una declaración juramentada)', 'valor': false},
        {'label': 'Nómina de socios y/o accionistas.', 'valor': false},
        {'label': 'Acta de Junta General u órgano competente autorizando la contratación del crédito.', 'valor': false},
        {'label': 'Certificado bancario', 'valor': false},
        {'label': 'Dos referencias comerciales (en caso de importaciones adjuntar copias de facturas).', 'valor': false},
        {'label': 'Balance de pérdidas y ganancias', 'valor': false},
        {'label': 'Balance de resultados', 'valor': false},
        {'label': 'Declaración del IVA de los últimos seis meses.', 'valor': false},
        {'label': 'Estados de cuenta de tarjeta de crédito (empresas unipersonales).', 'valor': false},
        {'label': 'Buró de crédito', 'valor': false},
        {'label': 'Calificación de Buró de Crédito', 'valor': false},
    ];
    public checksCasadoInferior = [
        {'label': 'Copia de cédula Representante legal', 'valor': false},
        {'label': 'RUC del negocio', 'valor': false},
        {'label': 'Foto tamaño carnet', 'valor': false},
        {'label': 'Copia de papeleta de votación Representante Legal.', 'valor': false},
        {'label': 'Copia de cédula de cónyuge', 'valor': false},
        {'label': 'Copia de papeleta de votación de cónyuge', 'valor': false},
        {'label': 'Copia de planilla de luz del Negocio', 'valor': false},
        {'label': 'Copia de planilla de luz del Domicilio', 'valor': false},
        {'label': 'Copia de Factura de Ventas del negocio del último mes (factura de hace 1 mes)', 'valor': false},
        {'label': 'Copia de Factura de Ventas del negocio del penúltimo mes (factura de hace 2 meses)', 'valor': false},
        {'label': 'Copia de Factura de Compra del negocio del último mes (factura de hace 1 mes)', 'valor': false},
        {'label': 'Copia de Factura de Compra del negocio del penúltimo mes (factura de hace 2 meses)', 'valor': false},
        {'label': 'Factura pendiente de pago del proveedor.', 'valor': false},
        {'label': 'Copia de matrícula del vehículo (obligatorio)', 'valor': false},
        {'label': 'Copia de pago de impuesto predial o copia de escrituras', 'valor': false},
        {'label': 'Buró de crédito', 'valor': false},
        {'label': 'Calificación de Buró de Crédito', 'valor': false},
    ];
    public checksCasadoSuperior = [
        {'label': 'Copia de cédula del Representante Legal', 'valor': false},
        {'label': 'Copia de papeleta de votación del Representante Legal', 'valor': false},
        {'label': 'Copia de cédula de cónyuge', 'valor': false},
        {'label': 'Copia de papeleta de votación cónyuge', 'valor': false},
        {'label': 'RUC del negocio', 'valor': false},
        {'label': 'Nombramiento del Representante Legal inscrito en el Registro Mercantil.', 'valor': false},
        {'label': 'Certificado de cumplimiento de la Superintendencia de Compañías.', 'valor': false},
        {'label': 'Certificado de cumplimiento de obligaciones patronales con el IESS. (En caso de que la empresa no cuente con empleados se requiere una declaración juramentada)', 'valor': false},
        {'label': 'Nómina de socios y/o accionistas.', 'valor': false},
        {'label': 'Acta de Junta General u órgano competente autorizando la contratación del crédito.', 'valor': false},
        {'label': 'Certificado bancario', 'valor': false},
        {'label': 'Dos referencias comerciales (en caso de importaciones adjuntar copias de facturas).', 'valor': false},
        {'label': 'Balance de pérdidas y ganancias', 'valor': false},
        {'label': 'Balance de resultados', 'valor': false},
        {'label': 'Declaración del IVA de los últimos seis meses.', 'valor': false},
        {'label': 'Estados de cuenta de tarjeta de crédito (empresas unipersonales).', 'valor': false},
        {'label': 'Buró de crédito', 'valor': false},
        {'label': 'Calificación de Buró de Crédito', 'valor': false},
    ];
    public checks = [];

    private _unsubscribeAll: Subject<any>;
    tiutlo;
    public requisitos = {
        valor: '',
        config: [],
        nombre: '',
        _id: ''
    };
    montoBASEDATOS;
    requisitosINFEROR;
    requisitosSUPERIOR;
    public usuario: User;
    private solicitarCredito: SolicitarCredito;
    private tipoPersona: string;
    public estadoCivil;


    constructor(
        private _coreConfigService: CoreConfigService,
        private _registroDatosService: RegistroDatosPagoProvedoresService,
        private _router: Router,
        private _coreMenuService: CoreMenuService,
        private _creditosAutonomosService: CreditosAutonomosService,
        private rutaActiva: ActivatedRoute,
        private paramService: ParametrizacionesService,
    ) {
        const casados = ['UNIÓN LIBRE', 'CASADO'];
        if (casados.find(item => item === localStorage.getItem('estadoCivil').toUpperCase())) {
            this.estadoCivil = 'CASADO';
        } else {
            this.estadoCivil = 'SOLTERO';
        }
        this.tipoPersona = `REQUISITOS_MICROCREDIOS_${this.estadoCivil}`;
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
        this.rutaActiva.params.subscribe(
            (params: Params) => {
                this.paramService.obtenerListaPadresSinToken('REQUISITOS_MICROCREDIOS').subscribe((data) => {
                    data.map(item => {
                        if (item.nombre === 'MONTO') {
                            this.montoBASEDATOS = item.valor;
                        }
                        if (item.nombre === 'TITULO') {
                            this.tiutlo = item.valor.replace('$montoPago', this.montoBASEDATOS).replace('$cuotaMensual', params.monto);
                            console.log(this.tiutlo);
                        }
                    });
                    this.paramService.obtenerListaPadresSinToken(this.tipoPersona).subscribe((info) => {
                        info.find((item) => {
                            if (data.valor > this.montoBASEDATOS) {
                                this.requisitos = info.find((item2) => {
                                    if (item2.valor === 'INFERIOR') {
                                        return item2;
                                    }
                                });
                                this.checks = this.estadoCivil === 'SOLTERO' ? this.checksSolteroInferior : this.checksCasadoInferior ;
                                console.log('inferiror', this.requisitos);
                            } else {
                                this.requisitos = info.find((item2) => {
                                    if (item2.valor === 'SUPERIROR') {
                                        return item2;
                                    }
                                });
                                this.checks = this.estadoCivil === 'SOLTERO' ? this.checksSolteroSuperior : this.checksCasadoSuperior ;
                                console.log('superior', this.requisitos);
                            }
                            return item;
                        });
                        console.log('requisitos', this.requisitos);
                    });
                });
                // this._registroDatosService.consultaRequisitos('REQUISITOS_MICROCREDIOS').subscribe(data => {
                //     data.map(item => {
                //         if (item.nombre === 'MONTO') {
                //             this.montoBASEDATOS = item.valor;
                //         }
                //         if (item.nombre === 'INFERIOR_INGRESOS_MENSUALES') {
                //             this.requisitosINFEROR = item.config;
                //         }
                //         if (item.nombre === 'SUPERIOR_INGRESOS_MENSUALES') {
                //             this.requisitosSUPERIOR = item.config;
                //         }
                //         if (item.nombre === 'TITULO') {
                //             this.tiutlo = item.valor.replace('$montoPago', this.montoBASEDATOS).replace('$cuotaMensual', params.monto);
                //         }
                //         if (params.monto > this.montoBASEDATOS) {
                //             this.requisitos = this.requisitosSUPERIOR;
                //         } else {
                //             this.requisitos = this.requisitosINFEROR;
                //         }
                //     });
                // });
            }
        );
        this.solicitarCredito = this.inicialidarSolicitudCredito();
    }

    ngOnInit(): void {

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
        this.solicitarCredito.checks = this.checks;
        this._creditosAutonomosService.crearCredito(this.solicitarCredito).subscribe((info) => {
        });
        this._router.navigate(['/personas/finalizar-credito']);
    }

}
