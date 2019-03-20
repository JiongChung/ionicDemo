import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController ,ViewController,Platform,Events,ToastController ,AlertController ,LoadingController } from 'ionic-angular';
import { CommonserviceProvider } from '../../providers/commonservice/commonservice';
import {HttpClient} from "@angular/common/http";
import { LoginPage } from '../login/login';
import { OilcardPage } from '../oilcard/oilcard';
import { QrcodePage } from '../qrcode/qrcode';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
    public mySetting: any = {};
    public avatar: string = ''
    public data: any = {};

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public modalCtrl: ModalController,
        public events: Events,
        private Commonservice: CommonserviceProvider,
        public alertCtrl: AlertController,
        public http: HttpClient,
        public toastCtrl: ToastController
    ) {
        this.avatar = 'assets/imgs/buddha_icon.png';
        if(this.Commonservice.checkLogin()){
            this.navCtrl.push(LoginPage);
        }
    }

    ionViewDidLoad() {
        this.GetMySetting();
        this.events.subscribe('editSettingSuccess',() => {
            this.GetMySetting();
        });
    }

    GetMySetting(){
        let headers = this.Commonservice.header();
        let url = this.Commonservice.baseUrl + '/api/services/app/MyProfile/GetMySetting';
        this.http.get(url, {headers}).subscribe(data => {
            this.mySetting = data['result'].mySetting;
            this.avatar = this.mySetting.profileLogo;
        });
    }

    openOilCard(){
        this.navCtrl.push(OilcardPage);
    }

    openQrcode(){
        this.navCtrl.push(QrcodePage);
    }

    logout(){
        const confirm = this.alertCtrl.create({
            title: '确认退出登录吗',
            message: '',
            buttons: [
                {
                    text: '取消',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: '确定',
                    handler: () => {
                        this.confirmLogout();
                    }
                }
            ]
        });
        confirm.present();
    }

    confirmLogout(){
        this.Commonservice.delCookie('user');
        this.showToast('bottom','成功退出');
        setTimeout(() => {
            location.reload();
        },1500);
    }

    showToast(position: string, msg: string) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: position
        });
        toast.present(toast);
    }

    openModal(title, text, type, name){
        this.data.name = name;
        this.data.type = type;
        this.data.title = title;
        this.data.keytext = text;
        let modal = this.modalCtrl.create(EditSetttingPage, this.data);
        modal.present();
    }
}


@Component({
    template: `
    <ion-header>
        <ion-toolbar>
            <ion-title>
                {{title}}
            </ion-title>
            <ion-buttons start>
                <button ion-button (click)="close()">
                    <span ion-text color="white" showWhen="ios">关闭</span>
                    <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
                </button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <form [formGroup]="myForm" novalidate (ngSubmit)="save(name)"  autocomplete="off">
            <ion-list class="formlist">
                <ion-item [hidden]="!isPwd">
                    <ion-input type="password" [(ngModel)]="newpassword" formControlName="newpassword" placeholder="请输入8-20位字母与数字组合的密码"></ion-input>
                </ion-item>
                <ion-item [hidden]="!isPwd">
                    <ion-input type="password" [(ngModel)]="confirmpassword" formControlName="confirmpassword" placeholder="请再输入一次新密码"></ion-input>
                </ion-item>
                <ion-item [hidden]="!isSetPhoneNow">
                    <ion-input type="number" [(ngModel)]="newPhone" formControlName="newPhone" placeholder="请输入新的手机号码"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input type="{{type}}" [(ngModel)]="keyword" formControlName="keyword" placeholder="{{keytext}}"></ion-input>
                </ion-item>
                <ion-label stacked [hidden]="!isPhone" class="getocde" (click)="getcode($event)">获取验证码</ion-label>
            </ion-list>
            <ion-grid>
                <ion-row>
                    <ion-col width-10>
                        <button ion-button type="submit" [disabled]="!myForm.valid" round block color="danger">确定</button>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </form>
    </ion-content>
    <style>
        .formlist{
            position: relative;
        }
        .getocde{
            position: absolute;
            bottom: 1rem;
            right: 1rem;
            height: 2rem;
            line-height: 2rem;
            color: blue;
            font-size:1.2rem;
            z-index: 10;
        }
    </style>
    `
})

export class EditSetttingPage {
    public myForm: FormGroup;
    public title: string = '';
    public keytext: string = '';
    public type: string = '';
    public name: string = '';
    public sendCodeStatus:boolean = true;
    public isPhone:boolean = false;
    public isPwd: boolean = false;
    public isSetPhoneNow: boolean = false;

