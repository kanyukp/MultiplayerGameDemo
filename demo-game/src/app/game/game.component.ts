import { Component, OnInit, ViewChild, ElementRef, HostListener, NgZone, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Player } from '../player';
import { PlayerService } from '../player.service';
import { LoginComponent } from '../login-comp/login.component';
import { ProjectileService } from '../projectile.service';
import { Projectile } from '../projectile';
import { UpdateInput } from '../update';
import { UpdateService } from '../update.service';

const RIGHT = 0;
const DOWN = 1;
const LEFT = 2;
const UP = 3;
const SHOOT = 1;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnChanges {
  private c: CanvasRenderingContext2D;

  @Input()
  currentPlayer:Player;

  @ViewChild('canvas', {static:true}) canvas: ElementRef<HTMLCanvasElement>;
  width = 1024;
  height = 576;
  requestId;
  curNumPlayers:number = 0;

  backgroundImage = new Image();
  
  playerIamge = new Image();

  projectileImage = new Image();

  sprites:Sprite[] = [];

  keys;

  playerInitialX = 122;
  playerInitialY = 66;

  players: Player[];
  projectiles: Projectile[];

  initialOffsetX;
  initialOffsetY;

  transform: {x:number, y:number} = {x: 0, y: 0};

  directionVectorPlayer: [number , number] = [0,0];
  lastDirection: [number , number] = [0,1];

  playerSprites: CharSprite[] = [];
  projectileSprites: ProjectileSprite[] = [];

  update: UpdateInput = {} as UpdateInput;

  constructor(private ngZone: NgZone, private playerService: PlayerService, private projectileService: ProjectileService, private updateService: UpdateService){
  }

  ngOnChanges(changes: SimpleChanges){
         
    this.getPlayers();

    this.transform.x = this.playerInitialX - this.currentPlayer.xpos;
    this.transform.y = this.playerInitialY - this.currentPlayer.ypos;

    this.keys = {
      w: {
        pressed: false
      },
      s: {
        pressed: false
      },
      a: {
        pressed: false
      },
      d: {
        pressed: false
      },
      space: {
        pressed: false
      },
    }
      this.c = this.canvas.nativeElement.getContext('2d');
      this.c.fillStyle = 'black';
      this.backgroundImage.src= 'assets/img/TestMap.png';
      this.playerIamge.src= 'assets/img/charspritetest.png';
      let background = new Sprite(-25, -50, this.backgroundImage, this.c, this.transform)
      this.sprites.push(background);
      this.draw();
      this.c.imageSmoothingEnabled = false;
      this.scale(4);
  
      this.ngZone.runOutsideAngular(() => this.draw());
      setInterval(() => {
        this.draw();
      }, 40);
  }

 ngOnInit(): void {
  this.projectileImage.src = 'assets/img/collision.png';
 }

  public getPlayers(): void {
    this.playerService.getPlayers().subscribe(
       (response: Player[]) => {
        for (let i = 0; i < response.length; i++){
          if (response[i].username == this.currentPlayer.username){
            response.splice(i,1);
          }
        }
        this.players = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public removePlayer(): void {
    this.playerService.deletePlayer(this.currentPlayer.username);
  }

  public updatePlayer(player:Player) {
    this.playerService.updatePlayer(player).subscribe(
      (response: Player) => {
        this.currentPlayer = response;
      }
    )
  }

  public findPlayer(username:string) {
    this.playerService.getPlayerByUsername(username).subscribe(
      (response: Player) =>{
        this.currentPlayer = response;
      }
    )
  }

 public addPlayer(player: Player){
    this.playerService.addPlayer(player).subscribe(
      (response: Player) =>{
        this.currentPlayer = response;
     },
     (error: HttpErrorResponse) => {
      alert(error.message);
     }
    );
  }

  public getProjectiles(): void {
    this.projectileService.getProjectiles().subscribe(
       (response: Projectile[]) => {
        this.projectiles = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public removeProjectile(entityID:string): void {
    this.projectileService.deleteProjectile(entityID);  // TODO: entityID
  }

  public updateProjectile(projectile:Projectile) {
    this.projectileService.updateProjectile(projectile).subscribe(
      (response: Projectile) =>{
        //  = response;
      }
    )
  }

  public findProjectile(username:string) {
    this.projectileService.getProjectileByEntityID(username).subscribe(
      (response: Projectile) =>{
        //  = response;
      }
    )
  }

 public addProjectile(projectile: Projectile){
    this.projectileService.addProjectile(projectile).subscribe(
      (response: Projectile) =>{
        this.projectiles.push(response);
     },
     (error: HttpErrorResponse) => {
      alert(error.message);
     }
    );
  }


  @HostListener('window:keydown', ['$event'])
  keyEventDown(event: KeyboardEvent) {
    switch(event.key){
      // Your row selection code
      case 'w': this.keys.w.pressed=true;
      break;
      case 's': this.keys.s.pressed=true;
      break;
      case 'a': this.keys.a.pressed=true;
      break;
      case 'd': this.keys.d.pressed=true;
      break;
      case ' ': this.keys.space.pressed=true;
      
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEventUp(event: KeyboardEvent) {
    console.log(event.key);
    switch(event.key){
      // Your row selection code
      case 'w': this.keys.w.pressed=false;
      break;
      case 's': this.keys.s.pressed=false;
      break;
      case 'a': this.keys.a.pressed=false;
      break;
      case 'd': this.keys.d.pressed=false;
      break;
      case ' ': this.keys.space.pressed=false;
      
    }
  }

  keyPress(){

    if (this.keys.w.pressed == true ) {
      this.directionVectorPlayer = [0,1];
      this.lastDirection = this.directionVectorPlayer;
      this.update.movement = UP;
    } else if (this.keys.s.pressed == true){
      this.directionVectorPlayer = [0,-1];
      this.lastDirection = this.directionVectorPlayer;
      this.update.movement = DOWN;
    } else if (this.keys.a.pressed == true){
      this.directionVectorPlayer = [1,0];
      this.lastDirection = this.directionVectorPlayer;
      this.update.movement = LEFT;
    } else if (this.keys.d.pressed == true){
      this.directionVectorPlayer = [-1,0];
      this.lastDirection = this.directionVectorPlayer;
      this.update.movement = RIGHT;
    } else {
      this.directionVectorPlayer = [0,0];
    }
    if (this.keys.space.pressed == true ) {
      // let projectile = new ProjectileSprite(this.currentPlayer.xpos, this.currentPlayer.ypos, this.projectileImage, this.c, this.transform, this.lastDirection);
      // this.projectileSprites.push(projectile);
      this.update.action = SHOOT;
    }

    // for(let i = 0; i < this.sprites.length; i++){
    //   this.sprites[i].transform.x += (this.directionVectorPlayer[0] * 3);
    //   this.sprites[i].transform.y += (this.directionVectorPlayer[1] * 3);
    // }

    // for(let j = 0; j < this.playerSprites.length; j++){
    //   //this.playerSprites[j].x += (directionVector[0] * 3);
    //   //this.playerSprites[j].y += (directionVector[1] * 3);
    // }
    
    // this.currentPlayer.xpos += (this.directionVectorPlayer[0] * -3);
    // this.currentPlayer.ypos += (this.directionVectorPlayer[1] * -3);

    // this.updatePlayer(this.currentPlayer);
    this.update.username = this.currentPlayer.username;
    this.updateGame(this.update);

  }
  updateGame(update: UpdateInput) {
    this.updateService.getUpdates(update).subscribe(
      (response) => {
        if(response.currPlayer)
        this.currentPlayer = response.currPlayer;

        if(response.players)
        this.players = response.players;

        if(response.projectiles)
        this.projectiles = response.projectiles;
      }
    )
  }

  draw(){
    this.backgroundImage.onload = () => {
      this.c.drawImage(this.backgroundImage, this.transform.x, this.transform.y);
    }
    const playerIamge = new Image();
    playerIamge.src= 'assets/img/charspritetest.png';
    this.playerIamge.onload = () =>{
      this.c.drawImage(this.playerIamge, 32, 0, 32, 32, 0, 0, 12, 12);
    }

    if (this.players != undefined && this.players.length != this.curNumPlayers && this.players[0].username != undefined){
      this.curNumPlayers = this.players.length;
      this.playerSprites.splice(0);
      this.players.forEach( player => this.playerSprites.push(new CharSprite(player.xpos, player.ypos, this.playerIamge, this.c, this.transform)));
    }
    this.animate();
  }

  wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

  scale(scale:number){
    this.c.scale(scale,scale);
  }

  animate() {

    this.keyPress();

    for(let i =0; i< this.sprites.length;i++){
      this.sprites[i].draw();
    }
    for(let j =0; j< this.playerSprites.length;j++){
      this.playerSprites[j].draw();
    }
    for(let k=0; k< this.projectileSprites.length;k++){
      this.projectileSprites[k].draw();
    }

    this.updatePlayerSprites();
    this.updateProjectileSprites();

    this.c.drawImage(this.playerIamge, 32, 0, 32, 32, 122, 66, 12, 12);
    
    this.requestId = requestAnimationFrame(() => this.animate);

  }
  updatePlayerSprites()
  {
    this.getPlayers();
    for(let i = 0; i < this.playerSprites.length; i++){
      this.playerSprites[i].x = this.players[i].xpos;
      this.playerSprites[i].y = this.players[i].ypos;
    }
  }
  updateProjectileSprites()
  {
    console.log("udpating projectiles: ", this.projectileSprites)
    for(let i = 0; i < this.projectileSprites.length; i++){
      this.projectileSprites[i].x -= (this.projectileSprites[i].directionVector[0]);
      this.projectileSprites[i].y -= (this.projectileSprites[i].directionVector[1]);
      if(this.projectileSprites[i].x < 10 ||
         this.projectileSprites[i].x > 200 ||
         this.projectileSprites[i].y < 10 ||
         this.projectileSprites[i].y > 150)
      {
        this.projectileSprites.splice(i,1);
      }
    }
  }



}
export class Sprite{
  x:number;
  y:number;
  image:any;
  c:any;
  transform:any;
  constructor( x, y, image, canvas, transform ){
      this.x = x;
      this.y = y;
      this.image = image;
      this.c = canvas;
      this.transform = transform;
  }
  draw(){
    this.c.drawImage(this.image, this.x + this.transform.x, this.y + this.transform.y);
  }
    
}
export class CharSprite extends Sprite {
  facing: [number , number];
  constructor( x, y, image, canvas, transform /*, height, width*/ ){
    super( x, y, image, canvas, transform);
    //this.h = height;
    //this.w = width;
  }
  draw(){
    this.c.drawImage(this.image, 32, 0, 32, 32, this.x + this.transform.x, this.y + this.transform.y, 12, 12);
  }
}

export class ProjectileSprite extends Sprite{
  // xpos:number;
  // ypos:number;
  directionVector: [number , number];
  constructor( x, y, image, canvas, transform, direction /*, xpos, ypos*/){
    super( x, y, image, canvas, transform);
    this.directionVector = direction;
    // this.xpos=xpos;
    // this.ypos=ypos;
  }
  draw(): void {
    console.log("drawing projectile");
    this.c.drawImage(this.image, this.x + this.transform.x, this.y + this.transform.y);
  }
}
