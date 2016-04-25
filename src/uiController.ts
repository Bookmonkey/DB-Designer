/// <reference path="../references.ts" />
class UIController {
	_buttons: any[] = [3];
	_elements: any[] = [3];
	constructor() {		
		this._buttons[0] = document.getElementById('click-designer');
		this._buttons[1] = document.getElementById('click-code');
		this._buttons[2] = document.getElementById('click-canvas');

		this._elements[0] = document.getElementById('tab-designer');
		this._elements[1] = document.getElementById('tab-code');
		this._elements[2] = document.getElementById('tab-canvas');

		this.hideElements();
		this._elements[0].className = "shown";
		this.addEventListeners();
	}

	addEventListeners(){
		for (var i = 0; i < this._buttons.length; i++){
			this.addClickEventElement(i);
		}
	}

	addClickEventElement(index){
		this._buttons[index].addEventListener('click', () => {
			this.showElement(index);
		});
	}

	hideElements(){
		for (var i = 0; i < this._elements.length; i++){
			this._elements[i].className = "hidden";
		}
	}

	showElement(index: number){
		this.hideElements();
		this._elements[index].className = "shown";
	}
}