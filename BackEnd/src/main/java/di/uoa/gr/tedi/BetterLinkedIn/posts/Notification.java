package di.uoa.gr.tedi.BetterLinkedIn.posts;

import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import di.uoa.gr.tedi.BetterLinkedIn.usergroup.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Notification {

    private @Id @GeneratedValue @JsonIgnore
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(name = "user_id")
    private User user;

    private String name;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "like_id")
    private Like like;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "post_id")
    private Comment comment;


    public Notification(User user, Like like) {
        this.user = user;
        this.like = like;
        this.name = user.getFirstName() + " " + user.getLastName();
    }

    public Notification(User user, Comment comment) {
        this.user = user;
        this.comment = comment;
        this.name = user.getFirstName() + " " + user.getLastName();
    }
}
