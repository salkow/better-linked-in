package di.uoa.gr.tedi.BetterLinkedIn.Posts;

import com.fasterxml.jackson.annotation.JsonIgnore;
import di.uoa.gr.tedi.BetterLinkedIn.usergroup.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Comment {

    private @Id @GeneratedValue Long id;

    private String text;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User owner;

    public Comment(String text, Post post, User owner) {
        if (text == null) {
            throw new IllegalStateException("Comment text can't be null");
        }
        this.text = text;
        this.post = post;
        this.owner = owner;

    }
}
