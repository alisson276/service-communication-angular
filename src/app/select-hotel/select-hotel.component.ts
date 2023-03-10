import { Component, OnInit } from '@angular/core';
import {HotelService} from '../hotel.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-hotel',
  templateUrl: './select-hotel.component.html',
  styleUrls: ['./select-hotel.component.scss']
})
export class SelectHotelComponent implements OnInit {

  constructor(public hotelService:HotelService, private router: Router) { }

  ngOnInit() {
    this.hotelService.selectedHotel={Name:"Hotel Regency",Id:"1"}

  }
  goToNext()
  {
    this.router.navigate(['/select-room']);
  }

}
