package di.uoa.gr.tedi.BetterLinkedIn.usergroup;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;

@Getter
@Setter
@Embeddable
public class UserEducation {
    private String userEducation;
    private Boolean displayable;

    public UserEducation() {
        userEducation = "";
        displayable = false;
    }
}
