import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/auth/services/services.service';
import { DoctorServicesService } from '../../services/doctor-services.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit{

  allUserTested:any[] = []

  subjects:any

  constructor(private doct:DoctorServicesService, private auth:ServicesService){}

  ngOnInit(): void {
    this.getSubjects()
  }

  getSubjects(){
    this.doct.getQuesions().subscribe((res:any)=>{
      this.subjects = res
      console.log('this.subjects')
      console.log(this.subjects)
    })
  }

  getUserTested(){
    for(let i = 0; i< this.subjects.length; i++){
      for(let j = 0; j < this.subjects[i].userTested; j++){

      }
    }
  }

}
