import { Component, Pipe ,PipeTransform } from '@angular/core';
import { Router } from '@angular/router';

import { ReturnSetInfoDataService } from './dashboard.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ ReturnSetInfoDataService ]
})

export class DashboardComponent{
  data = []; 
  indices = [];
  groupedData = [];
  selectedItem;

  constructor(private dataService: ReturnSetInfoDataService, private router: Router) {
    dataService.getSetInfoData().subscribe(res => {
      this.data = res;
      this.data.forEach(gropedItem => {
        let items = [];
        if (!gropedItem.name || !gropedItem.name.length) return;
      
        let firstLetter = gropedItem.name[0];
        let index = firstLetter;
        if (!this.groupedData[firstLetter]) {
          this.groupedData[firstLetter] = [];
          this.indices.push(firstLetter);
        }        
        this.groupedData[firstLetter].push(gropedItem);
      });      
    });        
  }
  
  gotoCalendar() {
    this.router.navigate(['/calendar']);
  }

  gotoFormBuilder() {
    this.router.navigate(['/form-builder']);
  }
  
  indexTo(event,index) {
    this.selectedItem = index;
    let element = document.getElementById('index'+index);
    let yPoint = element.offsetTop - 30;
    window.scrollTo(0,yPoint);
  }
  
}



