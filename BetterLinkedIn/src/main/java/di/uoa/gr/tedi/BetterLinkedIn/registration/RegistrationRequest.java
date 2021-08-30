package di.uoa.gr.tedi.BetterLinkedIn.registration;

import lombok.*;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class RegistrationRequest {

    private final String firstName;
    private final String lastName;
    private final String password;
    private final String email;
    private final String phone;
    private final String photo;
    private final String job;
    private final String company;
}
