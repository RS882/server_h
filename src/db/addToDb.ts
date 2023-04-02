
import { db } from './db';

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

export const addCityToSql = (cityArr = CityList, activeCity = activeCityCount) => {
	cityArr.forEach(async (e, i) => {
		await db.query(`INSERT INTO city(city_name, is_aktive) VALUES('${e}', ${activeCity.includes(i)});`)
	})

};

