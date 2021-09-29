package di.uoa.gr.tedi.BetterLinkedIn.utils;

import di.uoa.gr.tedi.BetterLinkedIn.exceptions.UserNotFoundException;
import di.uoa.gr.tedi.BetterLinkedIn.usergroup.User;
import di.uoa.gr.tedi.BetterLinkedIn.usergroup.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

public class UserServiceHelper {

    private final static String USER_NOT_FOUND_MSG = "User with email %s not found";

    public static User userAuth(Authentication authentication, UserRepository repository) {
        Optional<User> opt = repository.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, authentication.getName()));
        }
        User user = opt.get();
        return user;
    }

    public static User userID(Long id, UserRepository repository) {
        Optional<User> opt = repository.findById(id);
        if (!opt.isPresent()) {
            throw new UserNotFoundException(id);
        }
        User user = opt.get();
        return user;
    }
}
