package di.uoa.gr.tedi.BetterLinkedIn.usergroup;

import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

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

    public UserEducation readUserEducation(Authentication authentication) {
        Optional<User> opt = repository.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        return opt.get().getEducation();
    }

    public void updateUserSkills(Authentication authentication, UserSkills userSkills) {
        Optional<User> opt = repository.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }

        User user = opt.get();
        user.setSkills(userSkills);
        repository.save(user);

    }

    public UserSkills readUserSkills(Authentication authentication) {
        Optional<User> opt = repository.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        return opt.get().getSkills();
    }

    public void sendFriendRequest(Authentication authentication, Long receiverId) {
        Optional<User> opt = repository.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User sender = opt.get();

        Optional<User> opt2 = repository.findById(receiverId);
        if (!opt2.isPresent()) {
            throw new IllegalStateException("user not found");
        }
        User receiver = opt2.get();

        UserConnectionRequest userConnectionRequest = new UserConnectionRequest(sender, receiver, false);

        sender.addConnectionRequest(userConnectionRequest);

        receiver.addConnectionRequestR(userConnectionRequest);

        repository.save(sender);
        repository.save(receiver);
    }

    public List<UserConnectionRequest> get_requestsSent(Authentication authentication) {
        Optional<User> opt = repository.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User user = opt.get();
        return repository.findFriendRequestsSent(user);
    }

    public List<UserConnectionRequest> get_requestsReceived(Authentication authentication) {
        Optional<User> opt = repository.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User user = opt.get();
        return repository.findFriendRequestsReceived(user);
    }

    public void accept_friendRequest(Authentication authentication, Long senderId) {
        Optional<User> optU1 = repository.findUserByEmail(authentication.getName());
        if (!optU1.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User user2 = optU1.get();


        Optional<User> optU2 = repository.findById(senderId);
        if (!optU2.isPresent()) {
            throw new IllegalStateException("wrong id");
        }
        User user1 = optU2.get();

        Optional<UserConnectionRequest> optReq = repository.findFriendRequestByUser(user1, user2);
        if (!optReq.isPresent()) {
            throw new IllegalStateException("wrong id");
        }
        UserConnectionRequest request = optReq.get();
        request.setIsAccepted(true);
        Set<User> friends1= user1.getFriends();
        friends1.add(user2);

        repository.save(user1);
        repository.save(user2);


    }

    public List<User> get_friends(Authentication authentication) {
        return repository.findAll();
    }
}
