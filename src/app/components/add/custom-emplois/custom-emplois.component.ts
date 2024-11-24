import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Semestre } from 'src/app/models/semestre.models';
import { ClasseService } from 'src/app/services/classe.service';
import { DepartmentService } from 'src/app/services/department.service';
import { FiliereService } from 'src/app/services/filiere.service';
import { ProfServiceService } from 'src/app/services/prof-service.service';
import { SalleService } from 'src/app/services/salle.service';

@Component({
  selector: 'app-custom-emplois',
  templateUrl: './custom-emplois.html',
  styleUrls: ['./custom-emplois.component.css']
})
export class CustomEmploisComponent implements OnInit {
  newEvent = {
    day: '',
    start: '',
    end: '',
    matiere: '',
    group: '',
    room: '',
    department: 0,
    field: '',
    semester: '',
    professor: ''
  };

  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  timeSlots = [
    { label : 'P1'  },
    { label : 'P2' },
    {label : 'P3'  },
    { label : 'P4'  }
  ];
  page: number = 0;
  size: number = 6;
  totalPages: number = 0;
  currentPage: number = 0;
  matieres: any = [];  
  groups: any = [];   
  rooms: any = [];    
  departments: any = []; // Departments array
  fields!: any[]; // Fields array
  semesters: any = []; // Semesters array

  events: any = []; // To store the added events
  constructor(private _salleService : SalleService , private _departementService : DepartmentService , private filereService : FiliereService,private enseingnantService : ProfServiceService ,private classService : ClasseService){}
  ngOnInit(): void {
    this.fetchMatieres();
    this.fetchGroups();
    this.fetchRooms();
    this.fetchDepartments();
    this.handleSearchCustomers()
   }

   fetchMatieres() {
    this.matieres = [
      { _id: '1', matiereName: 'Math' },
      { _id: '2', matiereName: 'Physics' }
    ];
  }

  fetchGroups() {
    this.classService.getClasses(0,30).subscribe(res=>{ 
       this.groups =res.content
    })
  }

  fetchRooms() {
    this._salleService.getSalles(1,20).subscribe(res=>{
      this.rooms =  res.content
      console.log(this.rooms,"rooms")
    })
    
  }

  fetchDepartments() {
    this._departementService.getDepartements().subscribe(res=>{
       this.departments = res
       
    })
  }
  keyword : any ;
  professors!:any[]
 fetchProfessor(){
   console.log('okkk')
   this.enseingnantService.searchProfs(this.keyword,0,30).subscribe(res=>{
     this.professors = res.content
     console.log(this.professors,res,"res")
   })
 }
 handleSearchCustomers() {
  const kw =  'a'
  this.enseingnantService.searchProfs("", this.page, this.size).subscribe({
    next: (data) => {
      this.professors = data.content;
      console.log(this.professors,"okkk")
    },
    error: (err) => {
       console.log(err);
    }
  });
}
  fetchFields() {
    console.log("ok",this.selectedDepartement)
    if(this.selectedDepartement){
      this._departementService.getFilieres(this.selectedDepartement).subscribe(res=>{
        console.log(res,"res")
        this.fields=res
     })
    }

  }

  fetchSemesters() {
    if(this.selectedFiliere)
      this.filereService.getSemsterByFiliere(this.selectedFiliere).subscribe(
        (data) => {
           this.semesters= data
           console.log(data)
        }
      );
  }

  // Check if the group, class, or room is already occupied
  isConflict(event: any) {
    return this.events.some((existingEvent: any) =>
      existingEvent.day === event.day &&
      (
        existingEvent.group === event.group ||
        existingEvent.room === event.room
      ) &&
      this.isTimeOverlapping(existingEvent, event)
    );
  }

  // Helper function to check if time slots overlap
  isTimeOverlapping(event1: any, event2: any) {
    return (event1.start < event2.end && event1.end > event2.start);
  }

  // Add new event
  addEvent(form: NgForm) {
    const event = { ...this.newEvent };

    // Check for conflicts before adding the event
    if (this.isConflict(event)) {
      alert('Conflict detected! This group or room is already occupied.');
      return;
    }

    // If no conflict, add the event
    this.events.push(event);
    form.resetForm();
    this.resetSelections(); // Reset all selections after submission
  }

  resetSelections() {
    this.newEvent.department = 0;
    this.newEvent.field = '';
    this.newEvent.semester = '';
  }

  getMatiereName(id: string) {
    const matiere = this.matieres.find((m: any) => m._id === id);
    return matiere ? matiere.matiereName : 'Unknown';
  }
 
  selectedDepartement !: number 
  handleDepartmentChange(target: EventTarget | null) {
    if (target instanceof HTMLSelectElement) {
      const departmentId = Number(target.value);
      this.selectedDepartement =departmentId
      this.fetchFields()
        }
  }
  selectedFiliere!: number ;

  handleFiliereChange(target: EventTarget | null) {
    if (target instanceof HTMLSelectElement) {
      const filiereId = parseFloat(target.value);
      
      
      this.selectedFiliere =  filiereId
       this.fetchSemesters();
    }
  }
  getGroupName(id: string) {
     const group = this.groups.find((g: any) => g.id === parseInt(id));
    return group ? group.libelle : 'Unknown';
  }
  
  getRoomName(id: string) {
    const room = this.rooms.find((r: any) => r.id === parseInt(id));
    return room ? room.numSalle : 'Unknown';
  }
  
  getDepartmentName(id: string) {
    const department = this.departments.find((d: any) => d.id === parseInt(id));
    return department ? department.libelle : 'Unknown';
  }

  getFieldName(id: string) {
    const field = this.fields.find((f: any) => f.id === parseInt(id));
    return field ? field.libelle : 'Unknown';
  }

  getSemesterName(id: string) {
    const semester = this.semesters.find((s: any) => s.id === parseInt(id));
    return semester ? semester.num : 'Unknown';
  }
  getProfessor(id: string) {
    const professor = this.professors.find((s: any) => s.id === parseInt(id));
    return professor ? `${professor.nom}  ${professor.prenom}` : 'Unknown';
  }
  // sdfsdf
}
