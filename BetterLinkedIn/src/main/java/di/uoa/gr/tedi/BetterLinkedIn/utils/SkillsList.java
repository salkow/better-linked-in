package di.uoa.gr.tedi.BetterLinkedIn.utils;

import di.uoa.gr.tedi.BetterLinkedIn.usergroup.UserSkills;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class SkillsList {

    private List<String> personalSkills;

    private Boolean displayable;

    public SkillsList(UserSkills userSkills) {
        this.personalSkills = new ArrayList<>(Arrays.asList(userSkills.getPersonalSkills().split(",")));
        this.displayable = userSkills.getDisplayable();
    }
}
