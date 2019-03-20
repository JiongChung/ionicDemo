import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Http, Response } from '@angular/http';

/*
  Generated class for the CommonserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonserviceProvider {
    public baseUrl: string = '';
    public setTimer: any = null;
    constructor(
        private http: Http
    ) {
        this.baseUrl = 'http://192.168.2.110';
    }

    formatDateTime() {
        var date = new Date();
		var month = date.getMonth() + 1;
        var datetime = date.getFullYear()
            + ""
            + (month >= 10 ? month : "0"+ month)
            + ""
            + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
            + ""
            + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours())
            + ""
            + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
            + ""
            + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());

        return datetime;
    }

    email(email: string){
        let myreg = /^[\w-']+(\.[\w-']+)*@([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*?\.[a-zA-Z]{2,8}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
        return myreg.test(email.replace(/(^\s*)|(\s*$)/g, ""));
    }


    phone(control: FormControl): any {
        let myReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
        let valid = myReg.test(control.value);
        return valid ? null : {phone : true};//如果valid是true 返回是null
    }

    stringPhone(phone){
        let myReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
        return myReg.test(phone);
    }

    /**校验密码 8-20位包含字母与数字的值 **/
    passWord(control: FormControl): any {
        var myreg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,20}$/;
        let valid = myreg.test(control.value);
        return valid ? null : {passWord : true};
    }

    fetchLocalStorage(name){
        return window.localStorage.getItem(name);
    }

    saveLocalStorage(name, items){
        window.localStorage.setItem(name, items);
    }

    removeLocalStorage(name){
        window.localStorage.removeItem(name);
    }

    empty(str){
        if(str == undefined || str == null || str == ''){
            return true;
        }else{
            return false;
        }
    }

    checkLogin(){
        let user = JSON.parse(this.getCookie('user'));
        return this.empty(user);
    }

    header(){
        let user = JSON.parse(this.getCookie('user'));
        let header = {};
        if(!this.empty(user)){
            var token = user.accessToken;
            if(!this.empty(token)){
                header = {
                    'Authorization':'Bearer ' + token,
                    "accept" : 'text/plain',
                    'Content-Type': 'application/json'
                };
            }
        }

        return header;
    }

    commonAjax(url,type,value,success,error){
        url = this.baseUrl  + url;
        
        let user = JSON.parse(this.getCookie('user'));

        let header = {};
        if(!this.empty(user)){
            var token = user.accessToken;
            if(!this.empty(token)){
                header = {
                    'Authorization':'Bearer ' + token,
                    "accept" : 'text/plain',
                    'Content-Type': 'application/json-patch+json'
                };
            }
        }

        if(type == 'post'){
            this.http.post(url, value, header).subscribe((res: Response) => {
                success(this,res.json());
            }, err => {
                error(err);
            });
        }
        if(type == 'get'){
            this.http.get(url).subscribe((res: Response) => {
                success(res.json());
            }, err => {
                error(err);
            });
        }
    }

    setCookie(name,value){ 
        let exp = new Date(); 
        exp.setTime(exp.getTime() + 24*60*60*1000); 
        document.cookie = name + "="+  (value) + ";expires=" + exp.toUTCString(); 
    }

    getCookie(name){ 
        let arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    
        if(arr = document.cookie.match(reg)){
            return (arr[2]); 
        }
        else{
            return null; 
        }    
    }

    delCookie(name){ 
        let exp = new Date(); 
        exp.setTime(exp.getTime() - 1); 
        let cval = this.getCookie(name); 
        if(cval != null){
            document.cookie = name + "=" + cval+";expires=" + exp.toUTCString(); 
        } 
    }

    getPhoneCodeNow(o, time, status, text, retext, type?){
        var that = this;
        if(type !== undefined && type === 'off'){
            clearTimeout(this.setTimer)
        }
        
        if(time === 0) {
            o.innerHTML = text;
            o.classList.remove('loading');
            time = 60;
            status = true;
        } else {
            status = false;
            o.classList.add('loading');
            o.innerHTML = retext + '(' + time + 's)';
            time--;
            this.setTimer = setTimeout(function() {
                that.getPhoneCodeNow(o,time,status,text,retext)
            }, 1000);
        }

        return status;
    }
}
