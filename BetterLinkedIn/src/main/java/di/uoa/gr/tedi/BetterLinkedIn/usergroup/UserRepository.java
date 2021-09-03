package di.uoa.gr.tedi.BetterLinkedIn.usergroup;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.email = ?1")
    Optional<User> findUserByEmail(String email);

    @Query("SELECT u FROM UserConnectionRequest u WHERE u.sender = ?1")
    List<UserConnectionRequest> findFriendRequestsSent(User user);

    @Query("SELECT u.sender FROM UserConnectionRequest u WHERE u.receiver = ?1")
    List<User> findFriendRequestsReceived(User user);

    @Query("SELECT u FROM UserConnectionRequest u WHERE (u.receiver = ?2 AND u.sender = ?1) ")
    Optional<UserConnectionRequest> findFriendRequestByUser(User user1, User user2);

    @Modifying
    @Query("DELETE FROM UserConnectionRequest u WHERE (u.receiver = ?2 AND u.sender = ?1)")
    void removeFriendRequestByUsers(User user1, User user2);


    @Query("SELECT u.friends FROM User u  WHERE u = ?1")
    Set<User> findFriends(User user);
}
