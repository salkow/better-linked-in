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

    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String job;
    private String company;
    private UserExperience experience;
    private UserEducation education;
    private UserSkills skills;


    public void user_to_details(User user) {
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.job = user.getJob();
        this.company = user.getCompany();
        this.experience = user.getExperience();
        this.education = user.getEducation();
        this.skills = user.getSkills();
    }
}
