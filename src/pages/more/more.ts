import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AboutusPage } from '../aboutus/aboutus';
import { ContactusPage } from '../contactus/contactus';
import { FaqPage } from '../faq/faq';
import { SettingPage } from '../setting/setting';


/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {
    
    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MorePage');
    }

    openAboutus(){
        this.navCtrl.push(AboutusPage);
    }

    openContant(){
        this.navCtrl.push(ContactusPage);
    }

    openFaq(){
        this.navCtrl.push(FaqPage);
    }

    openSetting(){
        this.navCtrl.push(SettingPage);
    }
    
}
