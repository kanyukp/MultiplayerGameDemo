package testgrouppleaseignore.demo.Repos;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import testgrouppleaseignore.demo.Models.Projectile;
import javax.transaction.Transactional;
import java.util.Optional;

public interface ProjectileRepo extends JpaRepository<Projectile, Long> {

    @Modifying
    @Transactional
    @Query("delete from Projectile u where u.entityID =?1")
    void deleteProjectileById(String entityID);

//    @Modifying
//    @Query("update Player u set u.x=x u.y = y where u.username=username")
//    Player updatePlayerByUsername(String username, int x, int y);

    @Query("select s from Projectile s where s.entityID = ?1")
    Optional<Projectile> findProjectileByEntityID(String entityID);

//    @Query("select s from Projectile s where s.entityID = ?1")
//    Optional<Player> findPlayerByUsernameAndPassword(String entityID);

}
