import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { NonDesponibilitieService } from 'src/app/services/non-desponibilitie.service';
import { ProfServiceService } from 'src/app/services/prof-service.service';

@Component({
  selector: 'app-non-disponibility',
  templateUrl: './non-disponibility.component.html',
  styleUrls: ['./non-disponibility.component.css']
})
export class NonDisponibilityComponent implements OnInit {
  
  
 current : any ; 
  newNonDisponibiliteFormGroup!: FormGroup;

  enseignants = [
    { nom: 'John Doe' },
    { nom: 'Jane Smith' },
    // Add more enseignants if needed
  ];
  daysOfWeek = [
    { value: 'SUNDAY', label: 'Dimanche' },
    { value: 'MONDAY', label: 'Lundi' },
    { value: 'TUESDAY', label: 'Mardi' },
    { value: 'WEDNESDAY', label: 'Mercredi' },
    { value: 'THURSDAY', label: 'Jeudi' },
    { value: 'FRIDAY', label: 'Vendredi' },
    { value: 'SATURDAY', label: 'Samedi' },
  ];

  periodes = [
    { value: 'P1', label: '8:30 → 10:30' },
    { value: 'P2', label: '10:30 → 12:30' },
    { value: 'P3', label: '14:00 → 16:00' },
    { value: 'P4', label: '16:00 → 18:00' },
  ];
  constructor(private router : Router ,  private disponibilityService :NonDesponibilitieService ,private formBuilder: FormBuilder , private _userService : ProfServiceService , private cookiesService :CookieService) {}

  ngOnInit(): void {
    const user = this.cookiesService.get('userId')
   this._userService.getProf(parseInt(user)).subscribe(res=>{
    this.current = res
  })
    this.newNonDisponibiliteFormGroup = this.formBuilder.group({
      jour: ['', Validators.required],
       periode: ['', Validators.required]
    });
  }

  handleAddNonDisponibilite(): void {
    if (this.newNonDisponibiliteFormGroup.valid) {
       const record = { 
          jour : this.newNonDisponibiliteFormGroup.value.jour, 
          enseignant: this.current , 
        periode:this.newNonDisponibiliteFormGroup.value.periode
       }
       this.disponibilityService.createNonDesponibilitie(record).subscribe(res=>{
            this.router.navigate(['/nonDesponibles'])
       })
      const formData = this.newNonDisponibiliteFormGroup.value;
      console.log('Form Data: ', formData);
     } else {
      console.log('Form is invalid');
    }
  }
}