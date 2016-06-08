/// <reference path="../references.ts" />
class DesignerController{
	_outputLocation: Element;

	// Defines the Value types. In the future it will be abstracted to support various types in different schemas.
	_valueTypes = [
		'int',
		'character',
		'boolean'
	];
	constructor(){
		this._outputLocation = document.getElementById('designer-output');
		this.addEventListeners();
	}

	addEventListeners(){
		document.getElementById('add-table').addEventListener('click', () => {
			this.addTable();
		});
	}

	addTable(){
		let div = document.createElement('div');
		div.className = "table";

		div.appendChild(this.createHeader());
		div.appendChild(this.createInput());
		div.appendChild(this.createSelect(this._valueTypes));


		div.appendChild(this.createOptionButtons(['delete', 'add column']));
		this._outputLocation.appendChild(div);	
	}

	// Creates the Table header.
	// Adds keyup listener to change the ID of the element to match the value
	createHeader(){
		let header = document.createElement('input');
		header.placeholder = "Table Name";
		header.id = "table-1";

		header.addEventListener('keyup', function(e) {
			this.id = "table-" + this.value;
		});

		return header;
	}

	createInput(){
		let input = document.createElement('input');
		input.className = "table";
		input.placeholder = "id";

		return input;
	}

	createSelect(array){
		let select = document.createElement('select');

		for (var i = 0; i < array.length; i++){
			let option = document.createElement('option');
			option.value = array[i];
			option.text = array[i];

			select.appendChild(option);
		}
		return select;
	}

	createOptionButtons(array){
		let buttonDiv = document.createElement('div');
		buttonDiv.className = "btnGroup";

		for(var i = 0; i < array.length; i++){
			let button = document.createElement('button');
			button.innerText = array[i] + "";
			button.addEventListener('click', () => {
				this.addEvent(array[i]);
			});
			buttonDiv.appendChild(button);
		}

		return buttonDiv;
	}


	addRow(){
		let column = document.createElement('div');
		column.className = "column";

		column.appendChild(this.createInput());
		
	}

	addEvent(type){
		console.log(type);
		switch (type) {
			case "delete":	
				alert("delete");
				break;
			
			case "add":
				this.addRow();
				break;
		}
	}
}

let designer = new DesignerController();
let sql = new SQLGenerator();
let canvasDrawer = new CanvasDrawer();
let uiController = new UIController();