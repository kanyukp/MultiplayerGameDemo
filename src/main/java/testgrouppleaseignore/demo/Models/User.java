package testgrouppleaseignore.demo.Models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User {

    @Id
    @Column(nullable = false,updatable = false,length = 16)
    private String username;

    //    private String username;
    @Column(nullable = false,updatable = false,length = 16)
    private String password;
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
        return "User{" + "username=" + username + " password: " + password + "}";
    }
}
