package di.uoa.gr.tedi.BetterLinkedIn.usergroup;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional(readOnly = true)
interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT s FROM User s WHERE s.email = ?1")
    Optional<User> findUserByEmail(String email);

    @Query("SELECT u FROM UserConnectionRequest u WHERE u.sender = ?1")
    List<UserConnectionRequest> findFriendRequestsSent(User user);

    @Query("SELECT u FROM UserConnectionRequest u WHERE u.receiver = ?1")
    List<UserConnectionRequest> findFriendRequestsReceived(User user);

    @Query("SELECT u FROM UserConnectionRequest u WHERE (u.receiver = ?1 AND u.sender = ?2) OR (u.receiver = ?2 AND u.sender = ?1) ")
    Optional<UserConnectionRequest> findFriendRequestByUser(User user1, User user2);
}
