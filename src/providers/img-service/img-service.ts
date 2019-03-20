import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActionSheetController, ToastController} from "ionic-angular";
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject }from'@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

/*
  Generated class for the ImgServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImgServiceProvider {
    // 调用相机时传入的参数
    public cameraOpt = {
        quality: 50,
        destinationType: 1, // Camera.DestinationType.FILE_URI,
        sourceType: 1, // Camera.PictureSourceType.CAMERA,
        encodingType: 0, // Camera.EncodingType.JPEG,
        mediaType: 0, // Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true
    };

    // 调用相册时传入的参数
    public imagePickerOpt = {
        maximumImagesCount: 1,//选择一张图片
        width: 800,
        height: 800,
        quality: 80
    };

    // 图片上传的的api
    public uploadApi:string;

    upload: any= {
        fileKey: 'upload',//接收图片时的key
        fileName: 'imageName.jpg',
        headers: {
            'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'//不加入 发生错误！！
        },
        params: {}, //需要额外上传的参数
        success: (data)=> { },//图片上传成功后的回调
        error: (err)=> { },//图片上传失败后的回调
        listen: ()=> { }//监听上传过程
    };

    constructor(
        public http: HttpClient,
        public actionSheetCtrl: ActionSheetController,
        public camera: Camera,
        public imagePicker: ImagePicker,
        public transfer: FileTransfer,
        public file: File,
        public fileTransfer: FileTransferObject,
        public toastCtrl: ToastController
    ) {
        console.log('Hello ImgServiceProvider Provider');
        this.fileTransfer = this.transfer.create();
    }

    showPicActionSheet() {
        this.useASComponent();
    }

    useASComponent(){
        let actionSheet= this.actionSheetCtrl.create({
            title: '请选择',
            buttons: 
            [
                {
                    text: '拍照',
                    handler: ()=> {
                        this.startCamera();
                    }
                },
                {
                    text: '从手机相册选择',
                    handler: ()=> {
                        this.openImgPicker();
                    }
                },
                {
                    text: '取消',
                    role: 'cancel',
                    handler: ()=> {
                    
                    }
                }
            ]
        });
        actionSheet.present();
    }

    startCamera() {
        this.camera.getPicture(this.cameraOpt).then((imageData)=> {
            this.uploadImg(imageData);
        }, (err)=>{
            this.showToast('bottom',err);//错误：无法使用拍照功能！
        });
    }

    showToast(position: string, msg: string) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: position
        });
        toast.present(toast);
    }

    openImgPicker() {
        let temp = '';
        
        this.imagePicker.getPictures(this.imagePickerOpt).then((results)=> {
            alert(results)
            for (var i=0; i < results.length; i++) {
                temp = results[i];
            }
            this.uploadImg(temp);
        
        }, (err)=> {
            this.showToast('bottom',err);//错误：无法使用拍照功能！
        });
    }

    private uploadImg(path:string) {
        if (!path) {
            return false;
        }
        
        let options:any;
        options = {
            fileKey: this.upload.fileKey,
            headers: this.upload.headers,
            params: this.upload.params
        };
        this.fileTransfer.upload(path,this.uploadApi, options).then((data)=> {
            if (this.upload.success) {
                this.upload.success(JSON.parse(data.response));
            }
        }, (err) => {
            if (this.upload.error) {
                this.upload.error(err);
            } else {
                this.showToast('bottom','错误：上传失败！');
            }
        });
    }

    stopUpload() {
        if (this.fileTransfer) {
            this.fileTransfer.abort();
        }
    }
}
