import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { APIService } from './../../services/api.service';
import { SignupPage } from './../signup/signup';
import { TabsPage } from './../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
  loginForm;
  loggingIn = false;
  loginError: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private api: APIService, private dataService: DataService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ngOnInit() {
    this.loginForm = new FormGroup ({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    console.log('loginForm', this.loginForm);
    if (!this.loginForm.valid) return false;

    this.loggingIn = true;
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;

    this.api.login(email,password).subscribe(data => {
      console.log('login data', data);
      this.dataService.processData = data.processData;
      this.dataService.profileData = data.profileData;
      this.dataService.trendData = data.trendData;
      this.dataService.sleepCount = data.sleepCount;
      this.navCtrl.setRoot(TabsPage);
    }, error => {
      console.log('login error', error);
      this.loggingIn = false;
      if (error.error_description === "Invalid credentials given."){
        this.loginError = "Invalid email or password";
      }else {
        this.loginError = "Login failed. Please try again";
      }
    });
    
  }

  goToSignUp() {
    this.navCtrl.setRoot(SignupPage);
  }

}
