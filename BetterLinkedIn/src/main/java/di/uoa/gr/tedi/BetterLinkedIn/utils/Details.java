package di.uoa.gr.tedi.BetterLinkedIn.utils;

import di.uoa.gr.tedi.BetterLinkedIn.usergroup.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.Serializable;

@Getter
public class Details {
    private final Long id;
    private final String firstName;
    private final String lastName;
    private final String job;
    private final String company;


    public Details(User user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.job = user.getJob();
        this.company = user.getCompany();
    }
}
