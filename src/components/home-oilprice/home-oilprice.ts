import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { CommonserviceProvider } from '../../providers/commonservice/commonservice';
import { NavController } from 'ionic-angular';


/**
 * Generated class for the HomeOilpriceComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'home-oilprice',
  templateUrl: 'home-oilprice.html'
})
export class HomeOilpriceComponent {
    public oilData: Array<any>;
    public Oil95: string = '';
    public Oil92: string = '';
    public Oil90: string = '';
    constructor(public navCtrl: NavController,private http: Http,private Commonservice : CommonserviceProvider) {
        this.getData();
    }
    getData(){
        let url = 'http://route.showapi.com/138-46?showapi_sign=5a28f7d50c0742a7b0db52dc273867e8&showapi_appid=72181&showapi_timestamp='+this.Commonservice.formatDateTime();

        this.http.get(url).subscribe((res : Response) => {
            this.oilData = res.json().showapi_res_body.list;

            for(let i=0; i<this.oilData.length; i++){
                if(this.oilData[i].prov == '广东'){
                    this.Oil95 = this.oilData[i].p95;
                    this.Oil92 = this.oilData[i].p92;
                    this.Oil90 = this.oilData[i].p0;
                }
            }
        });
    }
    

}
