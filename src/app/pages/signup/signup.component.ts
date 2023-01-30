import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private userService:UserService,private _snakeBar:MatSnackBar){}

  public user={
    username:'',
    firstname:'',
    lastname:'',
    password:'',
    email:'',
    phone:'',
  };

  ngOnInit ():void {}

  formSubmit(){
    
    console.log(this.user);
    if(this.user.username==''|| this.user.username==null)
    {
      this._snakeBar.open('username is required!!','',{
        duration:2000,
        verticalPosition:'top'
      });
      return;
    }
   //use all the validations here



  //addUsr:userservice
    this.userService.addUser(this.user).subscribe(
      (data:any) =>
      {
        //succese
        console.log(data);
        Swal.fire('Success',
        'username - '+data.username,
        'success');
        this._snakeBar.open("Success",'', {
          duration:2000,
          verticalPosition:'top'
        })
      
    },
    error =>{
      console.log(error);
      // Swal.fire('Error',
      // 'Something went wrong',
      // 'error');
      this._snakeBar.open("Something went wrong",'', {
        duration:2000,
        verticalPosition:'top'
      });
    }

    )
  };
}
