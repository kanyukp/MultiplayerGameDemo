import { Component, OnInit, ViewChild, ElementRef, HostListener, NgZone, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Player } from './player';
import { PlayerService } from './player.service';
import { LoginComponent } from './login-comp/login.component';
import { GameComponent } from './game/game.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  play:boolean = false;
  player:Player;
  username:string;



  ngOnInit(): void {
    
  }
  constructor(){

  }

  addUsername(username:string){
    this.username = username;
  }
  addPlayer(player:Player){
    this.player = player;
  }
  playStart(play:boolean){
    this.play = play;
  }
  
//   private c: CanvasRenderingContext2D;

//   // playerForm = this.formBuilder.group({
//   //   username: '',
//   //   address: ''
//   // });

//   @Input()
//   username:string;

//   @ViewChild('canvas', {static:true}) canvas: ElementRef<HTMLCanvasElement>;
//   width = 1024;
//   height = 576;
//   requestId;
//   curNumPlayers:number = 0;

//   backgroundImage = new Image();
  
//   playerIamge = new Image();

//   sprites:Sprite[] = [];

//   keys;

//   currentPlayer: Player;

//   players: Player[];

//   transform: {x:number, y:number} = {x: 0, y: 0};

//   playerSprites: CharSprite[] = [];

//   constructor(private ngZone: NgZone, private playerService: PlayerService){


//   }

//  ngOnInit(): void {

//   this.getPlayers();

//   this.currentPlayer = {xpos: 122, ypos:66, username: this.username}

//   this.addPlayer(this.currentPlayer);

//   this.keys = {
//     w: {
//       pressed: false
//     },
//     s: {
//       pressed: false
//     },
//     a: {
//       pressed: false
//     },
//     d: {
//       pressed: false
//     }

//   }
//     this.c = this.canvas.nativeElement.getContext('2d');
//     this.c.fillStyle = 'black';
//     this.backgroundImage.src= 'assets/img/TestMap.png';
//     this.playerIamge.src= 'assets/img/charspritetest.png';
//     let background = new Sprite(-25, -50, this.backgroundImage, this.c, this.transform)
//     this.sprites.push(background);
//     //this.c.fillStyle = "white";
//     //this.c.fillRect(0, 0, this.width, this.height);
//     this.draw();
//     this.c.imageSmoothingEnabled = false;
//     this.scale(4);

//     this.ngZone.runOutsideAngular(() => this.draw());
//     setInterval(() => {
//       this.draw();
//     }, 40);
//   }

//   public getPlayers(): void {
//     //console.log("getting players");
//     this.playerService.getPlayers().subscribe(
//        (response: Player[]) => {
//         //console.log("all players response");
//         //console.log(response);
//         for (let i = 0; i < response.length; i++){
//           if (response[i].username == this.currentPlayer.username){
//             response.splice(i,1);
//           }
//         }
//         this.players = response;
//       },
//       (error: HttpErrorResponse) => {
//         alert(error.message);
//       }
//     );
//   }

//   public removePlayer(): void {
//     this.playerService.deletePlayer(this.currentPlayer.username);
//   }

//   public updatePlayer(player:Player) {
//     this.playerService.updatePlayer(player).subscribe(
//       (response: Player) =>{
//         this.currentPlayer = response;
//       }
//     )
//   }

//  public addPlayer(player: Player){
//     this.playerService.addPlayer(player).subscribe(
//       (response: Player) =>{
//         this.currentPlayer = response;
//      },
//      (error: HttpErrorResponse) => {
//       alert(error.message);
//      }
//     );
//   }

//   @HostListener('window:keydown', ['$event'])
//   keyEventDown(event: KeyboardEvent) {
//     switch(event.key){
//       // Your row selection code
//       case 'w': this.keys.w.pressed=true;
//       break;
//       case 's': this.keys.s.pressed=true;
//       break;
//       case 'a': this.keys.a.pressed=true;
//       break;
//       case 'd': this.keys.d.pressed=true;
//       break;
      
//     }
//   }

//   @HostListener('window:keyup', ['$event'])
//   keyEventUp(event: KeyboardEvent) {
//     switch(event.key){
//       // Your row selection code
//       case 'w': this.keys.w.pressed=false;
//       break;
//       case 's': this.keys.s.pressed=false;
//       break;
//       case 'a': this.keys.a.pressed=false;
//       break;
//       case 'd': this.keys.d.pressed=false;
//       break;
      
