import { Component, OnInit } from '@angular/core';
import {HotelService} from '../hotel.service'
import { Router } from '@angular/router';
import { Observable, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-select-hotel',
  templateUrl: './select-hotel.component.html',
  styleUrls: ['./select-hotel.component.scss'],
})
export class SelectHotelComponent implements OnInit {
  userSelectedHotel: any;
  hotel$: Subscription = new Subscription()
  hotelSelected$: Subscription = new Subscription()

  constructor(public hotelService:HotelService, private router: Router) {
    console.log("SelectHotelComponent::Constructor()")
  }

  ngOnInit() {
    console.log("SelectHotelComponent::ngOnInit()")

    this.hotel$ = this.hotelService.setHotel().subscribe(data => {
      console.log(`setHotel() on SelectHotel: ${JSON.stringify(data)}`)
      this.userSelectedHotel = data
      setTimeout(() =>
      {
        this.goToNext()
      },
      5000);
    })

    this.hotelService.hotelEmmiter$.pipe(take(1)).subscribe(data => {
      console.log(`hotelEmmiter$ on SelectHotel: ${JSON.stringify(data)}`)
    });

    this.hotelSelected$ = this.hotelService.getHotel().subscribe(data => {
      console.log(`getHotel() on SelectHotel: ${JSON.stringify(data)}`)
      this.userSelectedHotel=data
    });
  }

  goToNext()
  {
    this.router.navigate(['/select-room'])
  }

  ngOnDestroy() {
    console.log("SelectHotelComponent::ngOnDestroy()")
    this.hotel$.unsubscribe()
    this.hotelSelected$.unsubscribe()
  }
}
