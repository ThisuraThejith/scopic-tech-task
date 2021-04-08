import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Scopic Test Task';
  data: any;

  constructor() {
    this.data = {};
    this.data.selectedCheckboxes = [];
  }

  process(val) {
    this.data.ParentChildchecklist = JSON.parse(val);
  }

  parentCheck(parentObj) {
    if (typeof parentObj.children === 'object' && parentObj.name) {
      for (var i = 0; i < parentObj.children.length; i++) {
        parentObj.children[i].isSelected = parentObj.isSelected;
        if (typeof parentObj.children[i].children === 'object' && parentObj.children[i].name) {
          this.parentCheck(parentObj.children[i]);
        }
      }
    }
    this.data.selectedCheckboxes = this.recurseArray(this.data.ParentChildchecklist);
  }

  //Click event on child checkbox
  childCheck(parentObj, childObj) {
    let oneChildSelected = false;
    for (let child of childObj) {
      if (child.isSelected) {
        oneChildSelected = true;
      }
    }
    parentObj.isSelected = oneChildSelected;
    this.data.selectedCheckboxes = this.recurseArray(this.data.ParentChildchecklist);
  }

  //Expand/Collapse event on each parent
  expandCollapse(obj){
    obj.isClosed = !obj.isClosed;
  }

  //Just to show updated JSON object on view
  stringify(obj) {
    return JSON.stringify(obj);
  }

  recurseArray(array) {
    let selected = [];
    for (let arr of array) {
      if (arr.children) {
        let arrChild = this.recurseArray(arr.children);
        if (arr.children.length != arrChild.length) {
          selected = selected.concat(arrChild);
        }
        if(arr.isSelected) {
          selected.push(arr.name);
        }
      } else {
        if(arr.isSelected) {
          selected.push(arr.name);
        }
      }
    }
    return selected;
  }
}
