import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'environments/environment';

/**
 * IFIS
 * Personas
 */

@Injectable({
    providedIn: 'root'
})
export class BienvenidoService {

    constructor(private _httpClient: HttpClient) {
    }

    /**
     * Metodo sirve para actualizar el usuario
     */
    cambioDeEstado(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/central/usuarios/update/${datos.id}`,
            {estado: datos.estado}
        );
    }

    /**
     * Metodo sirve para listar los productos de la base de central
     */
    obtenerProductos(tipo) {
        return this._httpClient.post<any>(`${environment.apiUrl}/central/productos/list/`,
            tipo
        );
    }

    /**
     * MEtodo sirve para obtener un producto de la base central
     */
    obtenerProducto(id) {
        return this._httpClient.get<any>(`${environment.apiUrl}/central/productos/listOne/${id}`,
        );
    }

    /**
     * Metodo sirve para crear el registro de monedas del usuario
     */
    guardarSuperMonedas(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/core/monedas/create/`, datos
        );
    }

    /**
     * Meotodo sirve para listar una empresa por filtros
     */
    obtenerEmpresa(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/corp/empresas/listOne/filtros/`, datos
        );
    }
}
