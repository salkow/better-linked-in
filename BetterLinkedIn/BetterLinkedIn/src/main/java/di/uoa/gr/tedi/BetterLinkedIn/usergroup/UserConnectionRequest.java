package di.uoa.gr.tedi.BetterLinkedIn.usergroup;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;


@Entity
@Getter
public class UserConnectionRequest {

    private @Id @GeneratedValue Long id;
    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    @JsonIgnoreProperties("connectionRequests")
    private User sender;
    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    @JsonIgnoreProperties("connectionRequestsR")
    private User receiver;
    @Setter
    private Boolean isAccepted = false;


    public UserConnectionRequest(User sender, User receiver, Boolean isAccepted) {
        this.sender = sender;
        this.receiver = receiver;
        this.isAccepted = isAccepted;
    }

    public UserConnectionRequest() {
        sender= null;
        receiver= null;
    }
}