    public keyword: string = '';
    public newpassword: string = '12';
    public confirmpassword: string = '12';
    public newPhone: string = '12';

    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController,
        public events: Events,
        public toastCtrl: ToastController,
        private fb: FormBuilder,
        private Commonservice: CommonserviceProvider,
        private http: HttpClient,
        public loadingCtrl: LoadingController
    ){
        this.createForm();
        this.name = params.get('name');
        this.type = params.get('type');
        this.title = params.get('title');
        this.keytext = params.get('keytext');
        if(this.name == 'phoneNumber'){
            this.isPhone = true;
        }else if(this.name == 'pwd'){
            this.isPhone = true;
            this.isPwd = true;
            this.newpassword = '';
            this.confirmpassword = '';
        }

    }

    createForm(obj?: object){
        this.myForm = this.fb.group({
            keyword: ['', [ Validators.required]],
            newpassword: ['', [Validators.required]],
            confirmpassword: ['', [Validators.required]],
            newPhone: ['', [Validators.required]]
        });   
    }

    close() {
        this.viewCtrl.dismiss();
    }

    showToast(position: string, msg: string) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: position
        });
        toast.present(toast);
    }

    getcode(e){
        if(!this.Commonservice.stringPhone(this.newPhone) && this.isSetPhoneNow == true){
            this.showToast('bottom','手机格式不对');
            return  false;
        }
        if(this.sendCodeStatus){
            this.sendPhoneCode(e.target);
        }else{
            let name = e.target.className.split(' ');
            if(name.indexOf('loading') == -1){
                this.sendCodeStatus = true;
                this.sendPhoneCode(e.target);
            }
        }
    }

    sendPhoneCode(obj){
        let status = this.Commonservice.getPhoneCodeNow(obj, 60 ,true,'获取验证码','重新发送');
        this.sendCodeStatus = status;

        this.getOldCode(obj);
    }

    getOldCode(obj){
        let headers = this.Commonservice.header();
        let url = this.Commonservice.baseUrl + '/api/services/app/SMS/SendSmsCode';
        let input = {};
        if(this.isSetPhoneNow == false){
            input = {
                phoneNumber:'',
                userId:JSON.parse(this.Commonservice.getCookie('user')).userId,
                type: 6
            };
        }else{
            input = {
                phoneNumber: this.keyword,
                userId:'',
                type: 7
            };
        }
        if(this.isPwd == true){
            input = {
                phoneNumber:'',
                userId:JSON.parse(this.Commonservice.getCookie('user')).userId,
                type: 5
            }
        }
        this.http.post(url, input, {headers}).subscribe((res: Response) => {
            this.Commonservice.getPhoneCodeNow(obj, 0 ,true,'获取验证码','重新发送', 'off');
        },error => {
            this.showToast('bottom',error.error.error.message);
        });
    }

    save(name){
        let headers = this.Commonservice.header();
        let url = this.Commonservice.baseUrl + '/api/services/app/MyProfile/UpdateMySetting';
        if(name == 'emailAddress'){
            if(!this.Commonservice.email(this.keyword)){
                this.showToast('bottom','邮箱格式不对');
                return false;
            }
        }
        if(name == 'pwd'){
            if(this.newpassword != this.confirmpassword){
                this.showToast('bottom','两次密码输入不正确');
                return false;
            }
        }
        const loader = this.loadingCtrl.create({
            content: "加载中...",
            dismissOnPageChange: true
        });
        loader.present();
        
        if(name == 'nickName'){
            let input = {
                nickName: this.keyword
            }
            this.http.put(url, input, {headers}).subscribe((res: Response) => {
                loader.dismiss();
                this.bindSave();
            },error => {
                this.showToast('bottom',error.error.error.message);
            });
        }else if(name == 'emailAddress'){
            let input = {
                emailAddress: this.keyword
            }
            this.http.put(url, input, {headers}).subscribe((res: Response) => {
                loader.dismiss();
                this.bindSave();
            },error => {
                this.showToast('bottom',error.error.error.message);
            });
        }else if(name == 'phoneNumber'){
            if(this.isSetPhoneNow == false){
                let input = {
                    phoneNumberCode: this.keyword
                }
                url = this.Commonservice.baseUrl + '/api/services/app/MyProfile/ValidateMyPhoneNumber';
                this.http.post(url, input, {headers}).subscribe((res: Response) => {
                    loader.dismiss();
                    this.isSetPhoneNow = true;
                    this.newPhone = '';
                    this.keyword = '';
                },error => {
                    this.showToast('bottom',error.error.error.message);
                });
            }else{
                let input = {
                    phoneNumber: this.newPhone,
                    phoneNumberCode: this.keyword
                }
                url = this.Commonservice.baseUrl + '/api/services/app/MyProfile/ChangePhoneNumber';
                this.http.post(url, input, {headers}).subscribe((res: Response) => {
                    loader.dismiss();
                    this.isSetPhoneNow = false;
                    this.newPhone = '12';
                    this.keyword = '';
                    this.bindSave();
                },error => {
                    this.showToast('bottom',error.error.error.message);
                });
            }
        }else if(name == 'pwd'){
            let input = {
                phoneNumberCode: this.keyword,
                password: this.newpassword,
                confirmPassword: this.confirmpassword
            }
            url = this.Commonservice.baseUrl + '/api/services/app/MyProfile/ChangePassword';
            this.http.post(url, input, {headers}).subscribe((res: Response) => {
                loader.dismiss();
                this.bindSave();
            },error => {
                this.showToast('bottom',error.error.error.message);
            });
        }
    }
    bindSave(){
        this.showToast('bottom','保存成功');
        this.close();
        this.events.publish('editSettingSuccess');
    }
}