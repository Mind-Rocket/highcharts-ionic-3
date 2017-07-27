import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// import 'rxjs/add/operator/map';

@Injectable()
export class APIService {
    base: string = "https://api1.sleepshepherd.com/";
    constructor(private http: Http) {}

    getDataByToken(token) {
        let headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);

        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.base + 'sleeps/v2/loginB/', options).map(res => res.json());
    }

    login(email, password) {
        let data = `grant_type=password` + 
                    `&&client_id=lYQvouACK2A2PbDNj8SuquPwciBf2LSIz4hGGpAW` +
                    `&&client_secret=QkCjU8CYtYP3OdIIhmBkyyEpahPb4EKYYkahrVUnvZ6CKhbg86EBHl3jjCLtGKT9hLU1F06D6Queu8DNiJyuH1lQhXrFQSxO1mODJ3F5Vp4qpV63sjxq1xoqb6aRkNcH` +
                    `&&username=${email}` +
                    `&&password=${password}`;

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', "Basic c3NfYXV0aF9hcHBfdjEuMDoxMjM0NQ==");

        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.base + 'o/token/', data, options)
            .map((response: Response) => response.json())
            .flatMap( data => {
                return this.getDataByToken(data.access_token);
            })
            .catch((error:any) => Observable.throw(error.json() || 'Server error'));
    }

    signup(email, password){
        let data = {
            username: email,
            password
        }

        let headers = new Headers();
        headers.append('Authorization', "Basic c3NfYXV0aF9hcHBfdjEuMDoxMjM0NQ==");

        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.base + "register/", data, options)
            .map(res => res.json())
            .catch( (error:any) => Observable.throw(error.json() || 'Server error'))
    }
}