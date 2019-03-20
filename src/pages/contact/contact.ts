import { Component } from '@angular/core';
import { NavController ,IonicPage, NavParams,ToastController} from 'ionic-angular';
import {WechatChenyu} from "wechat-chenyu";
import { CommonserviceProvider } from '../../providers/commonservice/commonservice';
import {HttpClient} from "@angular/common/http";

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

    constructor(
        public navParams: NavParams,
        public navCtrl: NavController,
        public toastCtrl: ToastController,
        private _Wechat: WechatChenyu,
        private Commonservice: CommonserviceProvider,
        private http: HttpClient
    ) {
        
    }


    showToast(position: string, msg: string) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: position
        });
        toast.present(toast);
    }

    pay(){
        let params = {
            shipTo: '钟广炯',
            phoneNumber: '13430386194',
            districtId: 11011,
            address: '古村2号',
            payMethod: 1,
            orderAmount: 0.01
        }

        let headers = this.Commonservice.header();
        let url = this.Commonservice.baseUrl + '/api/services/app/UserAsset/BuyGiftPackage';
        this.http.post(url, params , {headers}).subscribe((res: Response) => {
            this.payAgin(res);
        },error => {
            this.showToast('bottom',error.error.error.message);
        });
    }

    payAgin(res){
        console.log(res.result.weChat)
        let params = {
            partnerid:res.result.weChat.mchId,
            nonceStr:res.result.weChat.nonceStr,
            prepayid:res.result.weChat.apiKey,
            timeStamp:res.result.weChat.timeStamp,
            sign:res.result.weChat.sign
        }
        this._Wechat.sendPaymentRequest(params).then(data => {
            alert(data)
        }, error => {
            alert(error)
        });
             
    }

}
