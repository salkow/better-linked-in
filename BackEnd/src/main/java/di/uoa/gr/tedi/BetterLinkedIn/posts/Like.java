package di.uoa.gr.tedi.BetterLinkedIn.posts;

import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import di.uoa.gr.tedi.BetterLinkedIn.usergroup.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Table(name="likes")
public class Like {
    private @Id @GeneratedValue @JsonIgnore Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    @JsonIdentityReference(alwaysAsId = true)
    private User owner;

    private String owner_name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    @JsonIdentityReference(alwaysAsId = true)
    private Post post;

    @OneToOne(mappedBy = "like")
    @JsonIgnore
    private Notification notification;



    public Like(User owner, Post post) {
        this.owner= owner;
        this.post= post;
        this.owner_name = owner.getFirstName() + " " + owner.getLastName();
    }

}
