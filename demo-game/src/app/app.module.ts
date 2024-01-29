import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerService } from './player.service';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login-comp/login.component';
import { FormBuilder,ReactiveFormsModule } from '@angular/forms';
import { GameComponent } from './game/game.component';
import { ProjectileService } from './projectile.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    PlayerService,
    ProjectileService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
