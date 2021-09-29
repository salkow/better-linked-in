package di.uoa.gr.tedi.BetterLinkedIn.utils;

import di.uoa.gr.tedi.BetterLinkedIn.usergroup.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class PersonalDetailsDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String photoPath;
    private String job;
    private String company;
    private String experienceText;
    private Boolean experienceDisplayable;
    private String educationText;
    private Boolean educationDisplayable;
    private String skillsText;
    private Boolean skillsDisplayable;


    public void user_to_details(User user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.photoPath = "images/" + this.id + "/" + user.getPhoto();
        this.job = user.getJob();
        this.company = user.getCompany();
        this.experienceText = user.getExperience().getText();
        this.experienceDisplayable = user.getExperience().getDisplayable();
        this.educationText = user.getEducation().getText();
        this.educationDisplayable = user.getEducation().getDisplayable();
        this.skillsText = user.getSkills().getText();
        this.skillsDisplayable = user.getSkills().getDisplayable();
    }
}
