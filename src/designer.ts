/// <reference path="../references.ts" />
class DesignerController{
	_outputLocation: Element;
	constructor(){
		console.info("Hello World");
		this._outputLocation = document.getElementById('designer-output');
		this.addEventListeners();
	}

	addEventListeners(){
		document.getElementById('add-table').addEventListener('click', () => {
			this.addTable();
		});
	}

	addTable(){
		console.info("Add");
		let div = document.createElement('div');
		div.innerHTML = "<p> Hello </p>";
		this._outputLocation.appendChild(div);	
	}
}

let designer = new DesignerController();
let sql = new SQLGenerator();
let canvasDrawer = new CanvasDrawer();
let uiController = new UIController();