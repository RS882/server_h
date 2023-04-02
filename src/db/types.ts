export type telNumber = string;
export interface ITelNumer {
	phoneNumber: telNumber;
};

export interface ICitysList {
	citysList: CitysList
};



enum CityList {
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
};
export type CityListType = keyof typeof CityList;

export type CitysList = CityListType[];

export interface IRequestCall {
	id: number;
	userName: string;
	phoneNumber: string;
};

export interface IdbRequestCall {
	requestCall: IRequestCall[];
};


//--------------------------------------------------------------------



export const cityList: CitysList = [
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
	"Kaiserslautern",]

export const dbCitysList: ICitysList = {
	citysList: cityList,
};

export const dbRequestCall: IdbRequestCall = {
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