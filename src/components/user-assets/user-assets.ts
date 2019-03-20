import { Component, Input, OnInit, OnChanges } from '@angular/core';

/**
 * Generated class for the UserAssetsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'user-assets',
  templateUrl: 'user-assets.html'
})
export class UserAssetsComponent implements OnInit, OnChanges{
    @Input() data;
    public totalCommission: number = 0;
    public totalPoint: number = 0;
    public availablePoint: number = 0;
    public totalCoin: number = 0;
    public availableCoin: number = 0;
    constructor() {

    }

    ngOnInit() {
    }


    ngOnChanges(){
        if(JSON.stringify(this.data) != '{}'){
            this.totalCommission = this.data.result.totalCommission;
            this.totalPoint = this.data.result.totalPoint;
            this.availablePoint = this.data.result.availablePoint;
            this.totalCoin = this.data.result.totalCoin;
            this.availableCoin = this.data.result.availableCoin;
        }
    }
}
