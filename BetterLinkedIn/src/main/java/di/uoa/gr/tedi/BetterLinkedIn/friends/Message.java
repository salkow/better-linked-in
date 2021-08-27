package di.uoa.gr.tedi.BetterLinkedIn.friends;

import di.uoa.gr.tedi.BetterLinkedIn.usergroup.User;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class Message {
    @Column(name = "message_id")
    private @Id @GeneratedValue Long id;

    private final String text;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "contact1_id", referencedColumnName = "friend1_id", nullable = false),
            @JoinColumn(name = "contact2_id", referencedColumnName = "friend2_id", nullable = false)
    })
    private Contact contact;

    private final String ownerName;

    private final Long ownerId;

    protected Message() {
        text = "";
        ownerName = "";
        ownerId = new Long(0);
    }


    public Message(String text, String ownerName, Long ownerId) {
        this.text = text;
        this.ownerName = ownerName;
        this.ownerId = ownerId;
    }

}
