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
  
  
  registrationForm: FormGroup;
  photoError: string | null = null;
  photo1:any;

  constructor(private fb: FormBuilder,private userService: UserService, private router: Router) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, this.firstNameValidator]],
      lastName: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.maxLength(10)]],
      photo1: [null, [Validators.required]],
      age: [20, [Validators.required, Validators.min(20), Validators.max(60)]],
      address:['',[Validators.required, Validators.maxLength(30)]],
      tags:['',[Validators.required,Validators.maxLength(10)]],
      selectedOption: ['', Validators.required],
      selectedOption1: ['', Validators.required],
    });
  }

  firstNameValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    const valid = /^[A-Za-z]{1,20}$/.test(value);
    return valid ? null : { 'invalidFirstName': true };
  }
  
  selectFile(event: any) { 
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const img = new Image();
      img.onload = () => {
        if (img.width !== 310 || img.height !== 325) {
          this.registrationForm.patchValue({ photo: null });
        } else {
          this.registrationForm.patchValue({ photo: file });
        }
      };
      img.src = URL.createObjectURL(file);
    }

		
		var mimeType = event.target.files[0].type;
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result; 
      		}
          
      this.photo1=event.target.files[0]

  }


  onSubmit() {   
    if (this.registrationForm.valid) {
      this.userService.setUser(this.registrationForm.value);
      this.router.navigate(['/user']);
    }

  }
 
}
