package di.uoa.gr.tedi.BetterLinkedIn.Posts;

import com.fasterxml.jackson.annotation.JsonIgnore;
import di.uoa.gr.tedi.BetterLinkedIn.usergroup.User;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Table(name="likes")
public class Like {
    private @Id @GeneratedValue Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    public Like(User owner, Post post) {
        this.owner= owner;
        this.post= post;
    }

}
