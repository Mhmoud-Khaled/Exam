import { Component, OnInit } from '@angular/core';
import { ServicesService } from './auth/services/services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private service: ServicesService){

  }

  ngOnInit(): void {
    this.getLoadData()
  }

  getLoadData(){
    this.service.getRole().subscribe((res:any)=>{
      this.service.user.next(res)
    })
  }

}
