package testgrouppleaseignore.demo.Models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class UpdateInput {

    @Id
    @Column(nullable = false,updatable = false,length = 16)
    private String username;

    private int action;
    private int direction;


    public UpdateInput(String username, int action, int direction) {
        this.username = username;
        this.action = action;
        this.direction = direction;
    }

//    public Update(String username, int action) {
//        this.username = username;
//        this.action = action;
//    }

    public UpdateInput(String username, int direction) {
        this.username = username;
        this.direction = direction;
    }

    public UpdateInput(String username) {
        this.username = username;
    }

    public UpdateInput() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getAction() {
        return action;
    }

    public void setAction(int action) {
        this.action = action;
    }

    public int getDirection() {
        return direction;
    }

    public void setDirection(int direction) {
        this.direction = direction;
    }

}
