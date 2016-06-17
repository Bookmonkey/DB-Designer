/// <reference path="../references.ts" />
class DesignerController{
	_outputLocation: Element;

	tableCount: any;

	// Defines the Value types. In the future it will be abstracted to support various types in different schemas.
	_valueTypes = [
		'int',
		'character',
		'boolean'
	];
	constructor(){
		this._outputLocation = document.getElementById('designer-output');
		this.addEventListeners();

		this.tableCount = 0;
	}

	addEventListeners(){
		document.getElementById('add-table').addEventListener('click', () => {
			this.addTable();
		});
	}

	addTable(){
		let table = document.createElement('div');
		table.className = "table";
		table.id = `table-${this.tableCount}`;

		table.appendChild(this.createHeader(this.tableCount));

		let div = document.createElement('div');
		div.className = "rows";
		table.appendChild(div);

		let add = document.createElement('button');
		add.className = "option";
		add.innerText = "Add Row";
		add.addEventListener('click', (e) => {
			this.addRow(table.id);
		});

		table.appendChild(add);

		this._outputLocation.appendChild(table);	

		this.tableCount++;


		document.getElementById('designer-info').innerHTML = `<p> Table Count: ${this.tableCount}</p>`;
	}

	// Creates the Table header.
	// Adds keyup listener to change the ID of the element to match the value
	createHeader(id){
		let header = document.createElement('input');
		header.placeholder = "Table Name";
		header.id = id;

		// on the keyup event override the id for both the header and the outer div to match
		header.addEventListener('keyup', function(e) {
			console.log(document.getElementById(`table-${this.id}`));

			document.getElementById(`table-${this.id}`).id = `table-${this.value}`;
			this.id = this.value;
		});

		return header;
	}

	createInput(){
		let input = document.createElement('input');
		input.className = "column-name";
		input.placeholder = "column name";

		return input;
	}

	createSelect(array){
		let select = document.createElement('select');
		select.className = "column-type";

		for (var i = 0; i < array.length; i++){
			let option = document.createElement('option');
			option.value = array[i];
			option.text = array[i];

			select.appendChild(option);
		}
		return select;
	}


	addRow(tableID){
		let div = document.createElement('div');
		div.className = "row";
		
		div.appendChild(this.createInput());
		div.appendChild(this.createSelect(this._valueTypes));
		document.getElementById(tableID).getElementsByClassName('rows')[0].appendChild(div);
	
	}
}

let designer = new DesignerController();
let uiController = new UIController();