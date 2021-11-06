import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  chats = [
    {
      fullName: 'John Meyers',
      profileURL: './assets/imgs/user1.png'
    },
    {
      fullName: 'Bongisa',
      profileURL: './assets/imgs/user-1.png'
    },
    {
      fullName: 'Dannie ',
      profileURL: './assets/imgs/user-1.png'
    },
    {
      fullName: 'Sammy ',
      profileURL: './assets/imgs/user-1.png'
    },
    {
      fullName: 'David',
      profileURL: './assets/imgs/user-1.png'
    },
    {
      fullName: 'Velie',
      profileURL: './assets/imgs/user-1.png'
    },
    {
      fullName: 'Jackie',
      profileURL: './assets/imgs/user-1.png'
    },
    {
      fullName: 'Zanele',
      profileURL: './assets/imgs/user-1.png'
    }
  ];

  constructor() { }

}
