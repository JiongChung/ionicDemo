import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpModule} from "@angular/http";
import { HTTP } from '@ionic-native/http';
import {HttpClientModule} from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ComponentsModule } from '../components/components.module';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { NewsPage } from '../pages/news/news';
import { UserPage } from '../pages/user/user';
import { LoginPage } from '../pages/login/login';
import { FansPage } from '../pages/fans/fans';
import { ChargerecordPage } from '../pages/chargerecord/chargerecord';
import { AreaPage } from '../pages/area/area';
import { BankcardPage, ModalContentPage } from '../pages/bankcard/bankcard';
import { OilcardPage, AddoilcardPage } from '../pages/oilcard/oilcard';
import { MorePage } from '../pages/more/more';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { ContactusPage } from '../pages/contactus/contactus';
import { FaqPage } from '../pages/faq/faq';
import { FaqdetailPage } from '../pages/faqdetail/faqdetail';
import { SettingPage,EditSetttingPage } from '../pages/setting/setting';
import { QrcodePage } from '../pages/qrcode/qrcode';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CommonserviceProvider } from '../providers/commonservice/commonservice';
import {Geolocation} from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { ImgServiceProvider } from '../providers/img-service/img-service';
import { ImagePicker } from '@ionic-native/image-picker';
import { FileTransfer,  FileTransferObject }from'@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { QRCodeModule } from 'angular2-qrcode';
import {WechatChenyu} from "wechat-chenyu";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    NewsPage,
    UserPage,
    LoginPage,
    FansPage,
    ChargerecordPage,
    AreaPage,
    BankcardPage,
    ModalContentPage,
    OilcardPage,
    AddoilcardPage,
    MorePage,
    AboutusPage,
    ContactusPage,
    FaqdetailPage,
    FaqPage,
    SettingPage,
    QrcodePage,
    EditSetttingPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{
        tabsHideOnSubPages: 'true',
        backButtonText: ''
    },{
        links: []
    }),
    QRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    NewsPage,
    UserPage,
    LoginPage,
    FansPage,
    ChargerecordPage,
    AreaPage,
    BankcardPage,
    ModalContentPage,
    OilcardPage,
    AddoilcardPage,
    MorePage,
    AboutusPage,
    ContactusPage,
    FaqdetailPage,
    FaqPage,
    SettingPage,
    QrcodePage,
    EditSetttingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CommonserviceProvider,
    HTTP,
    Geolocation,
    Camera,
    ImgServiceProvider,
    ImagePicker,
    File,
    FileTransferObject,
    FileTransfer,
    WechatChenyu
  ]
})
export class AppModule {}
