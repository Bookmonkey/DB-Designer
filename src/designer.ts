/// <reference path="../references.ts" />
class DesignerController{
	_outputLocation: Element;

	tableCount: any;
	tableNames: any[];

	// Defines the Value types. In the future it will be abstracted to support various types in different schemas.
	_valueTypes = [
		'int',
		'character',
		'boolean'
	];
	constructor(){
		this._outputLocation = document.getElementById('designer-output');
		this.addEventListeners();
		this.tableNames = [];
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

		table.appendChild(this.createJoinElement());

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
		header.setAttribute('index', id);

		this.tableNames.push({
			id: id,
			name: '',
		});

		// on the keyup event override the id for both the header and the outer div to match
		header.addEventListener('keyup', (e) => {
			console.log(document.getElementById(`table-${header.id}`));

			document.getElementById(`table-${header.id}`).id = `table-${header.value}`;
			header.id = header.value;

			this.tableNames.map((value) => {
				if(parseInt(value.id) === parseInt(header.getAttribute('index'))){
					value.name = header.value;
				}
			});
		});
		header.addEventListener('focusout', (e) => {
			this.scanForTables();
		});

		return header;
	}

	createInput(){
		let input = document.createElement('input');
		input.className = "column-name";
		input.placeholder = "column name";

		return input;
	}

	createSelect(array, className){
		if(className === undefined){
			className = "column-type";
		}

		let select = document.createElement('select');
		select.className = className;

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


	createJoinElement(){
		let div = document.createElement('div');
		div.className = "row";

		var elements = this.tableNames.map((value) => {
			return value.name
		});
		console.log(elements);

		var label = document.createElement("label")
		label.innerHTML = "Join on:";
		div.appendChild(label);

		div.appendChild(this.createSelect(elements, 'join-element-dropdown'));

		return div;
	}

	// Gets all the dom elements 
	scanForTables(){
		let dropdowns = document.getElementsByClassName('join-element-dropdown');
		// console.log(dropdowns);
		// 
		for(var i = 0; i < dropdowns.length; i++){
			for(var s = 0; s <= dropdowns[i].options.length; s++){
				dropdowns[i].options[s] = null;
			}
		}

		var elements = this.tableNames.map((value) => {
			return value.name;
		});

		console.log(elements);
	

		for(var d = 0; d < dropdowns.length; d++){
			for (var e = 0; e < elements.length; e++){
				let option = document.createElement('option');
				option.value = elements[e];
				option.text = elements[e];

				dropdowns[d].appendChild(option);
			}
			
		}


		
	}
}

let designer = new DesignerController();
let uiController = new UIController();
designer.scanForTables();	