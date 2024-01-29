import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder,ReactiveFormsModule } from '@angular/forms';
import { Player } from '../player';
import { PlayerService } from '../player.service';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-login-comp',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() player = new EventEmitter<Player>();
  
  @Output() play = new EventEmitter<boolean>();

  addCurPlayer:Player;
  addCurUser: User;

  addNewUser:boolean = false;

  usernameForm = this.formBuilder.group({
    username:'',
    password:''
  });

  constructor(private formBuilder: FormBuilder, private playerService: PlayerService, private userService: UserService) { }

  ngOnInit(): void {
    this.play.emit(false);
  }

  onSubmit(): void {
    var buttonName = document.activeElement.getAttribute("Name");

    if(buttonName == "add"){
      this.addCurUser = {username:this.usernameForm.value.username, password:this.usernameForm.value.password};
      this.userService.addUser(this.addCurUser).subscribe(
        (response) => {
          this.player.emit(response);
          this.play.emit(true);
        }
      );

    } else {

      this.userService.getUserByNameAndPass(this.usernameForm.value.username, this.usernameForm.value.password ).subscribe(
        (response) => {
          this.player.emit(response);
          this.play.emit(true);
        }
      );
    
    }
  }
  newUser(): void {
    this.addNewUser = true;
  }

}
