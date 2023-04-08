import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from 'src/app/auth/services/services.service';
import { DoctorServicesService } from '../../services/doctor-services.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit{

  allQuestions:any[]=[]
  loginUser:any
  userID:any
  constructor(private service:DoctorServicesService, private toster:ToastrService, private authServices:ServicesService, private router:Router){

  }


  ngOnInit(): void {
    this.getSubjectQuestion()
    this.getUserLogin()
  }

  getSubjectQuestion(){
    this.service.getQuesions().subscribe((res:any)=>{
      this.allQuestions = res
      // console.log(this.allQuestions)
    })
  }

  delete(id:number){
    this.service.deleteQuestions(id).subscribe(res=>{
      this.toster.success("تم حذف الماده بنجاح")
      this.getSubjectQuestion()
    })
  }

  getUserLogin(){
    this.authServices.getRole().subscribe((res:any)=>{
      this.loginUser = res
      this.userID = this.loginUser.userID
      // console.log(this.userID)
    })
  }

  getID(index:number){
    this.service.id = index
    // console.log(this.service.id)
  }

}
