import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  userForm!:FormGroup
  students:any[] = []

  constructor(private fb:FormBuilder, private service:ServicesService, private router:Router, private toaster:ToastrService){

  }

  ngOnInit(): void {
    this.creatForm()
    this.getstudent()
    this.students = []
  }

  creatForm(){
    this.userForm = this.fb.group({
      username:["",[Validators.required]],
      email:["",[Validators.required, Validators.email]],
      password:["",[Validators.required]],
      confirmPassword:["",[Validators.required]],
    })
  }

  getstudent(){
    this.service.getusers("student").subscribe((res:any)=>{
      this.students = res
      // console.log(this.students)
    })
  }

  submit(){
    let model = {
      username:this.userForm.value.username,
      email:this.userForm.value.email,
      password:this.userForm.value.password,
    }

    let index = this.students.findIndex(item => item.email === this.userForm.value.email)
    // console.log(index)
    // console.log(this.userForm.value.email)
    if(this.userForm.valid){
      if(index === -1){ // email not found
        this.toaster.success("تم التسجيل بنجاح","",{
          disableTimeOut: false,
          titleClass: "toaster_title",
          messageClass: "toaster_message",
          timeOut: 4000,
          closeButton: true
        })
        // this.updateLoginData()
        this.service.createUser(model).subscribe(res=>{
          // alert("success")
          this.router.navigate(["/login"])
        })
      }else{
        this.toaster.error("هذا الإميل موجود مسبقا","",{
          disableTimeOut: false,
          titleClass: "toaster_title",
          messageClass: "toaster_message",
          timeOut: 4000,
          closeButton: true
        })
      }
    }else{
      alert("error")
    }
  }

  // updateLoginData(){
  //   let model = {
  //     user: this.userForm.value.username,
  //     role: "student"
  //   }
  //   this.service.updateLogin(model).subscribe((res:any)=>{
  //     this.service.user.next(res)  // update userName
  //     // console.log("update Successful")
  //   })
  // }

}
