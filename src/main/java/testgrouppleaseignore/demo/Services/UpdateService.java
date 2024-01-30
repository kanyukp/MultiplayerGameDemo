package testgrouppleaseignore.demo.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import testgrouppleaseignore.demo.Exceptions.PlayerNotFoundException;
import testgrouppleaseignore.demo.Models.Player;
import testgrouppleaseignore.demo.Models.UpdateInput;
import testgrouppleaseignore.demo.Repos.PlayerRepo;
import testgrouppleaseignore.demo.Repos.UpdateRepo;

import java.util.List;

@Service
public class UpdateService {
    private final UpdateRepo updateRepo;

    @Autowired
    public UpdateService(UpdateRepo updateRepo){
        this.updateRepo = updateRepo;
    }

    public List<UpdateInput> findAllUpdates() {
        return updateRepo.findAll();
    }

    public UpdateInput addUpdate(UpdateInput update){
        //System.out.println("In service Trying to add Player" + player);
        return updateRepo.save(update);
    }

    public UpdateInput updatePlayer(UpdateInput update) {
        //System.out.println("In Service Trying to update Player" + player);
        return updateRepo.save(update);
    }

    public void clearUpdates() {
        updateRepo.deleteAll();
    }

    public void deleteUpdate(UpdateInput update){
        updateRepo.delete(update);
    }

    public UpdateInput findUpdate(String username) {
        //System.out.println("Looking for player: " + username);
        return updateRepo.findUpdateByUsername(username).orElseThrow( () -> new PlayerNotFoundException("Player by username : " + username + " was not found"));
    }
}
