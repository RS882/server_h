"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCityToSql = void 0;
const db_1 = require("./db");
const CityList = [
    "Berlin",
    "Hamburg",
    "München",
    "Köln",
    "Frankfurt am Main",
    "Stuttgart",
    "Düsseldorf",
    "Dortmund",
    "Essen",
    "Leipzig",
    "Bremen",
    "Dresden",
    "Hannover",
    "Nürnberg",
    "Duisburg",
    "Bochum",
    "Wuppertal",
    "Bielefeld",
    "Bonn",
    "Münster",
    "Karlsruhe",
    "Mannheim",
    "Augsburg",
    "Wiesbaden",
    "Gelsenkirchen",
    "Mönchengladbach",
    "Braunschweig",
    "Chemnitz",
    "Kiel",
    "Aachen",
    "Halle",
    "Magdeburg",
    "Freiburg im Breisgau",
    "Krefeld",
    "Lübeck",
    "Oberhausen",
    "Erfurt",
    "Mainz",
    "Rostock",
    "Kassel",
    "Hagen",
    "Hamm",
    "Saarbrücken",
    "Mülheim an der Ruhr",
    "Potsdam",
    "Ludwigshafen am Rhein",
    "Oldenburg",
    "Leverkusen",
    "Osnabrück",
    "Solingen",
    "Heidelberg",
    "Herne",
    "Neuss",
    "Darmstadt",
    "Paderborn",
    "Regensburg",
    "Ingolstadt",
    "Würzburg",
    "Fürth",
    "Wolfsburg",
    "Offenbach",
    "Ulm",
    "Heilbronn",
    "Pforzheim",
    "Göttingen",
    "Bottrop",
    "Trier",
    "Recklinghausen",
    "Reutlingen",
    "Bremerhaven",
    "Koblenz",
    "Bergisch Gladbach",
    "Jena",
    "Remscheid",
    "Erlangen",
    "Moers",
    "Mörs",
    "Siegen",
    "Hildesheim",
    "Salzgitter",
    "Kaiserslautern",
];
const activeCityCount = [4, 8, 10, 20, 37];
const addCityToSql = (cityArr = CityList, activeCity = activeCityCount) => {
    cityArr.forEach((e, i) => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.db.query(`INSERT INTO city(city_name, is_aktive) VALUES('${e}', ${activeCity.includes(i)});`);
    }));
};
exports.addCityToSql = addCityToSql;
