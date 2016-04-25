/// <reference path="../references.ts" />
class UIController {
	_tabElements: any[];
	constructor() {
		this._tabElements.push(document.getElementById('designer'));
		this._tabElements.push(document.getElementById('code'));
		this._tabElements.push(document.getElementById('canvasDraw'));
		this.addEventListeners();
	}

	addEventListeners(){
		this._tabElements[0].addEventListener('click', function(){
			this.showTabElement(0);
		})

		for (var i = 0; i < this._tabElements.length; i++){
			this._tabElements[i].addEventListener('click', function() {
				this.showTabElement(i);
			});
		}
	}

	showTabElement(index: number){
		this.hideTabElements();
		this._tabElements[index].className = "shown";
	}

	hideTabElements(){
		for (var i = 0; i < this._tabElements.length; i++){
			this._tabElements[i].className = "hidden";
		}
	}
}