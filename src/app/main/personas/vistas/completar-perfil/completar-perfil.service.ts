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
export class CompletarPerfilService {

    constructor(private _httpClient: HttpClient) {
    }

    /**
     * MEtodo sirve para actualizar la imagen de la persona
     */
    subirImagenRegistro(id, imagen) {
        return this._httpClient.post<any>(`${environment.apiUrl}/personas/personas/update/imagen/${id}`, imagen);
    }

    /**
     * MEtodo sirve para actualizar los datos de la persona
     */
    guardarInformacion(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/personas/personas/update/${datos.user_id}`, datos);
    }

    /**
     * MEtodo sirve para obtener una persona
     */
    obtenerInformacion(id) {
        return this._httpClient.get<any>(`${environment.apiUrl}/personas/personas/listOne/${id}`);
    }

    /**
     * Metodo sirve para validar el codigo de la persona
     */
    validarWhatsapp(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/personas/personas/validarCodigo/`, datos);
    }

}
