import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Country } from 'src/app/model/country.model';


const REGION_OPTIONS = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  regionOptions = REGION_OPTIONS;
  
  @Output()
  filter = new EventEmitter<string>();


  select(filter: string) {
    this.filter.emit(filter);
  }

}
