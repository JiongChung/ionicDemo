import { Component } from '@angular/core';

/**
 * Generated class for the HomeBannerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'home-banner',
  templateUrl: 'home-banner.html'
})
export class HomeBannerComponent {
    public pictrue: Array<string> = [];
    constructor() {
        this.pictrue.push('assets/imgs/banner/P1.jpg');
        this.pictrue.push('assets/imgs/banner/P2.jpg');
    }

}
