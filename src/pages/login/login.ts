import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CommonserviceProvider } from '../../providers/commonservice/commonservice';
import { Http, Response } from '@angular/http';
import { Events } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    public myForm: FormGroup;
    public phone:any = '';
    public password:any = '';

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public toastCtrl: ToastController,
        private fb: FormBuilder,
        private Commonservice: CommonserviceProvider,
        private http: Http,
        public events: Events

    ) {
        this.createForm();
    }

    ionViewDidLoad() {
        
    }

    createForm(){
        this.myForm = this.fb.group({
            phone: ['', [ Validators.required,this.Commonservice.phone]],
            password: ['', [ Validators.required,Validators.minLength(6), Validators.maxLength(20)]]
        });   

        this.phone = this.myForm.controls['phone'];
        this.password = this.myForm.controls['password'];
    }


    showToast(position: string, msg: string) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: position
        });
    
        toast.present(toast);
    }

    save(value){
        let input = {
            userNameOrEmailAddress: value.phone,
            password: value.password
        };
        let url = this.Commonservice.baseUrl + '/api/TokenAuth/Authenticate';
        this.http.post(url, input, this.Commonservice.header()).subscribe((res: Response) => {
            let result = res.json()
            if(result.success){
                this.showToast('bottom','登录成功');
                // this.Commonservice.saveLocalStorage('user',JSON.stringify(result.result));
                this.Commonservice.setCookie('user',JSON.stringify(result.result));
                setTimeout(() => {
                    this.navCtrl.pop().then(()=>{
                        this.events.publish('reloadPage');
                    });
                },1000);           
            }else{
                this.showToast('top','登录失败');
            }
        },error => {
            this.showToast('bottom',JSON.parse(error._body).error.message);
        });
    }

    
}
