import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController ,ViewController,Platform } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import { CommonserviceProvider } from '../../providers/commonservice/commonservice';
/**
 * Generated class for the BankcardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bankcard',
  templateUrl: 'bankcard.html',
})
export class BankcardPage {
    public bankcardlist: Array<any>;
    public bankCardStatus: boolean = false;
    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public modalCtrl: ModalController,
        private Commonservice: CommonserviceProvider,
        public events: Events,
        private http: HttpClient
    ) {
    }

    ionViewDidLoad() {
        this.GetAllBankCards();
        this.events.subscribe('addBankCardSuccess',() => {
            this.GetAllBankCards();
        });
    }

    GetAllBankCards(obj?, more?: string){
        let headers = this.Commonservice.header();
        let url = this.Commonservice.baseUrl + '/api/services/app/UserAssetDrawingMethod/GetAllBankCards';
        this.http.get(url, {headers}).subscribe(data => {
            this.bankcardlist = data['result'];
            if(this.bankcardlist.length > 0){
                this.bankCardStatus = true;
            }
            console.log(this.bankcardlist);
        });
    }

    openModal(){
        let modal = this.modalCtrl.create(ModalContentPage);
        modal.present();
    }
}

@Component({
    template: `
    <ion-header>
        <ion-toolbar>
            <ion-title>
                添加银行卡
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
        <h4 class="addcard-title">请准确输入银行卡开户支行，否则会导致提现失败。</h4>
        <form [formGroup]="myForm" novalidate (ngSubmit)="save(myForm.value)"  autocomplete="off">
            <ion-list>
                <ion-item>
                    <ion-input type="text" [formControl]="bankCardUserName" clearInput=true name="bankCardUserName" placeholder="请输入持卡人姓名"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input type="number" [formControl]="accountNo" clearInput=true name="accountNo" placeholder="请输入银行卡号"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input type="text" [formControl]="bankCardSubBranch" clearInput=true name="bankCardSubBranch" placeholder="请输入银行卡开户支行"></ion-input>
                </ion-item>
            </ion-list>
            <ion-grid>
                <ion-row>
                    <ion-col width-10>
                        <button ion-button type="submit" [disabled]="!myForm.valid" round block color="danger">立即绑定</button>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </form>
    </ion-content>
    <style>
        .addcard-title{
            font-size: 1.4rem;
            padding:0 1.5rem;
            color: #ee0000;
        }
        .list{
            margin-bottom:1rem;
        }
    </style>
    `
})
export class ModalContentPage {
    public myForm: FormGroup;
    public bankCardUserName:any = '';
    public accountNo:any = '';
    public bankCardSubBranch:any = '';

    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController,
        public events: Events,
        public toastCtrl: ToastController,
        private fb: FormBuilder,
        private Commonservice: CommonserviceProvider,
        private http: HttpClient
    ) {
        this.createForm();
    }

    createForm(){
        this.myForm = this.fb.group({
            bankCardUserName: ['', [ Validators.required]],
            accountNo: ['', [ Validators.required,Validators.minLength(10)]],
            bankCardSubBranch: ['', [ Validators.required]]
        });   

        this.bankCardUserName = this.myForm.controls['bankCardUserName'];
        this.accountNo = this.myForm.controls['accountNo'];
        this.bankCardSubBranch = this.myForm.controls['bankCardSubBranch'];
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

    save(value){
        let input = {
            bankCardUserName: value.bankCardUserName,
            accountNo: value.accountNo,
            bankCardSubBranch: value.bankCardSubBranch
        };
        let headers = this.Commonservice.header();
        let url = this.Commonservice.baseUrl + '/api/services/app/UserAssetDrawingMethod/CreateOrUpdateAssetDrawingMethod';
        this.http.post(url, input, {headers}).subscribe((res: Response) => {
            this.bindCard();
        },error => {
            this.showToast('bottom',error.error.error.message);
        });
    }

    bindCard(){
        this.showToast('bottom','绑定成功');
        this.close();
        this.events.publish('addBankCardSuccess');
    }
}