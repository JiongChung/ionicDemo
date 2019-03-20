import { Component } from '@angular/core';

/**
 * Generated class for the HomeRechargeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'home-recharge',
  templateUrl: 'home-recharge.html'
})
export class HomeRechargeComponent {
    public rechargeList: Array<RechargeList>;
    constructor() {
       this.setList();
    }

    setList(){
        this.rechargeList = [
            new RechargeList(1,'assets/imgs/recharge_icon.png','即时充值','赠送5%消费补贴'),
            new RechargeList(2,'assets/imgs/Groupon_icon.png','团购充值','最低6.7折 等额到帐')
        ];
    }

    recharge(id){
        console.log(id)
    }
}

export class RechargeList {
    constructor(
        public id: number,
        public img: string,
        public title: string,
        public info: string
    ){}
}