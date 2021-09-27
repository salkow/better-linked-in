package di.uoa.gr.tedi.BetterLinkedIn.utils;

import di.uoa.gr.tedi.BetterLinkedIn.usergroup.User;
import di.uoa.gr.tedi.BetterLinkedIn.usergroup.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;

import java.util.Optional;

public class UserServiceHelper {

    public static User userAuth(Authentication authentication, UserRepository repository) {
        Optional<User> opt = repository.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User user = opt.get();
        return user;
    }

    public static User userID(Long id, UserRepository repository) {
        Optional<User> opt = repository.findById(id);
        if (!opt.isPresent()) {
            throw new IllegalStateException("user not found");
        }
        User user = opt.get();
        return user;
    }
}
