import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonserviceProvider } from '../../providers/commonservice/commonservice';
import {HttpClient} from "@angular/common/http";
import { ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the AreaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-area',
  templateUrl: 'area.html',
})
export class AreaPage {
    public data:any = {};
    public todayRecharge: number = 0;
    public monthlyTotalRecharge: number = 0;
    public todayCommission: number = 0;
    public monthlyTotalCommission: number = 0;
    public agentList: Array<any>;
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
        this.GetMyAgentArea();
    }

    GetMyAgentArea(obj?, more?: string){
        let params = 'MaxResultCount='+this.MaxResultCount+'&SkipCount='+this.SkipCount;
        let headers = this.Commonservice.header();
        let url = this.Commonservice.baseUrl + '/api/services/app/MyProfile/GetMyAgentArea?'+params;
        this.http.get(url, {headers}).subscribe(data => {
            this.todayRecharge = data['result'].todayRecharge;
            this.monthlyTotalRecharge = data['result'].monthlyTotalRecharge;
            this.monthlyTotalCommission = data['result'].monthlyTotalCommission;
            this.todayCommission = data['result'].todayCommission;
            this.agentList = data['result'].agentList.items;
            this.totalCount = data['result'].agentList.totalCount;
            this.frequency ++;
            this.SkipCount = this.MaxResultCount * this.frequency;
            if(obj != undefined){
                obj.complete();
                if(more == 'more'){
                    this.agentList.push.apply(this.agentList,data['result'].agentList.items);
                }else{
                    this.agentList = data['result'].agentList.items;
                }                
            }else{
                this.agentList = data['result'].agentList.items;
            }
        });
    }

    showToast(position: string, msg: string) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: position
        });
    
        toast.present(toast);
    }

    doRefresh(refresher) {
        this.SkipCount = 0;
        this.frequency = 0;
        this.showToastStatus = false;
        this.GetMyAgentArea(refresher);
    }

    doInfinite(infiniteScroll?) {
        if(this.SkipCount < this.totalCount){
            this.GetMyAgentArea(infiniteScroll, 'more');
        }else{
            infiniteScroll.complete();
            if(!this.showToastStatus){
                this.showToast('bottom','已加载所有数据了');
            }
            this.showToastStatus = true;
        }
    }

}
