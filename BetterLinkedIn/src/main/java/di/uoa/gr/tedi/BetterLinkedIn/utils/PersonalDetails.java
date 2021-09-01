package di.uoa.gr.tedi.BetterLinkedIn.utils;

import di.uoa.gr.tedi.BetterLinkedIn.usergroup.User;
import di.uoa.gr.tedi.BetterLinkedIn.usergroup.UserEducation;
import di.uoa.gr.tedi.BetterLinkedIn.usergroup.UserExperience;
import di.uoa.gr.tedi.BetterLinkedIn.usergroup.UserSkills;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class PersonalDetails {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String job;
    private String company;
    private String experienceText;
    private Boolean experienceDisplayable;
    private String educationText;
    private Boolean educationDisplayable;
    private UserSkills skills;


    public void user_to_details(User user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.job = user.getJob();
        this.company = user.getCompany();
        this.experienceText = user.getExperience().getText();
        this.experienceDisplayable = user.getExperience().getDisplayable();
        this.educationText = user.getEducation().getText();
        this.educationDisplayable = user.getEducation().getDisplayable();
        this.skills = user.getSkills();
    }
}
