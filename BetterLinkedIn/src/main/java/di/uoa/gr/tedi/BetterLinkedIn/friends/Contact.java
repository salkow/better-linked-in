package di.uoa.gr.tedi.BetterLinkedIn.friends;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import di.uoa.gr.tedi.BetterLinkedIn.usergroup.User;
import lombok.Data;

import javax.persistence.*;
import javax.sound.midi.SysexMessage;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Data
@Entity
public class Contact {
    @EmbeddedId
    private ContactId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("friend1Id")
    @JsonIgnore
    private User friend1;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("friend2Id")
    @JsonIgnore
    private User friend2;

    @OneToMany(mappedBy = "contact", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Message> messages = new ArrayList<>();

    private String friend1Name;

    private String friend2Name;

    public Contact(User friend1, User friend2) {
        this.friend1 = friend1;
        this.friend2 = friend2;
        this.friend1Name = friend1.getFirstName() + " " + friend1.getLastName();
        this.friend2Name = friend2.getFirstName() + " " + friend2.getLastName();
        id = new ContactId(friend1.getId(), friend2.getId());
    }

    public Contact() {}


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Contact contact = (Contact) o;
        return Objects.equals(id, contact.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, friend1, friend2);
    }

    public void addMessage(String text, Long id, String ownerName) {
        Message mes = new Message(text, id, ownerName);
        mes.setContact(this);
        this.messages.add(mes);
    }
}