//     }
//   }

//   keyPress(){

//     var directionVector: [number , number] = [0,0];

//     if (this.keys.w.pressed == true ) {
//       directionVector = [0,1];
//     } else if (this.keys.s.pressed == true){
//       directionVector = [0,-1];
//     } else if (this.keys.a.pressed == true){
//       directionVector = [1,0];
//     } else if (this.keys.d.pressed == true){
//       directionVector = [-1,0];
//     } else {
//       directionVector = [0,0];
//     }

//     for(let i = 0; i < this.sprites.length; i++){
//       this.sprites[i].transorm.x += (directionVector[0] * 3);
//       this.sprites[i].transorm.y += (directionVector[1] * 3);
//     }

//     for(let j = 0; j < this.playerSprites.length; j++){
//       //this.playerSprites[j].x += (directionVector[0] * 3);
//       //this.playerSprites[j].y += (directionVector[1] * 3);
//     }
    
//     this.currentPlayer.xpos += (directionVector[0] * -3);
//     this.currentPlayer.ypos += (directionVector[1] * -3);

//     console.log("Current Player");
//     console.log(this.currentPlayer);
//     this.updatePlayer(this.currentPlayer);

//   }

//   draw(){
//     this.backgroundImage.onload = () => {
//       this.c.drawImage(this.backgroundImage, this.transform.x, this.transform.y);
//     }
//     const playerIamge = new Image();
//     playerIamge.src= 'assets/img/charspritetest.png';
//     this.playerIamge.onload = () =>{
//       this.c.drawImage(this.playerIamge, 32, 0, 32, 32, 0, 0, 12, 12);
//     }

//     if (this.players != undefined && this.players.length != this.curNumPlayers && this.players[0].username != undefined){
//       console.log("adding players to sprites");
//       this.curNumPlayers = this.players.length;
//       this.playerSprites.splice(0);
//       this.players.forEach( player => this.playerSprites.push(new CharSprite(player.xpos, player.ypos, this.playerIamge, this.c, this.transform)));
//     }
//     this.animate();
//   }

//   wait(ms){
//     var start = new Date().getTime();
//     var end = start;
//     while(end < start + ms) {
//       end = new Date().getTime();
//    }
//  }

//   scale(scale:number){
//     this.c.scale(scale,scale);
//   }

//   animate() {

//     this.keyPress();

//     for(let i =0; i< this.sprites.length;i++){
//       this.sprites[i].draw();
//     }
//     console.log("Player Sprites:");
//     console.log(this.players);
//     for(let j =0; j< this.playerSprites.length;j++){
//       this.playerSprites[j].draw();
//     }

//     this.updatePlayerSprites();

//     this.c.drawImage(this.playerIamge, 32, 0, 32, 32, 122, 66, 12, 12);
    
//     this.requestId = requestAnimationFrame(() => this.animate);

//   }
//   updatePlayerSprites()
//   {
//     this.getPlayers();
//     for(let i = 0; i < this.playerSprites.length; i++){
//       this.playerSprites[i].x = this.players[i].xpos;
//       this.playerSprites[i].y = this.players[i].ypos;
//     }
//   }



// }
// export class Sprite{
//   x:number;
//   y:number;
//   image:any;
//   c:any;
//   transorm:any;
//   constructor( x, y, image, canvas, transform ){
//       this.x = x;
//       this.y = y;
//       this.image = image;
//       this.c = canvas;
//       this.transorm = transform;
//   }
//   draw(){
//     this.c.drawImage(this.image, this.x + this.transorm.x, this.y + this.transorm.y);
//   }
    
// }
// export class CharSprite{
//   x:number;
//   y:number;
//  // h: number;
//  // w: number;
//   image:any;
//   c:any;
//   transorm:any;
//   constructor( x, y, image, canvas, transform /*, height, width*/ ){
//     this.x = x;
//     this.y = y;
//     this.image = image;
//     this.c = canvas;
//     this.transorm = transform;
//     //this.h = height;
//     //this.w = width;
//   }
//   draw(){
//     this.c.drawImage(this.image, 32, 0, 32, 32, this.x + this.transorm.x, this.y + this.transorm.y, 12, 12);
//     console.log("Drawing Char");
//     console.log(this.transorm);
//     console.log(this.x + ', ' + this.y);
//   }

}