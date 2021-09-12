package di.uoa.gr.tedi.BetterLinkedIn.posts;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import di.uoa.gr.tedi.BetterLinkedIn.usergroup.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Post {

    private @Id @GeneratedValue Long id;

    private String text;

    private String media;

    private String typeOfMedia;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIdentityReference(alwaysAsId = true)
    private User owner;

    private String name;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Like> likes = new ArrayList<>();


    protected Post() {}

    public Post(String text, String media, String typeOfMedia, User owner) {
        if (text == null && media == null) {
            throw new IllegalStateException("Post must have at least one of text or media");
        }
        this.text = text;
        this.media = media;
        this.typeOfMedia = typeOfMedia;
        this.owner = owner;
        this.name = owner.getFirstName() + " " + owner.getLastName();
    }

    public String getMedia() {
        return "images/post_" + id + "/" + media;
    }
}
