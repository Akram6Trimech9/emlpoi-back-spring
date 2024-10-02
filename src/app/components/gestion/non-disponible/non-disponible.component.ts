
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NonDesponibilitie } from 'src/app/models/nonDisponibilites.models';
import { NonDesponibilitieService } from 'src/app/services/non-desponibilitie.service';


@Component({
  selector: 'app-non-disponible',
  templateUrl: './non-disponible.component.html',
  styleUrls: ['./non-disponible.component.css']
})
export class NonDisponibleComponent implements OnInit {
  constructor(private disponibilityService : NonDesponibilitieService ,  private cookiesService : CookieService){

  }
  nonDispos: NonDesponibilitie[] =[]

  ngOnInit(): void {
    const user = this.cookiesService.get('userId')

    this.disponibilityService.getNonDesponibilitieById(parseInt(user)).subscribe(res=>{
      this.nonDispos = res
    })
  }

   gotoPage(page: number): void {
   
  }

  goToPreviousSet(): void {
   
  }

  goToNextSet(): void {
   }
}
