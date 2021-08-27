package di.uoa.gr.tedi.BetterLinkedIn.friends;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
public class ContactId implements Serializable {
    @Column(name = "friend1_id")
    private Long friend1Id;

    @Column(name = "friend2_id")
    private Long friend2Id;

    protected ContactId() {}


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ContactId contactId = (ContactId) o;
        return (Objects.equals(friend1Id, contactId.friend1Id) && Objects.equals(friend2Id, contactId.friend2Id)) || (Objects.equals(friend1Id, contactId.friend2Id) && Objects.equals(friend2Id, contactId.friend1Id));
    }

    @Override
    public int hashCode() {
        return Objects.hash(friend1Id, friend2Id);
    }
}
