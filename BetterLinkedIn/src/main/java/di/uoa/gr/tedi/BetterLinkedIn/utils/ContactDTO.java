package di.uoa.gr.tedi.BetterLinkedIn.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContactDTO {
    private Long id;
    private String name;

    public ContactDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}

