import { Component, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import {HotelService} from '../hotel.service'

@Component({
  selector: 'app-select-room',
  templateUrl: './select-room.component.html',
  styleUrls: ['./select-room.component.scss'],
})
export class SelectRoomComponent implements OnInit {
  userSelectedHotel:any;
  hotel$: Subscription = new Subscription()

  constructor(public hotelService:HotelService) {
    console.log("SelectRoomComponent::Constructor()")
  }

  ngOnInit() {
    console.log("SelectRoomComponent::ngOnInit()")

    this.hotelService.hotelEmmiter$.pipe(take(1)).subscribe(data => {
      console.log(`hotelEmmiter$ on SelectRoom: ${JSON.stringify(data)}`)
    });

    this.hotel$ = this.hotelService.getHotel().subscribe(data => {
      console.log(`getHotel() on SelectRoom: ${JSON.stringify(data)}`)
      this.userSelectedHotel=data
    });
  }

  ngOnDestroy() {
    console.log("SelectHotelComponent::ngOnDestroy()")
    this.hotel$.unsubscribe();
  }
}
