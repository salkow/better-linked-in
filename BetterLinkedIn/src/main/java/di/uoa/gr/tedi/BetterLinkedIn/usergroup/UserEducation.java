package di.uoa.gr.tedi.BetterLinkedIn.usergroup;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;

@Getter
@Setter
@Embeddable
public class UserEducation {
    private String text;
    private Boolean displayable;

    public UserEducation() {
        text = "2";
        displayable = false;
    }
}
