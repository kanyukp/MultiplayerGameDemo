package testgrouppleaseignore.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import testgrouppleaseignore.demo.Models.Player;
import testgrouppleaseignore.demo.Models.User;
import testgrouppleaseignore.demo.Services.PlayerService;
import testgrouppleaseignore.demo.Services.UserService;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserResource {
    private final UserService userService;

    public UserResource(UserService userService)
    {
        this. userService = userService;
    }

    @PostMapping("/add")
    public ResponseEntity<Player> addUser(@RequestBody User user) {
        // System.out.println("Trying to Add User : ");
        Player newPlayer = userService.addUser(user);
        // System.out.println("After call " + newPlayer);
        return new ResponseEntity<>(newPlayer, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Player> updateUser(@RequestBody Player player) {
        //System.out.println("Trying to update player :  ");
        Player updatePlayer = userService.updatePlayer(player);
        //System.out.println("Actually updated player");
        return new ResponseEntity<>(updatePlayer, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{username}")
    public ResponseEntity<?> deleteUser(@PathVariable("username") String username) {
        userService.deletePlayer(username);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/find/")
    public ResponseEntity<Player> findUser(@RequestParam String username, @RequestParam String password ) {
        //System.out.println("In Get");
        Player foundPlayer = userService.findUser(username, password);

        //System.out.println(foundPlayer);

        return new ResponseEntity<>(foundPlayer, HttpStatus.OK);
    }
}
