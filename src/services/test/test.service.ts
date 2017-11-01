import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { Jsonp, Response } from '@angular/http';

@Injectable()
export class TestService {

    constructor(
        private jsonp: Jsonp,
    ) { }

    // 电台
    getHotRadio(): Observable<any> {
        return this.jsonp
            .get(`http://www.tingban.cn/webapi/labelinfo/get?id=63&format=json&callback=JSONP_CALLBACK`)
            .map((response: Response) => {
                return response.json();
            });
    }

    getFineRadio(): Observable<any> {
        return this.jsonp
            .get(`http://www.tingban.cn/webapi/resource/search?cid=1339&rtype=20000&sorttype=HOT_RANK_DESC&pagesize=30&pagenum=1&_=1509345583718&format=json&callback=JSONP_CALLBACK`)
            .map((response: Response) => {
                return response.json();
            });
    }

    getRadioDetail(id: number): Observable<any> {
        return this.jsonp
            .get(`http://www.tingban.cn/webapi/albumdetail/get?albumid=${id}&format=json&callback=JSONP_CALLBACK`)
            .map((response: Response) => {
                return response.json();
            });
    }

    getRadioAudioList(id: number, pagenum: number, pagesize: number): Observable<any> {
        return this.jsonp
            .get(`http://www.tingban.cn/webapi/audios/list?id=${id}&pagesize=${pagesize}&pagenum=${pagenum}&sorttype=1&format=json&callback=JSONP_CALLBACK`)
            .map((response: Response) => {
                return response.json();
            });
    }
}
