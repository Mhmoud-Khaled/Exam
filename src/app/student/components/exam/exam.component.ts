import { NumberSymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from 'src/app/auth/services/services.service';
import { DoctorServicesService } from 'src/app/doctor/services/doctor-services.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit{

  role:any
  questions:any[] = []
  questionsNotModify:any[] = []
  subjectName:any
  id:number= 0
  showResult:boolean = false
  answers:any []=[]
  correctAnswer:number = 0
  totalQuestions:number = 0
  userID:any
  allUserTested:any[] = []
  tested:boolean = false
  userName:any
  // result:number = 0



  constructor(private authService:ServicesService, private doctorServices: DoctorServicesService, private toster:ToastrService){

  }

ngOnInit(): void {
  this.getQuestions()
  this.getRole()
}

getRole(){
  this.authService.getRole().subscribe((res:any)=>{
    this.role = res.role
    this.userID = res.userID
    this.userName = res.user
    console.log("this.userName")
    console.log(this.userName)
    if(this.allUserTested != undefined){

      for (let index = 0; index < this.allUserTested.length; index++) {
        if(this.allUserTested[index].userID === this.userID){
          this.tested = true
          this.correctAnswer = this.allUserTested[index].degree
          console.log("tested")
          break
        }
      }
    }
  })
}

getQuestions(){
  this.doctorServices.getSubjectById().subscribe((res:any)=>{
    this.questions = res.question
    this.questionsNotModify = res.question
    this.subjectName = res.subjectName
    this.id = res.id
    this.allUserTested = res.userTested
    console.log("this.allUserTested")
    console.log(this.allUserTested)
  })
}

delete(i:number){
  if(this.questionsNotModify.length>1){
    this.questionsNotModify.splice(i,1)
    let model ={
      subjectName:this.subjectName,
      question: this.questionsNotModify
    }
    this.doctorServices.updatequesions(model,this.id).subscribe((res:any)=>{
      this.toster.success("تم حذف السؤال بنجاح")
    })
  }else{
    this.doctorServices.deleteQuestions(this.id).subscribe((res:any)=>{
      this.toster.success("تم حذف المادة بالكامل")
    })
  }
}

  result(){
    this.showResult = true
    for (let index = 0; index < this.questions.length; index++) {
      if(this.questions[index].answer){
        this.correctAnswer = this.correctAnswer + 1
      }
    }
    this.totalQuestions = this.questions.length
    if(this.allUserTested != undefined){
      this.allUserTested.push({
        userID: this.userID,
        degree: this.correctAnswer,
        userName: this.userName
      })
    }else{
      this.allUserTested = [{
        userID: this.userID,
        degree: this.correctAnswer,
        userName: this.userName
      }]
    }

      this.updateTestedUser()
    // console.log(this.correctAnswer)
    // console.log(this.totalQuestions)
  }

  getAnswer(event:any){
    let value = event.value
    let questionIndex = event.source.name
    this.questions[questionIndex].studentVAlue = value
    if(this.questions[questionIndex].studentVAlue === this.questions[questionIndex].correct){
      this.questions[questionIndex].answer = true
    }else{
      this.questions[questionIndex].answer = false
    }
    // console.log(this.questions)
  }


  updateTestedUser(){
    let model={
      subjectName:this.subjectName,
      question: this.questionsNotModify,
      userTested: this.allUserTested
    }
    let id = this.id
    this.doctorServices.updateUserTestes(model, id).subscribe((res)=>{
      console.log(res)
    })
  }

}
