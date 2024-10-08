import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FiliereService } from '../../../services/filiere.service';
import { Filiere } from '../../../models/filieres.models';
import { Departement } from '../../../models/departement.models';
import { DepartmentService } from '../../../services/department.service';

@Component({
  selector: 'app-add-new-filiere',
  templateUrl: './add-new-filiere.component.html',
  styleUrls: ['./add-new-filiere.component.css'],
})
export class AddNewFiliereComponent implements OnInit {
  newFiliereFormGroup!: FormGroup;
  departements: Departement[] = [];

  constructor(
    private fb: FormBuilder,
    private filiereService: FiliereService,
    private departementService: DepartmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newFiliereFormGroup = this.fb.group({
      libelle: [null, Validators.required],
      nombreSem: [null, Validators.required],
      chefFiliere: [null, Validators.required],
      departement: [null, Validators.required],
    });

    this.getDepartements();
  }

  getDepartements() {
    this.departementService.getDepartements().subscribe(
      (data: Departement[]) => {
        this.departements = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  handleAddFiliere() {
     
      const newFiliere: Filiere = this.newFiliereFormGroup.value;
      const record = {
        "libelle": "Computer Science",
        "nombreSem": 1,
        "chefFiliere": "John Doe",
       }
      this.filiereService.saveFiliere(record).subscribe({
        next: () => {
          Swal.fire('Succès', 'Filière ajoutée avec succès', 'success');
          this.router.navigateByUrl('/filieres');
        },
        error: (err: any) => {
          console.error('Error:', err);
          Swal.fire('Erreur', err.error.message || 'Une erreur est survenue', 'error');
        },
      });
   }
  
}
