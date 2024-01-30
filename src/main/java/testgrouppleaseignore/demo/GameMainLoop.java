package testgrouppleaseignore.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import testgrouppleaseignore.demo.Models.Player;
import testgrouppleaseignore.demo.Models.UpdateInput;
import testgrouppleaseignore.demo.Services.PlayerService;
import testgrouppleaseignore.demo.Services.UpdateService;

import java.util.List;

public class GameMainLoop {

    boolean isRunning;

    List<UpdateInput> updates;

    List<Player> players;
    PlayerService playerService;
    UpdateService updateService;
    //PlayerResource playerResource = new PlayerResource();

    public GameMainLoop(PlayerService playerService, UpdateService updateService) {
        this.isRunning = true;
        this.playerService = playerService;
        this.updateService = updateService;
        System.out.println("Update Service bean in constructor!: " + updateService);
    }
    public GameMainLoop(){

    }
    public GameMainLoop(boolean isRunning) {
        this.isRunning = isRunning;
    }
    void run() {
        long now;
        long updateTime;
        long wait;

        final int TARGET_FPS = 20;
        final long OPTIMAL_TIME = 1000000000 / TARGET_FPS;

        while (isRunning) {
            now = System.nanoTime();

            update();

            updateTime = System.nanoTime() - now;
//            System.out.println("Update Time: " + updateTime);
            wait = (OPTIMAL_TIME - updateTime) / 1000000;
//            System.out.println("wait Time: " + wait);
            try {
                Thread.sleep(Math.abs(wait));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public void update(){
        //Pull New Inputs
        updates = this.updateService.findAllUpdates();
        System.out.println("Number of updates!: " + updates.size());
        for( UpdateInput i : updates) {
            System.out.println("Update in here!: " + i.getUsername());
            //perform some action here
        }
        this.updateService.clearUpdates();
        //Calculate Changes to Location
        //Create New Instances
    }

    public boolean isRunning() {
        return this.isRunning;
    }

    public void setisRunning(boolean isRunning) {
        this.isRunning = isRunning;
    }

}
