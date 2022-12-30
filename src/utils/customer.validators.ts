import {AbstractControl, FormControl, ValidationErrors} from '@angular/forms';
const validateDocument = require('validate-document-ecuador');

export class ValidacionesPropias {
    static parientesTelefonos(control: AbstractControl) {
        let repetidos = [];
        control['controls'].filter((value, index) => {
            let errors = value['controls']['telefonoFamiliar']['errors'] || {};
            delete errors?.['validoPas'];
            if (Object.entries(errors).length === 0) {
                value['controls']['telefonoFamiliar']['errors'] = null;
            } else {
                value['controls']['telefonoFamiliar']['errors'] = errors;
            }
            control['controls'].filter((value2, index2) => {
                if (index != index2) {
                    if (value['controls']['telefonoFamiliar']['value'] === value2['controls']['telefonoFamiliar']['value']) {
                        repetidos.push(index);
                    }
                }
            });
        });

        if (repetidos.length > 2) {
            repetidos.forEach(index => {
                let errors = control['controls'][index]['controls']['telefonoFamiliar']['errors'] || {};
                errors.validoPas = true;
                control['controls'][index]['controls']['telefonoFamiliar']['errors'] = errors;
            });
            return {multiplo5: true};
        } else {
            return null;
        }
    }

    static padres(control: AbstractControl) {
        const referencias = control['controls'];
        const padres = [];
        const madres = [];

        referencias.filter((value, index) => {
            let errors = value['controls']['tipoPariente']['errors'] || {};
            delete errors?.['validoPas5'];
            if (Object.entries(errors).length === 0) {
                value['controls']['tipoPariente']['errors'] = null;
            } else {
                value['controls']['tipoPariente']['errors'] = errors;
            }

            if (value['controls']['tipoPariente']['value'] === 'Padre') {
                padres.push(index);
            }
            if (value['controls']['tipoPariente']['value'] === 'Madre') {
                madres.push(index);
            }
        });
        if (padres.length > 1) {
            padres.forEach(index => {
                let errors = control['controls'][index]['controls']['tipoPariente']['errors'] || {};
                errors.validoPas5 = true;
                control['controls'][index]['controls']['tipoPariente']['errors'] = errors;
            });
        }
        if (madres.length > 1) {
            madres.forEach(index => {
                let errors = control['controls'][index]['controls']['tipoPariente']['errors'] || {};
                errors.validoPas5 = true;
                control['controls'][index]['controls']['tipoPariente']['errors'] = errors;
            });
        }
        if (madres.length > 1 || padres.length > 1) {
            return {multiplo5: true};
        } else {
            return null;
        }
    }

    static rucValido(control: AbstractControl) {
        const valido = validateDocument.getValidateDocument('ruc', control.value);
        if (valido.status === 'SUCCESS') {
            return null;
        } else {
            return {rucInvalid: true};
        }
    }

}


