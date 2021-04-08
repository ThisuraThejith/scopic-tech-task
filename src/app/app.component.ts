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
    this.data.isAllSelected = false;
    this.data.isAllCollapsed = false;
  }

  process(val) {
    this.data.ParentChildchecklist = JSON.parse(val);
  }

  parentCheck(parentObj) {
    for (var i = 0; i < parentObj.children.length; i++) {
      parentObj.children[i].isSelected = parentObj.isSelected;
      if (typeof parentObj.children[i].children === 'object' && parentObj.children[i].name) {
        this.parentCheck(parentObj.children[i]);
      }
    }
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
  }

  //Expand/Collapse event on each parent
  expandCollapse(obj){
    obj.isClosed = !obj.isClosed;
  }

  //Just to show updated JSON object on view
  stringify(obj) {
    console.log(obj);
    return JSON.stringify(obj);
  }
}
