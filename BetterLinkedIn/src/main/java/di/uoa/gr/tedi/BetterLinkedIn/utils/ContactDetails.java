package di.uoa.gr.tedi.BetterLinkedIn.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContactDetails {
    private Long id;
    private String name;

    public ContactDetails(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}

