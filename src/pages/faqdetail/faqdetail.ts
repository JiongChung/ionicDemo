import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FaqdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-faqdetail',
  templateUrl: 'faqdetail.html',
})
export class FaqdetailPage {
    public title: string = '';
    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        this.title = this.navParams.get('name');
        for(let i=1; i<4; i++){
            if(this.navParams.get('id') == i){
                document.getElementById('content_'+i).style.display = 'block';
            }else{
                document.getElementById('content_'+i).style.display = 'none';
            }
        }
        
    }

}
