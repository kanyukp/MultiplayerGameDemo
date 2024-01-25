package testgrouppleaseignore.demo.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import testgrouppleaseignore.demo.Exceptions.ProjectileNotFoundException;
import testgrouppleaseignore.demo.Models.Projectile;
import testgrouppleaseignore.demo.Repos.ProjectileRepo;

import java.util.List;

@Service
public class ProjectileService {

    private final ProjectileRepo projectileRepo;

    @Autowired
    public ProjectileService(ProjectileRepo projectileRepo){
        this.projectileRepo = projectileRepo;
    }

    public List<Projectile> findAllProjectiles() {
        return projectileRepo.findAll();
    }

    public Projectile addProjectile(Projectile projectile){
        //System.out.println("In service Trying to add Player" + player);
        return projectileRepo.save(projectile);
    }

    public Projectile updateProjectile(Projectile projectile) {
        //System.out.println("In Service Trying to update Player" + player);
        return projectileRepo.save(projectile);
    }

    public void deleteProjectile(String entityID) {
        projectileRepo.deleteProjectileById(entityID);
    }

    public Projectile findProjectile(String entityID) {
        //System.out.println("Looking for player: " + username);
        return projectileRepo.findProjectileByEntityID(entityID).orElseThrow( () -> new ProjectileNotFoundException("Player by username : " + entityID + " was not found"));
    }
//    public Player findPlayer(String username, String password) {
//        //System.out.println("Looking for player: " + username + " password: " + password);
//        return projectileRepo.findPlayerByUsernameAndPassword(username, password).orElseThrow( () -> new PlayerNotFoundException("Player by username : " + username + " and password: " + password + " was not found"));
//    }


}

