"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbRequestCall = exports.dbCitysList = exports.cityList = void 0;
;
;
var CityList;
(function (CityList) {
    CityList[CityList["Berlin"] = 0] = "Berlin";
    CityList[CityList["Hamburg"] = 1] = "Hamburg";
    CityList[CityList["M\u00FCnchen"] = 2] = "M\u00FCnchen";
    CityList[CityList["K\u00F6ln"] = 3] = "K\u00F6ln";
    CityList[CityList["Frankfurt am Main"] = 4] = "Frankfurt am Main";
    CityList[CityList["Stuttgart"] = 5] = "Stuttgart";
    CityList[CityList["D\u00FCsseldorf"] = 6] = "D\u00FCsseldorf";
    CityList[CityList["Dortmund"] = 7] = "Dortmund";
    CityList[CityList["Essen"] = 8] = "Essen";
    CityList[CityList["Leipzig"] = 9] = "Leipzig";
    CityList[CityList["Bremen"] = 10] = "Bremen";
    CityList[CityList["Dresden"] = 11] = "Dresden";
    CityList[CityList["Hannover"] = 12] = "Hannover";
    CityList[CityList["N\u00FCrnberg"] = 13] = "N\u00FCrnberg";
    CityList[CityList["Duisburg"] = 14] = "Duisburg";
    CityList[CityList["Bochum"] = 15] = "Bochum";
    CityList[CityList["Wuppertal"] = 16] = "Wuppertal";
    CityList[CityList["Bielefeld"] = 17] = "Bielefeld";
    CityList[CityList["Bonn"] = 18] = "Bonn";
    CityList[CityList["M\u00FCnster"] = 19] = "M\u00FCnster";
    CityList[CityList["Karlsruhe"] = 20] = "Karlsruhe";
    CityList[CityList["Mannheim"] = 21] = "Mannheim";
    CityList[CityList["Augsburg"] = 22] = "Augsburg";
    CityList[CityList["Wiesbaden"] = 23] = "Wiesbaden";
    CityList[CityList["Gelsenkirchen"] = 24] = "Gelsenkirchen";
    CityList[CityList["M\u00F6nchengladbach"] = 25] = "M\u00F6nchengladbach";
    CityList[CityList["Braunschweig"] = 26] = "Braunschweig";
    CityList[CityList["Chemnitz"] = 27] = "Chemnitz";
    CityList[CityList["Kiel"] = 28] = "Kiel";
    CityList[CityList["Aachen"] = 29] = "Aachen";
    CityList[CityList["Halle"] = 30] = "Halle";
    CityList[CityList["Magdeburg"] = 31] = "Magdeburg";
    CityList[CityList["Freiburg im Breisgau"] = 32] = "Freiburg im Breisgau";
    CityList[CityList["Krefeld"] = 33] = "Krefeld";
    CityList[CityList["L\u00FCbeck"] = 34] = "L\u00FCbeck";
    CityList[CityList["Oberhausen"] = 35] = "Oberhausen";
    CityList[CityList["Erfurt"] = 36] = "Erfurt";
    CityList[CityList["Mainz"] = 37] = "Mainz";
    CityList[CityList["Rostock"] = 38] = "Rostock";
    CityList[CityList["Kassel"] = 39] = "Kassel";
    CityList[CityList["Hagen"] = 40] = "Hagen";
    CityList[CityList["Hamm"] = 41] = "Hamm";
    CityList[CityList["Saarbr\u00FCcken"] = 42] = "Saarbr\u00FCcken";
    CityList[CityList["M\u00FClheim an der Ruhr"] = 43] = "M\u00FClheim an der Ruhr";
    CityList[CityList["Potsdam"] = 44] = "Potsdam";
    CityList[CityList["Ludwigshafen am Rhein"] = 45] = "Ludwigshafen am Rhein";
    CityList[CityList["Oldenburg"] = 46] = "Oldenburg";
    CityList[CityList["Leverkusen"] = 47] = "Leverkusen";
    CityList[CityList["Osnabr\u00FCck"] = 48] = "Osnabr\u00FCck";
    CityList[CityList["Solingen"] = 49] = "Solingen";
    CityList[CityList["Heidelberg"] = 50] = "Heidelberg";
    CityList[CityList["Herne"] = 51] = "Herne";
    CityList[CityList["Neuss"] = 52] = "Neuss";
    CityList[CityList["Darmstadt"] = 53] = "Darmstadt";
    CityList[CityList["Paderborn"] = 54] = "Paderborn";
    CityList[CityList["Regensburg"] = 55] = "Regensburg";
    CityList[CityList["Ingolstadt"] = 56] = "Ingolstadt";
    CityList[CityList["W\u00FCrzburg"] = 57] = "W\u00FCrzburg";
    CityList[CityList["F\u00FCrth"] = 58] = "F\u00FCrth";
    CityList[CityList["Wolfsburg"] = 59] = "Wolfsburg";
    CityList[CityList["Offenbach"] = 60] = "Offenbach";
    CityList[CityList["Ulm"] = 61] = "Ulm";
    CityList[CityList["Heilbronn"] = 62] = "Heilbronn";
    CityList[CityList["Pforzheim"] = 63] = "Pforzheim";
    CityList[CityList["G\u00F6ttingen"] = 64] = "G\u00F6ttingen";
    CityList[CityList["Bottrop"] = 65] = "Bottrop";
    CityList[CityList["Trier"] = 66] = "Trier";
    CityList[CityList["Recklinghausen"] = 67] = "Recklinghausen";
    CityList[CityList["Reutlingen"] = 68] = "Reutlingen";
    CityList[CityList["Bremerhaven"] = 69] = "Bremerhaven";
    CityList[CityList["Koblenz"] = 70] = "Koblenz";
    CityList[CityList["Bergisch Gladbach"] = 71] = "Bergisch Gladbach";
    CityList[CityList["Jena"] = 72] = "Jena";
    CityList[CityList["Remscheid"] = 73] = "Remscheid";
    CityList[CityList["Erlangen"] = 74] = "Erlangen";
    CityList[CityList["Moers"] = 75] = "Moers";
    CityList[CityList["M\u00F6rs"] = 76] = "M\u00F6rs";
    CityList[CityList["Siegen"] = 77] = "Siegen";
    CityList[CityList["Hildesheim"] = 78] = "Hildesheim";
    CityList[CityList["Salzgitter"] = 79] = "Salzgitter";
    CityList[CityList["Kaiserslautern"] = 80] = "Kaiserslautern";
})(CityList || (CityList = {}));
;
;
;
//--------------------------------------------------------------------
exports.cityList = [
    // "Berlin",
    "Hamburg",
    "München",
    // "Köln",
    // "Frankfurt am Main",
    // "Stuttgart",
    // "Düsseldorf",
    // "Dortmund",
    // "Essen",
    // "Leipzig",
    // "Bremen",
    // "Dresden",
    // "Hannover",
    // "Nürnberg",
    // "Duisburg",
    // "Bochum",
    // "Wuppertal",
    // "Bielefeld",
    // "Bonn",
    // "Münster",
    // "Karlsruhe",
    // "Mannheim",
    // "Augsburg",
    // "Wiesbaden",
    // "Gelsenkirchen",
    // "Mönchengladbach",
    // "Braunschweig",
    // "Chemnitz",
    // "Kiel",
    // "Aachen",
    // "Halle",
    // "Magdeburg",
    // "Freiburg im Breisgau",
    // "Krefeld",
    // "Lübeck",
    // "Oberhausen",
    // "Erfurt",
    // "Mainz",
    // "Rostock",
    // "Kassel",
    // "Hagen",
    // "Hamm",
    // "Saarbrücken",
    // "Mülheim an der Ruhr",
    // "Potsdam",
    // "Ludwigshafen am Rhein",
    // "Oldenburg",
    // "Leverkusen",
    // "Osnabrück",
    // "Solingen",
    // "Heidelberg",
    // "Herne",
    // "Neuss",
    // "Darmstadt",
    // "Paderborn",
    // "Regensburg",
    // "Ingolstadt",
    // "Würzburg",
    // "Fürth",
    // "Wolfsburg",
    // "Offenbach",
    // "Ulm",
    // "Heilbronn",
    // "Pforzheim",
    // "Göttingen",
    // "Bottrop",
    // "Trier",
    // "Recklinghausen",
    // "Reutlingen",
    // "Bremerhaven",
    // "Koblenz",
    // "Bergisch Gladbach",
    // "Jena",
    // "Remscheid",
    // "Erlangen",
    // "Moers",
    // "Mörs",
    // "Siegen",
    // "Hildesheim",
    // "Salzgitter",
    "Kaiserslautern",
];
exports.dbCitysList = {
    citysList: exports.cityList,
};
exports.dbRequestCall = {
    requestCall: [],
};
// type numbers = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
// type phoneNumber = `${numbers}${numbers}${numbers}${numbers}`;
// const i: phoneNumber = '012345678901';
// type Char = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'
// type String3 = `${Char}${Char}${Char}`
// const a: String3 = 'aa'    // error
// const b: String3 = 'bbbbb' // error
// const c: String3 = 'ccc'   // OK
// const d: String3 = 'abc'   // OK
