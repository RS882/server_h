"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitysListDTO = void 0;
class CitysListDTO {
    constructor(model) {
        this.citysList = model ? model.map(e => e.city_name) : [];
    }
}
exports.CitysListDTO = CitysListDTO;
