package di.uoa.gr.tedi.BetterLinkedIn.friends;

import di.uoa.gr.tedi.BetterLinkedIn.usergroup.User;
import lombok.Data;

import javax.persistence.*;
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
    private User friend1;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("friend2Id")
    private User friend2;

    @OneToMany(mappedBy = "contact", cascade = CascadeType.ALL)
    private List<Message> messages = new ArrayList<>();

    public Contact(User friend1, User friend2) {
        this.friend1 = friend1;
        this.friend2 = friend2;
        id = new ContactId(friend1.getId(), friend2.getId());
    }

    public Contact() {}


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Contact contact = (Contact) o;
        return Objects.equals(id, contact.id) && Objects.equals(friend1, contact.friend1) && Objects.equals(friend2, contact.friend2);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, friend1, friend2);
    }

    public void addMessage(String text, String s, Long id) {
        Message mes = new Message(text, s, id);
        mes.setContact(this);
        this.messages.add(mes);
        System.out.println(messages.size());
    }
}
