import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { Jsonp, Response } from '@angular/http';

@Injectable()
export class DuZheService {

    constructor(
        private jsonp: Jsonp,
    ) { }

    getNewArticleList(pagenum: number, pagesize: number): Observable<any> {
        return this.jsonp
            .get(`http://www.tingban.cn/webapi/audios/list?id=1100000036391&pagesize=${pagesize}&pagenum=${pagenum}&sorttype=1&format=json&callback=JSONP_CALLBACK`)
            .map((response: Response) => {
                return response.json();
            });
    }
}
