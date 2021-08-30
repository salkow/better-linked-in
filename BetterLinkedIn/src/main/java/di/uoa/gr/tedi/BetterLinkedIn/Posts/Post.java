package di.uoa.gr.tedi.BetterLinkedIn.Posts;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import di.uoa.gr.tedi.BetterLinkedIn.usergroup.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Post {

    private @Id @GeneratedValue Long id;

    @NotNull
    private String title;

    private String text;

    private String media;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User owner;

    protected Post() {}

    public Post(String title, String text, String media, User owner) {
        this.title = title;
        this.text = text;
        this.media = media;
        this.owner = owner;
    }
}
