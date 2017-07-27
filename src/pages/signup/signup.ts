import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { APIService } from './../../services/api.service';
import { TabsPage } from './../tabs/tabs';
import { LoginPage } from './../login/login';

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage implements OnInit{
  signupForm;
  signingUp = false;
  signupError: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private api: APIService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  ngOnInit() {
    this.signupForm = new FormGroup ({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required)
    }, this.validatePasswordConfirmation.bind(this));
  }

  goToLogin() {
    this.navCtrl.setRoot(LoginPage);
  }

  signup() {
    console.log('sign up', this.signupForm);
    if (!this.signupForm.valid) return false;

    this.signingUp = true;
    let email = this.signupForm.value.email;
    let password = this.signupForm.value.password;

    this.api.signup(email, password).subscribe(data => {
      this.signingUp = false;
      console.log('signup data', data);
      this.navCtrl.setRoot(TabsPage);
    }, error => {
      console.log('signup error', error);
      this.signingUp = false;
      if (error.username.length){
        this.signupError = "An account with that email already exists"
      }else{
        this.signupError = "Sign up failed. Please try again."
      }
    });
    
  }

  validatePasswordConfirmation(g: FormGroup): any{
        return g.get('password').value === g.get('password2').value ? null : {'password_mismatch': true};
    }
}
