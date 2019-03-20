import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';     
import { BrowserModule } from '@angular/platform-browser';

import { HomeOilpriceComponent } from './home-oilprice/home-oilprice';
import { HomeBannerComponent } from './home-banner/home-banner';
import { HomeRechargeComponent } from './home-recharge/home-recharge';
import { HomeProfileComponent } from './home-profile/home-profile';
import { FindMenuComponent } from './find-menu/find-menu';
import { UserProfileComponent } from './user-profile/user-profile';
import { UserAssetsComponent } from './user-assets/user-assets';


@NgModule({
	declarations: [
        HomeOilpriceComponent,
        HomeOilpriceComponent,
        HomeBannerComponent,
        HomeRechargeComponent,
        HomeProfileComponent,
        FindMenuComponent,
        UserProfileComponent,
        UserAssetsComponent
    ],
	imports: [
        BrowserModule,
        IonicModule
    ],
	exports: [
        HomeOilpriceComponent,
        HomeOilpriceComponent,
        HomeBannerComponent,
        HomeRechargeComponent,
        HomeProfileComponent,
        FindMenuComponent,
        UserProfileComponent,
        UserAssetsComponent
    ]
})
export class ComponentsModule {}
