import { Injectable, NgZone } from '@angular/core';
import { UtilsProviderService } from '../services/utils-provider.service';
import { Subject } from 'rxjs';
import firebase from 'firebase';
import { iUser } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class DataHelperService {

  fooSubject = new Subject<any>();
  allUsers: any = {};
  allEvents = [
    {
      offerTitle: 'Basic Grammar',
      offerDescription: 'This is a lecture on basic English grammar',
      offerAmount: 45,
      date: '11-02-2021',
      startTime: '04 pm',
      endTime: '05 pm',
    },
    {
      offerTitle: 'English Tenses',
      offerDescription: 'This is lesson will help you understand the tenses in English',
      offerAmount: 40,
      date: '11-02-2021',
      startTime: '02 pm',
      endTime: '05 pm',
      status: 'completed'
    },
    {
      offerTitle: 'Maths Algebra',
      offerDescription: 'This offering deal with Algebra',
      offerAmount: 40,
      date: '11-04-2021',
      startTime: '02 pm',
      endTime: '05 pm',
      status: 'rated',
      rating: 4
    },
    {
      offerTitle: 'Science Class',
      offerDescription: 'This the basic introduction to science and its main concepts',
      offerAmount: 35,
      date: '11-06-2021',
      startTime: '02 pm',
      endTime: '05 pm',
      status: 'cancelled',
    }
  ];

  appContent = {
    aboutUs: {
      pageTitle: 'About Us',
      content: ''
    },
    privacyPolicy: {
      pageTitle: 'Privacy Policy',
      content: ''
    },
    termsConditions: {
      pageTitle: 'Terms and Conditions',
      content: ''
    },
    contactUs: {
      pageTitle: 'Contact Us',
      content: ''
    },
  };

  constructor(
    public zone: NgZone,
    public utils: UtilsProviderService,
  ) {
    if (localStorage.getItem('userLoggedIn')) {
      this.fetchAllData();
    }
  }

  fetchAllData() {
    this.getAllUsers();
    this.getDynamicContent();
  }

  getAllUsers() {
    const self = this;
    firebase.database().ref().child('users')
      .once('value', (snapshot) => {
        self.allUsers = snapshot.val();
        self.getCurrentUser();
      });
  }

  getDynamicContent() {
    const self = this;
    firebase.database().ref().child('settings')
      .once('value', (snapshot) => {
        const data = snapshot.val();
        for (const key in data) {
          self.appContent[key].content = data[key];
        }
      });
  }

  getCurrentUser() {
    const uid = localStorage.getItem('uid');
    firebase.database().ref().child(`/users/${uid}`)
      .on('value', (snapshot) => {
        const currentUser: iUser = snapshot.val();
        this.allUsers[uid] = currentUser;
        localStorage.setItem('user', JSON.stringify(currentUser));
        this.publishSomeData({ updateLocalUser: true });
      });
  }

  public deepCloneData(data: any): any {
    if (data) {
      return JSON.parse(JSON.stringify(data));
    }
  }

  public publishSomeData(data: any) {
    this.fooSubject.next(data);
  }

  public getObservable(): Subject<any> {
    return this.fooSubject;
  }

}
