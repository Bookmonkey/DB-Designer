/// <reference path="../references.ts" />
class DesignerController{
	constructor(){
		console.info("Hello World");
		this.addEventListeners();
	}

	addEventListeners(){
		document.getElementById('add-table').addEventListener('click', function() {
			this.addTable();
		});
	}

	addTable(){
		console.info("Add");
	}
}

let designer = new DesignerController();
let sql = new SQLGenerator();
let canvasDrawer = new CanvasDrawer();
let uiController = new UIController();