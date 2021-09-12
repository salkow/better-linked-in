package di.uoa.gr.tedi.BetterLinkedIn.adverts;

import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import di.uoa.gr.tedi.BetterLinkedIn.usergroup.User;
import di.uoa.gr.tedi.BetterLinkedIn.usergroup.UserSkills;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Advert {

    private @Id @GeneratedValue Long id;

    private String title;

    private String text;

    private String skills;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User creator;

    @ManyToMany(cascade = {
            CascadeType.MERGE, CascadeType.PERSIST
    })
    @JoinTable(name = "user_advert",
            joinColumns = @JoinColumn(name = "advert_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    @JsonIgnore
    private List<User> applicants = new ArrayList<>();


    public Advert(String title, String text, String skills, User creator) {
        this.title = title;
        this.text = text;
        this.skills = skills;
        this.creator = creator;
    }

    //returns false, if no skills overlap
    public boolean compare_skills(String applicantSkills) {
        Set<String> skillSet = new HashSet<>(Arrays.asList(skills.split("\n\n")));
        Set<String> applicantSkillSet = new HashSet<>(Arrays.asList(applicantSkills.split("\n\n")));

        return !Collections.disjoint(skillSet, applicantSkillSet);
    }
}
