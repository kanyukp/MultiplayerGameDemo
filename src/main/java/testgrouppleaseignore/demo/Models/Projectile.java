package testgrouppleaseignore.demo.Models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;
@Entity
public class Projectile implements Serializable {
    // @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    // @Column(nullable = false,updatable = false)
    // private Long id;

    @Id
    @Column(nullable = false,updatable = false,length = 16)
    private String entityID;

    //    private String username;
    private int Xpos;

    private int Ypos;

    private  int Xdir;

    private int Ydir;

    private int Dmg;

    public Projectile(){}

    public Projectile(String entityID, int Xpos, int Ypos, int Xdir, int Ydir, int Dmg)
    {
        this.entityID = entityID;
        this.Xpos = Xpos;
        this.Ypos = Ypos;
        this.Xdir = Xdir;
        this.Ydir = Ydir;
        this.Dmg = Dmg;
    }

    @Override
    public String toString () {
        return "Projectile{" + "entityID=" + entityID + ", Xpos: " + Xpos + ", Ypos: " + Ypos + "}";
    }

    public String getEntityID() {
        return entityID;
    }

    public void setEntityID(String entityID) {
        this.entityID = entityID;
    }

    public int getXpos() {
        return Xpos;
    }

    public void setXpos(int xpos) {
        Xpos = xpos;
    }

    public int getYpos() {
        return Ypos;
    }

    public void setYpos(int ypos) {
        Ypos = ypos;
    }

    public int getYdir() {
        return Ydir;
    }

    public void setYdir(int ydir) {
        Ydir = ydir;
    }

    public int getXdir() {
        return Xdir;
    }

    public void setXdir(int xdir) {
        Xdir = xdir;
    }

    public int getDmg() {
        return Dmg;
    }

    public void setDmg(int dmg) {
        Dmg = dmg;
    }
}
