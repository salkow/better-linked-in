package di.uoa.gr.tedi.BetterLinkedIn.adverts;

import di.uoa.gr.tedi.BetterLinkedIn.friends.Contact;
import di.uoa.gr.tedi.BetterLinkedIn.friends.ContactId;
import di.uoa.gr.tedi.BetterLinkedIn.usergroup.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AdvertRepository extends JpaRepository<Advert, Long> {

    @Query("SELECT a FROM Advert a WHERE a.creator <> ?1")
    List<Advert> findAllExceptMine(User user);
}
