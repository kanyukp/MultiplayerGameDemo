package testgrouppleaseignore.demo.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import testgrouppleaseignore.demo.Exceptions.PlayerNotFoundException;
import testgrouppleaseignore.demo.Models.Player;
import testgrouppleaseignore.demo.Models.User;
import testgrouppleaseignore.demo.Repos.PlayerRepo;
import testgrouppleaseignore.demo.Repos.UserRepo;

import java.util.List;
import java.util.Objects;

@Service
public class UserService {
    private final PlayerRepo playerRepo;
    private final UserRepo userRepo;

    @Autowired
    public UserService(PlayerRepo playerRepo, UserRepo userRepo ) {
        this.playerRepo = playerRepo;
        this.userRepo = userRepo;
    }

    public List<Player> findAllPlayers() {
        return playerRepo.findAll();
    }

    public Player addUser(User user){
        System.out.println("In service Trying to add User" + user);
        userRepo.save(user);
        Player newPlayer = new Player(user.getUsername(), 122, 66);
        return playerRepo.save(newPlayer);
    }

    public Player updatePlayer(Player player) {
        //System.out.println("In Service Trying to update Player" + player);
        return playerRepo.save(player);
    }

    public void deletePlayer(String username) {
        playerRepo.deletePlayerById(username);
    }

    public Player findPlayer(String username) {
        //System.out.println("Looking for player: " + username);
        return playerRepo.findPlayerByUsername(username).orElseThrow( () -> new PlayerNotFoundException("Player by username : " + username + " was not found"));
    }
    public Player findUser(String username, String password) {
        //System.out.println("Looking for player: " + username + " password: " + password);
        User user = userRepo.findUserByUsernameAndPassword(username, password).orElseThrow( () -> new PlayerNotFoundException("Player by username : " + username + " and password: " + password + " was not found"));
        return playerRepo.findPlayerByUsername(username).orElseThrow( () -> new PlayerNotFoundException("Player by username : " + username + " was not found"));
    }
}
