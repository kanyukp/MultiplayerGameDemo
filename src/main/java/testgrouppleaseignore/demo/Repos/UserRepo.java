package testgrouppleaseignore.demo.Repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import javax.transaction.Transactional;
import java.util.Optional;

import testgrouppleaseignore.demo.Models.Player;
import testgrouppleaseignore.demo.Models.User;

public interface UserRepo extends JpaRepository<User, Long> {

    @Query("select s from User s where s.username = ?1")
    Optional<User> findUserByUsername(String username);

    @Query("select s from User s where s.username = ?1 and s.password = ?2")
    Optional<User> findUserByUsernameAndPassword(String username, String password);

}
