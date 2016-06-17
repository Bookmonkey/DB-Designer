/// <reference path="../references.ts" />
class SQLGenerator {
	constructor() {
		this.createSQLScript();
	}

	names: string[];


	createSQLScript = () => {
		var tables = document.getElementsByClassName('table');

		var createSQL = "";
		var sql = "";

		for (var i = 0; i < tables.length; i++){
			var name = this.getTableName(tables[i]);
			var columns = this.getRows(tables[i].getElementsByClassName('rows')[0].getElementsByClassName('row'));

			createSQL += `CREATE TABLE ${ name } ${columns}`;
		}

		document.getElementById('sql-output').innerText = createSQL;
	}

	getTableName = (table) => {
		return table.id.split('table-')[1];
	}

	getRows = (rows) => {
		var rowCount = rows.length;
		var columns = " ( \n";
		for (var rowIndex = 0; rowIndex < rowCount; rowIndex++){
			console.log(rows);

			var name = this.getColumnName(rows[rowIndex]);
			var type = this.getColumnType(rows[rowIndex]);

			columns += `${name} ${type},\n`;
		}
		columns += "); \n";
		return columns;
	}

	getColumnName = (row) => {
		return row.getElementsByClassName('column-name')[0].value;
	}

	getColumnType = (row) => {
		var type = row.getElementsByClassName('column-type')[0];
		return type.options[type.selectedIndex].text;
	}
}
