import { Component } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  public sideBarLinks: string [] = [
    'countries/by-capital',
    'countries/by-country',
    'countries/by-region'
  ];

  FormatSideBarLinks(value: string, startChar: string[]):string {
    const index = value.indexOf('/');
    value = index !== -1 ? value.slice(index + 1) : value;

    startChar.forEach(element => {
      value = value.replace(element, ' ');
    });
    return value;
  }
}
