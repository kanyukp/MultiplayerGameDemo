package testgrouppleaseignore.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import testgrouppleaseignore.demo.Services.ProjectileService;
import testgrouppleaseignore.demo.Models.Projectile;

import java.util.List;

@RestController
@RequestMapping("/projectile")
public class ProjectileResource {
    private final ProjectileService projectileService;

    public ProjectileResource(ProjectileService projectileService)
    {
        this. projectileService = projectileService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Projectile>> getAllProjectiles() {
        List<Projectile> projectiles = projectileService.findAllProjectiles();
        return new ResponseEntity<>(projectiles, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Projectile> addProjectile(@RequestBody Projectile projectile) {
        //System.out.println("Trying to Add Player : ");
        Projectile newProjectile = projectileService.addProjectile(projectile);
        //System.out.println("After call " + newPlayer);
        return new ResponseEntity<>(newProjectile, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Projectile> updateProjectile(@RequestBody Projectile projectile) {
        //System.out.println("Trying to update player :  ");
        Projectile updateProjectile = projectileService.updateProjectile(projectile);
        //System.out.println("Actually updated player");
        return new ResponseEntity<>(updateProjectile, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{username}")
    public ResponseEntity<?> deleteProjectile(@PathVariable("entityID") String entityID) {
        projectileService.deleteProjectile(entityID);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/find/")
    public ResponseEntity<Projectile> findProjectile(@RequestParam String entityID) {
        //System.out.println("In Get");
        Projectile foundProjectile = projectileService.findProjectile(entityID);

        //System.out.println(foundPlayer);

        return new ResponseEntity<>(foundProjectile, HttpStatus.OK);
    }
}
