package testgrouppleaseignore.demo.Repos;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import testgrouppleaseignore.demo.Models.Player;
import javax.transaction.Transactional;
import java.util.Optional;

public interface PlayerRepo extends JpaRepository<Player, Long> {

    @Modifying
    @Transactional
    @Query("delete from Player u where u.username =?1")
    void deletePlayerById(String username);

//    @Modifying
//    @Query("update Player u set u.x=x u.y = y where u.username=username")
//    Player updatePlayerByUsername(String username, int x, int y);

    @Query("select s from Player s where s.username = ?1")
    Optional<Player> findPlayerByUsername(String username);

    @Query("select s from Player s where s.username = ?1 and s.password = ?2")
    Optional<Player> findPlayerByUsernameAndPassword(String username, String password);

}
