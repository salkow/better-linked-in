package di.uoa.gr.tedi.BetterLinkedIn.usergroup;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;
import java.util.*;

@Getter
@Setter
@Embeddable
@AllArgsConstructor
public class UserSkills {

    private String personalSkills;
    private Boolean displayable;

    public UserSkills() {
        personalSkills = " ";
        displayable = false;
    }
}
