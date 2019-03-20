import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FaqdetailPage } from '../faqdetail/faqdetail';

/**
 * Generated class for the FaqPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {
    public faqlist: Array<FaqList>;
    public data: any = {};

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        this.getData();
    }

    getData(){
        this.faqlist = [
            new FaqList(1,'关于充值'),
            new FaqList(2,'成为合伙人'),
            new FaqList(3,'关于用户优惠')
        ];
    }

    openFaq(id, name){
        this.data.id = id;
        this.data.name = name;
        this.navCtrl.push(FaqdetailPage,this.data);
    }

}

export class FaqList {
    constructor(
        public id: number,
        public name: string
    ){}
}