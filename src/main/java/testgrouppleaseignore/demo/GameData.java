package testgrouppleaseignore.demo;

import testgrouppleaseignore.demo.Models.Player;
import testgrouppleaseignore.demo.Models.Projectile;

public class GameData {
    Player currPlayer;
    Player[] players ;
    Projectile[] projectiles;

    public GameData(Player currPlayer, Player[] players, Projectile[] projectiles) {
        this.currPlayer = currPlayer;
        this.players = players;
        this.projectiles = projectiles;
    }

    public GameData(Player currPlayer, Player[] players) {
        this.currPlayer = currPlayer;
        this.players = players;
    }

    public GameData(Player currPlayer, Projectile[] projectiles) {
        this.currPlayer = currPlayer;
        this.projectiles = projectiles;
    }

    public GameData(Player[] players, Projectile[] projectiles) {
        this.players = players;
        this.projectiles = projectiles;
    }

    public GameData(Player currPlayer) {
        this.currPlayer = currPlayer;
    }
    public GameData(Player[] players) {
        this.players = players;
    }
    public GameData(Projectile[] projectiles) {
        this.projectiles = projectiles;
    }
}
