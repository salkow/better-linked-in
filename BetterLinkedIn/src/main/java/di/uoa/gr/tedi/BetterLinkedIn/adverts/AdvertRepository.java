package di.uoa.gr.tedi.BetterLinkedIn.adverts;

import di.uoa.gr.tedi.BetterLinkedIn.friends.Contact;
import di.uoa.gr.tedi.BetterLinkedIn.friends.ContactId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdvertRepository extends JpaRepository<Advert, ContactId> {
}
