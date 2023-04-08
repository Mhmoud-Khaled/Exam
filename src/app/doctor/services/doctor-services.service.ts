import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorServicesService {

  id:any=null

  constructor(private http:HttpClient) {

  }

  postquesions(model:any){
    return this.http.post("http://localhost:3000/subject",model)
  }

  getQuesions(){
    return this.http.get("http://localhost:3000/subject")
  }

  updatequesions(model:any, id:number){
    return this.http.put("http://localhost:3000/subject/"+id,model)
  }

  deleteQuestions(id:number){
    return this.http.delete("http://localhost:3000/subject/"+id)
  }

  getSubjectById(){
    return this.http.get("http://localhost:3000/subject/"+this.id)
  }

  updateUserTestes(model:any, id:number){
    return this.http.put("http://localhost:3000/subject/"+id,model)
  }

}
