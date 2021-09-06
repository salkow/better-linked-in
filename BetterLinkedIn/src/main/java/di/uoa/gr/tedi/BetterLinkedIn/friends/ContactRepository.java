package di.uoa.gr.tedi.BetterLinkedIn.friends;

import di.uoa.gr.tedi.BetterLinkedIn.usergroup.User;
import di.uoa.gr.tedi.BetterLinkedIn.utils.FriendDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;



@Repository
@Transactional
public interface ContactRepository extends JpaRepository<Contact, ContactId> {

}
