import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonserviceProvider } from '../../providers/commonservice/commonservice';
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the QrcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
})
export class QrcodePage {
    public profile: any = {};
    public qrCodeValue: string = '';

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private Commonservice: CommonserviceProvider,
        public http: HttpClient
    ) {
        
    }

    ionViewDidLoad() {
        this.GetMyQRCode();
    }

    GetMyQRCode(){
        let headers = this.Commonservice.header();
        let url = this.Commonservice.baseUrl + '/api/services/app/MyProfile/GetMyQRCode';
        this.http.get(url, {headers}).subscribe(data => {
            if(data['success']){
                this.profile = data['result'];
                this.qrCodeValue = this.profile.qrCodeContent
            }
           console.log(data)
        });
    }
}
