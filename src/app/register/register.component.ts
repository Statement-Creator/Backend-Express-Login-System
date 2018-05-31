import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../validate.service';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor( private validateService: ValidateService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }


  onRegisterSubmit(){
    const User = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }
  
  if(!this.validateService.validateRegister(User)){
    alert("fill in all fields");
    return false;
  }
  if(!this.validateService.validateEmail(User.email)){
    alert("please use a valid email");
    return false;
  }

this.authService.registerUser(User).subscribe( data=>{
  if(data){
    alert("registered");
    this.router.navigate(['/login'])
  }else{
    alert('something went wrong');
  }
})
  }
}
