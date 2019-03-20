import { Component } from '@angular/core';

/**
 * Generated class for the HomeProfileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'home-profile',
  templateUrl: 'home-profile.html'
})
export class HomeProfileComponent {
    public toolslist: Array<ToolsList>;
    constructor() {
        this.toolslist = [
            new ToolsList('assets/imgs/card_support_icon.png','支付欧粤/中石油/中石化'),
            new ToolsList('assets/imgs/safety_icon.png','招商银行监管100%安全'),
            new ToolsList('assets/imgs/set_icon.png','多种加油套餐越加越省')
        ];
    }

}

export class ToolsList {
    constructor(
        public img: string,
        public name: string
    ){}
}