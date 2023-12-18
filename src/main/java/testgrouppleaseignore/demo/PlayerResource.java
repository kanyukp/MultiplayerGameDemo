package testgrouppleaseignore.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import testgrouppleaseignore.demo.Services.PlayerService;
import testgrouppleaseignore.demo.Player;

import java.util.List;

@RestController
@RequestMapping("/player")
public class PlayerResource {
    private final PlayerService playerService;

    public PlayerResource(PlayerService playerService)
    {
        this. playerService = playerService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Player>> getAllPlayers() {
        List<Player> players = playerService.findAllPlayers();
        return new ResponseEntity<>(players, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Player> addPlayer(@RequestBody Player player) {
        //System.out.println("Trying to Add Player : ");
        Player newPlayer = playerService.addPlayer(player);
        //System.out.println("After call " + newPlayer);
        return new ResponseEntity<>(newPlayer, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Player> updatePlayer(@RequestBody Player player) {
        //System.out.println("Trying to update player :  ");
        Player updatePlayer = playerService.updatePlayer(player);
        //System.out.println("Actually updated player");
        return new ResponseEntity<>(updatePlayer, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{username}")
    public ResponseEntity<?> deletePlayer(@PathVariable("username") String username) {
        playerService.deletePlayer(username);
        return new ResponseEntity<>(HttpStatus.OK);
    }

//    @GetMapping("/find/{user}")
//    public ResponseEntity<Player> findPlayer(@PathVariable("user") String user) {
//        //System.out.println("In Get");
//        Player foundPlayer = playerService.findPlayer(user);
//
//        //System.out.println(foundPlayer);
//
//        return new ResponseEntity<>(foundPlayer, HttpStatus.OK);
//    }
    @GetMapping("/find/")
    public ResponseEntity<Player> findPlayer(@RequestParam String username, @RequestParam String password ) {
        //System.out.println("In Get");
        Player foundPlayer = playerService.findPlayer(username, password);

        //System.out.println(foundPlayer);

        return new ResponseEntity<>(foundPlayer, HttpStatus.OK);
    }
}
