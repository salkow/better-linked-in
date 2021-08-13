package di.uoa.gr.tedi.BetterLinkedIn.usergroup;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private final static String USER_NOT_FOUND_MSG= "User with email %s not found";
    private final UserRepository repository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return repository.findUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, email)));
    }

    public String signUpUser(User user) {
        boolean userExists = repository.findUserByEmail(user.getEmail()).isPresent();
        if (userExists) {
            throw new IllegalStateException("email already taken");
        }
        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());

        user.setPassword(encodedPassword);

        repository.save(user);

        return "";
    }


    public void updateUserExperience(Authentication authentication, UserExperience personalExperience) {

        Optional<User> opt = repository.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }

        User user = opt.get();
        user.setExperience(personalExperience);
        repository.save(user);

    }

    public void updateUserEducation(Authentication authentication, UserEducation userEducation) {

        Optional<User> opt = repository.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }

        User user = opt.get();
        user.setEducation(userEducation);
        repository.save(user);

    }

    List<User> all() {
        return repository.findAll();
    }

    public UserExperience readUserExperience(Authentication authentication) {
        Optional<User> opt = repository.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        return opt.get().getExperience();

    }
}
