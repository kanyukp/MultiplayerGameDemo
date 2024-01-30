package testgrouppleaseignore.demo.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import testgrouppleaseignore.demo.Exceptions.PlayerNotFoundException;
import testgrouppleaseignore.demo.Models.Player;
import testgrouppleaseignore.demo.Repos.PlayerRepo;
import testgrouppleaseignore.demo.Repos.UpdateRepo;

import java.util.List;

@Service
public class PlayerService {

    private final PlayerRepo playerRepo;

    @Autowired
    public PlayerService(PlayerRepo playerRepo, UpdateRepo updateRepo){
        this.playerRepo = playerRepo;
    }

    public List<Player> findAllPlayers() {
        return playerRepo.findAll();
    }

    public Player addPlayer(Player player){
        //System.out.println("In service Trying to add Player" + player);
        return playerRepo.save(player);
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
}
