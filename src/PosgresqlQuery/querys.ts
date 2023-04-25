


export class SQLQuerys {
	table: string;

	constructor(table: string) {
		this.table = table;
	};
	foundDataByElement = (elem: string): string => `SELECT EXISTS (SELECT * FROM ${this.table} WHERE ${elem} = $1);`;
	selectDataByElement = (elem?: string): string => `SELECT * FROM ${this.table}${elem ? ` WHERE ${elem} = $1;` : ';'}`;
	updateDataByElement = (elem: string, termsElem: string, isReturning = false): string =>
		`UPDATE ${this.table} SET ${elem} = $1 WHERE ${termsElem} = $2${isReturning ? ' RETURNING *;' : ';'}`;
	addData = (elems: string[]): string => {
		const textElem: string = elems.join(', ');
		const textValues: string = elems.map((e, i) => `$${i + 1}`).join(', ');
		return `INSERT INTO ${this.table}(${textElem}) values (${textValues}) RETURNING *;`;
	};
	deleteData = (elem: string): string => `DELETE FROM ${this.table} WHERE ${elem} = $1 RETURNING *;`;
};












