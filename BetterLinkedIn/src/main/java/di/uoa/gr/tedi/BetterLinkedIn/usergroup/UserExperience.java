package di.uoa.gr.tedi.BetterLinkedIn.usergroup;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


@Getter
@Setter
@Embeddable
public class UserExperience {

    private String personalExperience;
    private Boolean displayable;

    public UserExperience() {
        personalExperience = "";
        displayable = false;
    }
}

