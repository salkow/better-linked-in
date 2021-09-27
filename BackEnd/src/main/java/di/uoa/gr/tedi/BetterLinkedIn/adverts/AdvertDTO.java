package di.uoa.gr.tedi.BetterLinkedIn.adverts;

import di.uoa.gr.tedi.BetterLinkedIn.usergroup.User;
import di.uoa.gr.tedi.BetterLinkedIn.utils.ContactDTO;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class AdvertDTO {
    private final Long id;
    private final String name;
    private final String title;
    private final String text;
    private final String skills;
    private final List<ContactDTO> applicants;

    public AdvertDTO() {
        id = null;
        name = "";
        text = "";
        title = "";
        skills = "";
        applicants = null;
    }

    public AdvertDTO(Long id, String name, String title, String text, String skills, List<User> list) {
        this.id = id;
        this.name= name;
        this.title = title;
        this.text = text;
        this.skills = skills;
        List<ContactDTO> temp = new ArrayList<>();
        for (User u: list) {
            temp.add(new ContactDTO(u.getId(), u.getFirstName() + " " + u.getLastName()));
        }
        this.applicants = new ArrayList<>(temp);
    }
}

