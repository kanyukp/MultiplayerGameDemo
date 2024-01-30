import { Player } from "./player";
import { Projectile } from "./projectile";

export interface GameData {
    currPlayer?: Player;
    players?: Player[];
    projectiles?: Projectile[];
}