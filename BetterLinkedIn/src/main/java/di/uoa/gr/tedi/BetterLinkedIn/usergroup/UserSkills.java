package di.uoa.gr.tedi.BetterLinkedIn.usergroup;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;


@Getter
@Setter
@Embeddable
@AllArgsConstructor
public class UserSkills {

    private String text;
    private Boolean displayable;

    public UserSkills() {
        text = " ";
        displayable = false;
    }
}
