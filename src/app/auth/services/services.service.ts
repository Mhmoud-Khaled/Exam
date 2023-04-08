import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  user = new Subject


  constructor(private http:HttpClient) { }

  createUser(model:any){
    return this.http.post("http://localhost:3000/student",model)
  }

  getusers(type:string){
    return this.http.get("http://localhost:3000/"+type)
  }

  updateLogin(model:any){
    return this.http.put("http://localhost:3000/login/1",model)
  }

  getRole(){
    return this.http.get("http://localhost:3000/login/1")
  }

  getUserById(id:number){
    return this.http.get("http://localhost:3000/student/"+id)
  }



}
