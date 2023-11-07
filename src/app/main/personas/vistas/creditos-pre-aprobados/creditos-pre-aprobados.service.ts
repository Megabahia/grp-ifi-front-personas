import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'environments/environment';

/**
 * IFIS
 * PErsonas
 */

@Injectable({
    providedIn: 'root'
})
export class CreditosPreAprobadosService {

    constructor(private _httpClient: HttpClient) {
    }

    /**
     * MEtodo sirve para obtener un credito por el id de la persona
     */
    obtenerCreditoUsuario(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/corp/creditoPersonas/listOne/usuario/${datos.id}`, datos);
    }

    /**
     * MEtodo sirve para listar los creditos personas
     */
    obtenerListaCreditos(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/corp/creditoPersonas/list/`, datos);
    }

    /**
     * MEtodo sirve para listar las empresa que tiene convenio
     */
    obtenerListaConvenios(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/corp/empresas/list/convenio/`, datos);
    }

    /**
     * MEtodo sirve para listar todas las empresas
     */
    obtenerListaEmpresasArray(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/corp/empresas/list/empresas/array/`, datos);
    }

    /**
     * MEtodo sirve para actualizar el credito persona
     */
    actualizarCredito(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/corp/creditoPersonas/update/${datos.get('_id')}`, datos);
    }

}
