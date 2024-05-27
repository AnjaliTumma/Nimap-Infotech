import { Component } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl , ReactiveFormsModule} from '@angular/forms';
import { state } from '@angular/animations';
import { UserService } from '../user.service';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgStyle, CommonModule,ReactiveFormsModule,RouterOutlet,HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  show:boolean=false;
  show1:boolean=false;
  title='Hobbies';
  url: any; 
  msg = "";
  usersArr:any=[]

  private changeResult=20;
  private dragResult=60;
  public changeFunction(event:any){
    this.changeResult=parseFloat(event.target.value);
  }
	
  //  Hobbies to do list
	list:any[]=[];
  addTask(item:string)
  {
    this.list.push({id:this.list.length,name:item})
    console.log(this.list)
  }
  removeTask(id:number){
    console.log(id)
    this.list=this.list.filter(item=>item.id!==id)
  }
  showForm(){
    this.show=!this.show
  }
  
  registrationForm: FormGroup;
  photoError: string | null = null;
  photo1:any;
  addressType: string | null = null;
  userPhoto: string | ArrayBuffer | null = null;
  
  constructor(private fb: FormBuilder,private userService: UserService, private router: Router) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, this.firstNameValidator]],
      lastName: [''],
      email:[''],
      mobile:[''],
      selectedOption:[''],
      selectedOption1:[''],
      addressType:[''],
      address1: [''],
      address2: [''],
      tags:[''],
      hobbies:[''],
      photo1: [null],
      age: [20, [ Validators.min(20), Validators.max(60)]],
     
    });
  }
  

    // FirstName Function

  firstNameValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    const valid = /^[A-Za-z]{1,20}$/.test(value);
    return valid ? null : { 'invalidFirstName': true };
  }
  
  // File Upload

  selectFile(event: any):void { 
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			// this.msg = 'You must select an image';
			return;
		}
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        if (img.width === 310 && img.height === 310) {
          const reader = new FileReader();
          reader.onload = () => {
            this.photo1 = reader.result;
            this.photoError = null;
          };
          reader.readAsDataURL(file);
        } else {
          this.photoError = 'Photo must be 310x325 pixels';
          this.photo1 = null;
        }
      };   
    }
    
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result; 
      		}
          
      this.photo1=event.target.files[0]

  }

   // Address Function

  onAddressTypeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const addressType = selectElement.value;
    this.addressType = addressType;

    if (addressType === 'Home') {
      this.registrationForm.addControl('address1', this.fb.control(''));
      this.registrationForm.addControl('address2', this.fb.control(''));
      this.registrationForm.removeControl('companyAddress1');
      this.registrationForm.removeControl('companyAddress2');
    } else if (addressType === 'Company') {
      this.registrationForm.addControl('companyAddress1', this.fb.control(''));
      this.registrationForm.addControl('companyAddress2', this.fb.control(''));
      this.registrationForm.removeControl('address1');
      this.registrationForm.removeControl('address2');
    }
  }

  onSubmit(data:any) {   
   
      this.userService.setUser(data).subscribe((result)=>{
        console.log(result);
        this.router.navigate(['/user']);
      })
     
  }
 
}
