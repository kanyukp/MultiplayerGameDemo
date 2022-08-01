package testgrouppleaseignore.demo;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Player implements Serializable {

   // @Id
   // @GeneratedValue(strategy = GenerationType.IDENTITY)
   // @Column(nullable = false,updatable = false)
   // private Long id;

    @Id
    @Column(nullable = false,updatable = false,length = 16)
    private String username;

//    private String username;
    @Column(nullable = false,updatable = false,length = 16)
    private String password;
    private int Xpos;


    private int Ypos;

    public Player(){}



    public Player(String username, String password, int x, int y)
    {
        this.username = username;
        this.password = password;
        this.Xpos = x;
        this.Ypos = y;
    }

    public int getYpos() {
        return Ypos;
    }
    public void setYpos(int ypos) {
        Ypos = ypos;
    }

    public int getXpos() {
        return Xpos;
    }
    public void setXpos(int xpos) {
        Xpos = xpos;
    }

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public String getPassword() {
        return password;
    }

    @Override
    public String toString () {
        return "Player{" + "username=" + username + ", Xpos: " + Xpos + ", Ypos: " + Ypos + "}";
    }


}
