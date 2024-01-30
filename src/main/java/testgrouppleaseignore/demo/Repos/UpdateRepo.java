package testgrouppleaseignore.demo.Repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import testgrouppleaseignore.demo.Models.Player;
import testgrouppleaseignore.demo.Models.UpdateInput;

import javax.transaction.Transactional;
import java.util.Optional;

public interface UpdateRepo extends JpaRepository<UpdateInput, Long> {

    @Modifying
    @Transactional
    @Query("delete from UpdateInput u where u.username =?1")
    void deleteUpdateByUsername(String username);
    @Query("select s from UpdateInput s where s.username = ?1")
    Optional<UpdateInput> findUpdateByUsername(String username);
}
