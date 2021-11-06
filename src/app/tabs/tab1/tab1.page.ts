import {Component} from '@angular/core';
import {UserAuthService} from '../../services/user-auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  newOffers = [
    {
      student: {
        fullName: 'Sam Buhlali',
        city: 'Cape Town',
        country: 'South Africa',
        profileUrl: './assets/imgs/user-1.png'
      },
      offerTitle: 'Basic Grammar',
      offerDescription: 'Lorem ipsum sample description',
      offerAmount: 20,
      date: 'Nov 10, 2021',
      startTime: '04 pm',
      endTime: '05 pm',
    },
    {
      student: {
        fullName: 'Akho Mahlela',
        city: 'Cape Town',
        country: 'South Africa',
        profileUrl: './assets/imgs/user3.png'
      },
      offerTitle: 'English Tenses',
      offerDescription: 'An introduction to English tenses',
      offerAmount: 25,
      date: 'Nov 12, 2021',
      startTime: '02 pm',
      endTime: '05 pm',
    }
  ];

  constructor(
    public userAuth: UserAuthService
  ) {
  }

}
