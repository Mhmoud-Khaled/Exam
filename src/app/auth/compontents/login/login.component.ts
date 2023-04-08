import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  userRole:string="student"  //default role
  userForm!:FormGroup
  loginData:any[] =[]
  @Output() username:any= new EventEmitter

  userNameValue:any=''

  constructor(private fb:FormBuilder, private service:ServicesService, private router:Router, private toaster: ToastrService){}

  ngOnInit(){
    this.creatform()
    this.getuserByRole(this.userRole)

  }

  creatform(){
    this.userForm = this.fb.group({
      type:[this.userRole],
      email: ["",[Validators.required, Validators.email]],
      password: ["",[Validators.required]]
    })
  }
  getuserByRole(role:string){
    this.service.getusers(role).subscribe((res:any)=>{
      this.loginData = res
      // console.log(this.loginData)
    })
  }


  role(event:any){
    this.userRole = event.target.value
    this.getuserByRole(this.userRole)
  }

  sendUserName(value:string){
    this.username.emit(value)
  }

  submit(){
    // console.log(this.userForm.value)
    let index = this.loginData.findIndex(item => item.email === this.userForm.value.email && item.password === this.userForm.value.password)
    if(index != -1){ // found
      if(this.userForm.value.type ==='student'){
        this.router.navigate(["/subject"])
      }else{
        this.router.navigate(["/subject"])
      }

      let model = {
        user: this.loginData[index].username,
        role: this.userRole,
        userID: this.loginData[index].id
      }
        this.service.updateLogin(model).subscribe(res=>{
          this.service.user.next(res)  // update userName
          this.userNameValue = res
          this.sendUserName(this.userNameValue)
          this.toaster.success("تم التسجيل بنجاح","",{
            disableTimeOut: false,
            titleClass: "toaster_title",
            messageClass: "toaster_message",
            timeOut: 4000,
            closeButton: true
          })
        })
    }else{ //not found
      this.toaster.error("الايميل او كلمه المرور غير صحيح","",{
        disableTimeOut: false,
        titleClass: "toaster_title",
        messageClass: "toaster_message",
        timeOut: 4000,
        closeButton: true
      })
    }
  }


}
