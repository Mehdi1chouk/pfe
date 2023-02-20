import { Component } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor() { }



  houses: Array<any> = [
    {
      "imageUrl": "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "title": "ville,pays",
      "description": "blblblblblblbblblbl",
      "date": "11 mars",
      "price": "13.51 TND"
    },
    {
      "imageUrl": "https://media.istockphoto.com/id/155666671/vector/vector-illustration-of-red-house-icon.jpg?s=612x612&w=is&k=20&c=dRLXzwSGJO3qZ_f2dpSSBrNX4N__q9gLENJQHrbbYSA=",
      "title": "ville,pays",
      "description": "blblblblblblbblblbl",
      "date": "11 mars",
      "price": "13.51 TND"
    },
    {
      "imageUrl": "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg",
      "title": "ville,pays",
      "description": "blblblblblblbblblbl",
      "date": "11 mars",
      "price": "13.51 TND"
    },
    {
      "imageUrl": "https://img.staticmb.com/mbcontent/images/uploads/2022/8/Dracula_Palace.jpg",
      "title": "ville,pays",
      "description": "blblblblblblbblblbl",
      "date": "11 mars",
      "price": "13.51 TND"
    }

  ]

  ngOnInit(): void {
  }


}
