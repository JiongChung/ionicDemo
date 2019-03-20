import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the FindMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'find-menu',
  templateUrl: 'find-menu.html'
})
export class FindMenuComponent {
    public menulist: Array<MenuList>;

    constructor(public toastCtrl: ToastController) {
        this.menulist = [
            new MenuList('assets/imgs/mall_icon.png','商城'),
            new MenuList('assets/imgs/viiolation_icon.png','违章查询'),
            new MenuList('assets/imgs/insurance_icon.png','特惠车险'),
        ];
    }

    showToast(position: string) {
        let toast = this.toastCtrl.create({
            message: '努力搭建中，敬请期待...',
            duration: 2000,
            position: position
        });
    
        toast.present(toast);
    }

}

export class MenuList {
    constructor(
        public img:string,
        public name:string
    ){}
}