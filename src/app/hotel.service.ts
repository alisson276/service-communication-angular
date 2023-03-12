import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, map, Observable } from 'rxjs';
import { HotelDto } from './interfaces/hotel-dto';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  selectedHotel: BehaviorSubject<HotelDto>
  hotelEmmiter$: EventEmitter<HotelDto>

  constructor(private http: HttpClient) {
    console.log("HotelService::Constructor()")
    this.selectedHotel = new BehaviorSubject<HotelDto>({"Id": 0, "Name": ""})
    this.hotelEmmiter$ = new EventEmitter<HotelDto>();
  }

  setHotel(): Observable<HotelDto> {
    return this.http.get<HotelDto>("https://alisson276.free.beeceptor.com/hotel/1")
    .pipe(map((data: HotelDto) => {
      this.selectedHotel.next(data)
      this.hotelEmmiter$.emit(data)
      return data
    }))
  }

  getHotel(): Observable<HotelDto> {
    return this.selectedHotel.asObservable()
  }
}
