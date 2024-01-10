import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'environments/environment';

/*
* IFIS
* Personsas
* */

@Injectable({
    providedIn: 'root'
})
export class PerfilUsuarioService {

    constructor(private _httpClient: HttpClient) {
    }

    /**
     * Esta ruta sirve para obtener informacion de la persona
     */
    obtenerInformacion(id) {
        return this._httpClient.get<any>(`${environment.apiUrl}/personas/personas/listOne/${id}`);
    }

    /**
     * Este metodo sirve para actualizar la informacion de la persona
     */
    guardarInformacion(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/personas/personas/update/${datos.user_id}`, datos);
    }

    /**
     * Este metodo sirve para actualizar la imagen de la persona
     */
    guardarImagen(datos, id) {
        return this._httpClient.post<any>(`${environment.apiUrl}/personas/personas/update/imagen/${id}`, datos);
    }

    /**
     * ESte metodo sirve para obtener el historial laboral de la persona
     */
    obtenerHistorialLaboral(user_id) {
        return this._httpClient.get<any>(`${environment.apiUrl}/personas/historialLaboral/listOne/${user_id}`);
    }

    /**
     * ESte metodo sirve para actualizar la historia laboral de la persona
     */
    guardarHistorialLaboral(user_id, datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/personas/personas/update/${user_id}`, datos);
    }
}
