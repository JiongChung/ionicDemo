import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonserviceProvider } from '../../providers/commonservice/commonservice';
import {HttpClient} from "@angular/common/http";
import { ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ChargerecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chargerecord',
  templateUrl: 'chargerecord.html',
})
export class ChargerecordPage {
    public data:any = {};
    public myAsset: any = {};
    public myAssetLogs: Array<any>;
    public MaxResultCount: number = 20;
    public SkipCount: number = 0;
    public totalCount: number = 0;
    public frequency: number = 0;
    public infinite: object;
    public showToastStatus: boolean = false;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private Commonservice: CommonserviceProvider,
        public http: HttpClient,
        public toastCtrl: ToastController
    ) {
        if(this.Commonservice.checkLogin()){
            this.navCtrl.push(LoginPage);
        }
    }

    ionViewDidLoad() {
        this.GetMyCash();
    }

    doRefresh(refresher) {
        this.SkipCount = 0;
        this.frequency = 0;
        this.showToastStatus = false;
        this.GetMyCash(refresher);
    }

    doInfinite(infiniteScroll?) {
        console.log(this.SkipCount)
        console.log(this.totalCount)
        if(this.SkipCount < this.totalCount){
            this.GetMyCash(infiniteScroll, 'more');
        }else{
            infiniteScroll.complete();
            if(!this.showToastStatus){
                this.showToast('bottom','已加载所有数据了');
            }
            this.showToastStatus = true;
        }
    }

    showToast(position: string, msg: string) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: position
        });
    
        toast.present(toast);
    }

    GetMyCash(obj?, more?: string){
        let params = 'MaxResultCount='+this.MaxResultCount+'&SkipCount='+this.SkipCount;
        let headers = this.Commonservice.header();
        let url = this.Commonservice.baseUrl + '/api/services/app/MyProfile/GetMyCash?'+params;
        this.http.get(url, {headers}).subscribe(data => {
            this.myAsset = data['result'].myAsset;
            this.totalCount = data['result'].myAssetLogs.totalCount;
            this.frequency ++;
            this.SkipCount = this.MaxResultCount * this.frequency;
            if(obj != undefined){
                obj.complete();
                if(more == 'more'){
                    this.myAssetLogs.push.apply(this.myAssetLogs,data['result'].myAssetLogs.items);
                }else{
                    this.myAssetLogs = data['result'].myAssetLogs.items;
                }                
            }else{
                this.myAssetLogs = data['result'].myAssetLogs.items;
            }
        });
    }

}
