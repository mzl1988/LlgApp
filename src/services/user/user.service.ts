import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { Http, Response } from '@angular/http';
import { User } from '../../models/';
import { APP_SERVE_URL } from "../../providers/Constants";

@Injectable()
export class UserService {

    constructor(
        private http: Http,
    ) { }

    authLogin(user: User): Observable<User> {
        return this.http
            .post(`${APP_SERVE_URL}/v1/auth/actions/login`, user)
            .timeout(10000)
            .map((response: Response) => {
                return response.json();
            });
    }

    getUser(): Observable<any> {
        return this.http
            .get(`${APP_SERVE_URL}/v1/auth/actions/getUser`)
            .map((response: Response) => {
                return response.json();
            });
    }
}
