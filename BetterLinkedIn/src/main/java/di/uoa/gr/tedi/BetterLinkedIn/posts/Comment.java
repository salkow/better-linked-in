package di.uoa.gr.tedi.BetterLinkedIn.posts;

import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import di.uoa.gr.tedi.BetterLinkedIn.usergroup.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Comment implements Serializable {

    private @Id @GeneratedValue @JsonIgnore Long id;

    private String text;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIdentityReference(alwaysAsId = true)
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIdentityReference(alwaysAsId = true)
    private User owner;

    private String ownerName;

    @OneToOne(mappedBy = "comment")
    @JsonIgnore
    private Notification notification;

    public Comment(String text, Post post, User owner) {
        if (text == null) {
            throw new IllegalStateException("Comment text can't be null");
        }
        this.text = text;
        this.post = post;
        this.owner = owner;
        this.ownerName = owner.getFirstName() + " " + owner.getLastName();
    }
}
