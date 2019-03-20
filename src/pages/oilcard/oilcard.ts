import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController ,ViewController,Platform,Events,ToastController ,AlertController } from 'ionic-angular';
import { CommonserviceProvider } from '../../providers/commonservice/commonservice';
import {HttpClient} from "@angular/common/http";
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ImgServiceProvider } from '../../providers/img-service/img-service';
import { Slides } from 'ionic-angular';

/**
 * Generated class for the OilcardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-oilcard',
  templateUrl: 'oilcard.html',
})
export class OilcardPage {
    public pictrue: Array<string> = [];
    public oilcardlist: Array<any> = [];
    public oilcardStatus: boolean = false;
    @ViewChild('slides') slides: Slides;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public modalCtrl: ModalController,
        private Commonservice: CommonserviceProvider,
        public events: Events,
        private http: HttpClient,
        public alertCtrl: AlertController,
        private ImgService: ImgServiceProvider
    ) {
        this.pictrue.push('assets/imgs/cnpc_card.png');
        this.pictrue.push('assets/imgs/sinopec_card.png');
        this.pictrue.push('assets/imgs/cned_card.png');
    }

    ionViewDidLoad() {
        this.GetCards();
        this.events.subscribe('addOilCardSuccess',() => {
            this.GetCards();
        });
    }

    removeCard(id){
        const confirm = this.alertCtrl.create({
            title: '确定要删除些油卡？',
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
                        this.DeleteCard(id)
                    }
                }
            ]
        });
        confirm.present();
    }

    DeleteCard(id){
        let headers = this.Commonservice.header();
        let url = this.Commonservice.baseUrl + '/api/services/app/OilCard/DeleteCard?OilCardNo='+id;
        this.http.delete(url, {headers}).subscribe(data => {
            if(this.oilcardlist.length>1){
                this.slides.slideTo(0);
            }
            this.GetCards();
        });
    }

    open(){
        this.ImgService.showPicActionSheet();
    }    

    openModal(){
        let modal = this.modalCtrl.create(AddoilcardPage);
        modal.present();
    }

    GetCards(obj?, more?: string){
        let headers = this.Commonservice.header();
        let url = this.Commonservice.baseUrl + '/api/services/app/OilCard/GetCards';
        this.http.get(url, {headers}).subscribe(data => {
            this.oilcardlist = [];
            if(data['result'].items.length > 0){
                this.oilcardStatus = true;
            }else{
                this.oilcardStatus = false;
            }
            for(let i=0; i<data['result'].items.length; i++){
                this.oilcardlist.push({
                    url: this.pictrue[data['result'].items[i].oilCardTypeId - 1],
                    oilCardNo: data['result'].items[i].oilCardNo
                })
            }
        });
    }
}

@Component({
    template: `
    <ion-header>
        <ion-toolbar>
            <ion-title>
                添加油卡
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
        <h4 class="addcard-title">
            <span>请添加“个人主卡”，并选择正确的油卡类型；</span>
            <span>请仔细核对加油卡号，以免充值错误造成不必要的损失。</span>
        </h4>
        <ion-select [(ngModel)]="cardType" interface="popover" class="type-select">
            <ion-option value="3">欧粤新能源</ion-option>
            <ion-option value="2">中国石化</ion-option>
            <ion-option value="1">中国石油</ion-option>
        </ion-select>
        <form [formGroup]="myForm" novalidate (ngSubmit)="save(myForm.value)"  autocomplete="off">
            <ion-list>
                <ion-item style="border:none">
                    <ion-input type="number" formControlName="phoneNumber" [(ngModel)]="phoneNumber" clearInput=true name="phoneNumber" placeholder="请输入您的手机号码"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input type="number" formControlName="oilCardNumber" clearInput=true name="oilCardNumber" placeholder="请输入您的加油卡号"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input type="number" formControlName="confirmOilCardNumber" clearInput=true name="confirmOilCardNumber" placeholder="请再次输入您的加油卡号"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input type="text" [readonly]="isVerification" [(ngModel)]="idcardNum" formControlName="idcardNum"  name="idcardNum" placeholder="请输入您的身份证号码"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input type="text" formControlName="username" [readonly]="isVerification" [(ngModel)]="username" name="username" placeholder="请输入您的姓名"></ion-input>
                </ion-item>
            </ion-list>
            <ion-grid>
                <ion-row>
                    <ion-col width-10>
                        <button ion-button type="submit" [disabled]="!myForm.valid" round block color="danger">立即添加</button>
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
            line-height: 1.5;
        }
        .addcard-title span + span{
            padding-top: 0.5rem;
            display:block;
        }
        .list{
            margin-bottom:1rem;
        }
        .type-select{
            border-top: 0.55px solid #c8c7cc;
            width: 100%;
            max-width: 100%;
            position: relative;
            min-height:4.4rem;
            line-height: 4.4rem;
            padding: 0 16px;
            font-size: 1.7rem;
        }
        .type-select:before{
            position: absolute;
            bottom: 0;
            left: 16px;
            right: 0;
            background: #c8c7cc;
            height:  0.55px;
            display: block;
            content: "";
            z-index:2;
        }
    </style>
    `
})

export class AddoilcardPage {
    public myForm: FormGroup;
    public cardType:any = '3';
    public phoneNumber:any = '';
    public oilCardNumber:any = '';
    public confirmOilCardNumber:any = '';
    public idcardNum:any = '';
    public username:any = '';
    public isVerification:boolean = false;

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
        this.GetIdentifiedInfo();
    }

    createForm(obj?: object){
        
        this.myForm = this.fb.group({
            phoneNumber: [null, [ Validators.required]],
            oilCardNumber: ['', [ Validators.required]],
            confirmOilCardNumber: ['', [ Validators.required]],
            idcardNum: ['',[ Validators.required]],
            username: ['',[ Validators.required]]
        });   

        this.phoneNumber = this.myForm.controls['phoneNumber'];
        this.oilCardNumber = this.myForm.controls['oilCardNumber'];
        this.confirmOilCardNumber = this.myForm.controls['confirmOilCardNumber'];
        this.idcardNum = this.myForm.controls['idcardNum'];
        this.username = this.myForm.controls['username'];
    }

    GetIdentifiedInfo(){
        let headers = this.Commonservice.header();
        let url = this.Commonservice.baseUrl + '/api/services/app/OilCard/GetIdentifiedInfo';
        this.http.get(url, {headers}).subscribe(data => {
            if(data['success']){
                if(!data['result'].identityNo || data['result'].identityNo != null){
                    this.isVerification = true;
                }
                this.idcardNum = data['result'].identityNo;
                this.username = data['result'].realName;
            }
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

    save(value){
        let status = false;
        this.phoneNumber = Number(this.phoneNumber);
        if(!this.Commonservice.stringPhone(this.phoneNumber)){
            status = true;
            this.showToast('bottom','手机号码格式不正确');
        }
        if(value.oilCardNumber != value.confirmOilCardNumber){
            status = true;
            this.showToast('bottom','两次加油卡卡号不一致');
        }
        if(status){
            return false;
        }
        if(this.isVerification){
            value.idcardNum = '';
        }
        let input = {
            userId:JSON.parse(this.Commonservice.getCookie('user')).userId,
            oilCardTypeId: parseInt(this.cardType),
            oilCardNo: value.oilCardNumber,
            confirmOilCardNo: value.confirmOilCardNumber,
            oilCardUserName: value.username,
            oilCardIdentityNo: value.idcardNum,
            oilCardMobilePhone: value.phoneNumber
        };
        let headers = this.Commonservice.header();
        let url = this.Commonservice.baseUrl + '/api/services/app/OilCard/AddCard';
        this.http.post(url, input, {headers}).subscribe((res: Response) => {
            this.bindCard();
        },error => {
            this.showToast('bottom',error.error.error.message);
        });
    }

    bindCard(){
        this.showToast('bottom','添加成功');
        this.close();
        this.events.publish('addOilCardSuccess');
    }
}