


export type CitysList = string[];

export interface ICitysList {
	citysList: CitysList
};


export interface IRequestCall {
	id: number;
	userName: string;
	phoneNumber: string;
};



export interface IdbRequestCall {
	requestCall: IRequestCall[];
};


//--------------------------------------------------------------------




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