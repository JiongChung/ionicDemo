import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonserviceProvider } from '../../providers/commonservice/commonservice';
import { LoginPage } from '../login/login';
import {HttpClient} from "@angular/common/http";
import { FansPage } from '../fans/fans';
import { ChargerecordPage } from '../chargerecord/chargerecord';
import { Events } from 'ionic-angular';
import { AreaPage } from '../area/area';
import { BankcardPage } from '../bankcard/bankcard';
import { OilcardPage } from '../oilcard/oilcard';
import { MorePage } from '../more/more';


/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
    public data:any = {};
    public usertoolsmenuone: Array<UserToolsMenu>;
    public usertoolsmenutwo: Array<UserToolsMenu>;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private Commonservice: CommonserviceProvider,
        private http: HttpClient,
        public events: Events
    ) {
        this.login();
        this.usertoolsmenuone = [
            new UserToolsMenu(1,'assets/imgs/iccard_icon.png','我的油卡'),
            new UserToolsMenu(2,'assets/imgs/chongzhijilu_icon.png','充值记录'),
            new UserToolsMenu(3,'assets/imgs/fans_icon.png','我的油粉')
        ];
        this.usertoolsmenutwo = [
            new UserToolsMenu(4,'assets/imgs/area_icon.png','我的区域'),
            new UserToolsMenu(5,'assets/imgs/yinhanka_icon.png','我的银行卡'),
            new UserToolsMenu(6,'assets/imgs/more_1_icon.png','更多')
        ];
    }

    ionViewDidLoad() {
        this.events.subscribe('reloadPage',() => {
            this.GetMyProfile();
        });
    }

    login(){
        if(this.Commonservice.checkLogin()){
            this.navCtrl.push(LoginPage);
        }else{
            this.GetMyProfile();
        }
    }

    GetMyProfile(){
        let headers = this.Commonservice.header();
        let url = this.Commonservice.baseUrl + '/api/services/app/MyProfile/GetMyProfile';
        this.http.get(url, {headers}).subscribe(data => {
            this.data = data;
        });
    }

    openMenu(id){
        if(id == 1){
            this.navCtrl.push(OilcardPage);
        }else if(id == 2){
            this.navCtrl.push(ChargerecordPage);
        }else if(id == 3){
            this.navCtrl.push(FansPage);
        }else if(id == 4){
            this.navCtrl.push(AreaPage);
        }else if(id == 5){
            this.navCtrl.push(BankcardPage);
        }else if(id == 6){
            this.navCtrl.push(MorePage);
        }
        
    }
}

export class UserToolsMenu {
    constructor(
        public id: number,
        public img: string,
        public name: string
    ){}
}