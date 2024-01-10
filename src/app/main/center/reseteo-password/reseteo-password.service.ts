import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'environments/environment';

/*
* IFIS
* Personas
* Este archivo contiene las las rutas para resetar la contraseña, actualizar un usuario por el email
* */

@Injectable({
    providedIn: 'root'
})
export class ReseteoPasswordService {

    constructor(private _httpClient: HttpClient) {
    }

    resetearPassword(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/central/auth/password_reset/confirm/`,
            datos
        );
    }

    updateUsuarioByEmail(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/central/usuarios/update/by/email/`,
            datos
        );
    }
}
