import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorServicesService } from '../../services/doctor-services.service';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent implements OnInit{

  name = new FormControl
  subjectName:any = ''
  nextStep:boolean=false
  tabIndex = 0
  questionForm!:FormGroup
  questions:any[]=[]
  corectValue:any=''
  preview:boolean = false
  id:any

  constructor(private fb:FormBuilder, private toster:ToastrService, private service:DoctorServicesService){

  }

  ngOnInit(): void {
    this.createForm()
  }

  createForm(){
    this.questionForm = this.fb.group({
      question : ["",[Validators.required]],
      answer1 : ["",[Validators.required]],
      answer2 : ["",[Validators.required]],
      answer3 : ["",[Validators.required]],
      answer4 : ["",[Validators.required]],
    })
  }

  save(){
    if(this.corectValue==''){
      this.toster.error("يرجى ادخال الاجابة الصحيحة")
    }else{
      let model = {
        question : this.questionForm.value.question,
        answer1 : this.questionForm.value.answer1,
        answer2 : this.questionForm.value.answer2,
        answer3 : this.questionForm.value.answer3,
        answer4 : this.questionForm.value.answer4,
        correct : this.questionForm.value[this.corectValue]
      }
      this.questions.push(model)
      this.questionForm.reset()
      console.log(this.questions)
      this.corectValue = ''
    }
  }

  cancel(){
    this.questionForm.reset()
    this.tabIndex = 0
    this.questions = []
    this.subjectName = ""
    this.name.reset()
    this.nextStep=false
  }

  start(){
    this.subjectName = this.name.value
    console.log(this.subjectName)
    if(this.subjectName == null){
      this.nextStep = false
      this.toster.error("يرجى ادخال اسم المادة")
    }else{
      this.nextStep = true
    }
  }

  clear(){
    this.questionForm.reset()
  }

  getCorrectValue(event:any){
    this.corectValue=event.value
    console.log(this.corectValue)
  }

  submit(){
    let model ={
      subjectName:this.subjectName,
      question: this.questions
    }
    if(!this.preview){
      this.service.postquesions(model).subscribe((res:any)=>{
        console.log(res)
        this.id = res.id
        this.toster.success("تم اضافه الاساله بنجاح")
        this.preview = true
      })
    }

    if(this.preview){
      this.tabIndex=2
    }
  }

  delete(i:number){
    console.log(i)
    this.questions.splice(i,1)
    let model ={
      subjectName:this.subjectName,
      question: this.questions
    }
    this.service.updatequesions(model,this.id).subscribe((res:any)=>{
      this.toster.success("تم حذف السؤال بنجاح")
    })
  }

}
