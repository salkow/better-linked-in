package di.uoa.gr.tedi.BetterLinkedIn.usergroup;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Getter
@Setter
@Embeddable
public class UserExperience {

    private String text;
    private Boolean displayable;

    public UserExperience() {
        text = "";
        displayable = false;
    }
}

