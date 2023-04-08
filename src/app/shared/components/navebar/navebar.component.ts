import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/auth/services/services.service';

@Component({
  selector: 'app-navebar',
  templateUrl: './navebar.component.html',
  styleUrls: ['./navebar.component.scss']
})
export class NavebarComponent implements OnInit{
  userName = null
  role = null

  constructor(private service:ServicesService){

  }

ngOnInit(): void {
  this.getUserName()
}

  logOut(){
    let model ={}
    this.service.updateLogin(model).subscribe((res:any)=>{
      // console.log("success log out")
      this.getUserName()
      this.userName = null
      this.role = null
      // console.log(this.userName)
    })
    }

  getUserName(){
    this.service.user.subscribe((res:any)=>{
      this.userName = res.user
      this.role = res.role
      // console.log(this.userName)
    })
  }

}
