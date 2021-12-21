import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'instagram-clone';

  ngOnInit(): void {

    const firebaseConfig = {
      apiKey: "AIzaSyA1Wtko6N6-hOujFUqFVByuloR0xSZY77A",
      authDomain: "jta-instagram-clone-f882d.firebaseapp.com",
      databaseURL: "https://jta-instagram-clone-f882d-default-rtdb.firebaseio.com",
      projectId: "jta-instagram-clone-f882d-default-rtdb",
      storageBucket: "jta-instagram-clone-f882d.appspot.com",
      messagingSenderId: "441802074952",
      appId: "1:441802074952:web:ec5fe9e08b6bc5988d617d",
      measurementId: "G-YPJVE8SZ2R"
    };

    firebase.initializeApp(firebaseConfig)
  }
}
