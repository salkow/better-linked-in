package di.uoa.gr.tedi.BetterLinkedIn.friends;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    private @Id @GeneratedValue Long id;

    private final String text;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "contact1_id", referencedColumnName = "friend1_id", nullable = false),
            @JoinColumn(name = "contact2_id", referencedColumnName = "friend2_id", nullable = false)
    })
    @JsonIgnore
    private Contact contact;

    private final Long ownerId;

    private final String ownerName;

    protected Message() {
        text = "";
        ownerId = new Long(0);
        ownerName = "";
    }


    public Message(String text, Long ownerId, String ownerName) {
        this.text = text;
        this.ownerId = ownerId;
        this.ownerName = ownerName;
    }

}
