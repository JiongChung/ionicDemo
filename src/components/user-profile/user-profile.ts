import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingPage } from '../../pages/setting/setting';

/**
 * Generated class for the UserProfileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'user-profile',
  templateUrl: 'user-profile.html'
})
export class UserProfileComponent implements OnInit, OnChanges{
    @Input() data;
    public avatar: string = '';
    public phone: string = '';
    public label: string = '';

    constructor(public navCtrl: NavController) {
        this.avatar = 'assets/imgs/buddha_icon.png';
    }

    ngOnInit() {
    }


    ngOnChanges(){
        if(JSON.stringify(this.data) != '{}'){
            this.phone = this.data.result.nickName;
            this.label = this.data.result.userGradeName;
            this.avatar = (this.data.result.logo != null) ? this.data.result.logo : 'assets/imgs/buddha_icon.png';
        }
    }

    openSetting(){
        this.navCtrl.push(SettingPage);
    }
}
