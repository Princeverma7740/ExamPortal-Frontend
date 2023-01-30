import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
loginData={
  username:'',
  password:''
};


constructor( private _snackbar:MatSnackBar,private loginservice:LoginService, private router: Router){}
ngOnInit(): void {}

formSubmit(){
  console.log("login btn clicked");
  if(this.loginData.username.trim()==''|| this.loginData.username==null)
  {
    this._snackbar.open('Usrname is required','',{
  duration:3000,
    });
    return;
  }
  if(this.loginData.password.trim()==''|| this.loginData.password==null)
  {
    this._snackbar.open('password is required','',{
  duration:3000,
    });
    return;
  }
  // request to server to generate thte token
  this.loginservice.generateToken(this.loginData).subscribe(
    (data:any)=>
    {
      console.log('Success');
      console.log(data);
      //login
      this.loginservice.loginUser(data.token);
      this.loginservice.getCurrentUser().subscribe(
        (user:any)=>{
          this.loginservice.setUser(user);
          console.log(user);
          // redirect ADMIN: admin dashboard;

          if (this.loginservice.getUserRole() == 'ADMIN') {
            //window.location.href='/admin'
            this.router.navigate(['admin']);
            this.loginservice.loginStatusSubject.next(true);
          } else if (this.loginservice.getUserRole() == 'NORMAL') {
             //redirect normal: normaldashboard
             //window.location.href='/user-dashboard'
            this.router.navigate(['user-dashboard/0']);
            this.loginservice.loginStatusSubject.next(true);
          } else {
            this.loginservice.logout();
          }
         
        }
      );



    },
  (error)=>
  {
    console.log('Error!');
    console.log(error);
    this._snackbar.open('Invalid Details !! Try again', '', {
      duration: 3000,
    });
  }
    
  ); 

}



}
