package di.uoa.gr.tedi.BetterLinkedIn.Posts;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Comment {

    private @Id @GeneratedValue Long id;

    private String text;

/*    @OneToOne
    private Post post;*/

    public Comment(String text) {
        if (text == null) {
            throw new IllegalStateException("Comment text can't be null");
        }
        this.text = text;
/*
        this.post = post;
*/
    }
}
