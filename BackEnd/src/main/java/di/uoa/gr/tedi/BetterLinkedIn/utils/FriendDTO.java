package di.uoa.gr.tedi.BetterLinkedIn.utils;

import di.uoa.gr.tedi.BetterLinkedIn.usergroup.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.Serializable;

@Getter
public class FriendDTO {
    private final Long id;
    private final String firstName;
    private final String lastName;
    private final String email;
    private final String phone;
    private final String job;
    private final String company;
    private final String picture;


    public FriendDTO(User user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.job = user.getJob();
        this.company = user.getCompany();
        this.picture = "images/" + this.id + "/" + user.getPhoto();
    }
}
