package di.uoa.gr.tedi.BetterLinkedIn.usergroup;

import di.uoa.gr.tedi.BetterLinkedIn.friends.Contact;
import di.uoa.gr.tedi.BetterLinkedIn.friends.ContactRepository;
import di.uoa.gr.tedi.BetterLinkedIn.friends.FriendRequest;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

import static java.util.Arrays.stream;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private final static String USER_NOT_FOUND_MSG= "User with email %s not found";
    private final UserRepository repository;
    private final ContactRepository contRepo;
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


    public void update_userExperience(Authentication authentication, UserExperience personalExperience) {

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

    public List<FriendRequest> get_requestsReceived(Authentication authentication) {
        Optional<User> opt = repository.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User user = opt.get();
        List<User> senders = repository.findFriendRequestsReceived(user);
        List<FriendRequest> ids = new ArrayList();
        for(User u : senders) {
            ids.add(new FriendRequest(u.getId(), u.getFirstName() + " " + u.getLastName()));
        }
        return ids;
    }

    public void respond_friendRequest(Authentication authentication, Long senderId, boolean response) {
        Optional<User> optU1 = repository.findUserByEmail(authentication.getName());
        if (!optU1.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User receiver = optU1.get();

        Optional<User> optU2 = repository.findById(senderId);
        if (!optU2.isPresent()) {
            throw new IllegalStateException("wrong id");
        }
        User sender = optU2.get();
        //make sure request exists
        Optional<UserConnectionRequest> optReq = repository.findFriendRequestByUser(sender, receiver);
        if (!optReq.isPresent()) {
            throw new IllegalStateException("wrong id");
        }

        UserConnectionRequest req = optReq.get();
        //remove it from table, since it's not pending
        repository.removeFriendRequestByUsers(sender, receiver);
        sender.getConnectionRequests().remove(req);
        receiver.getConnectionRequestsR().remove(req);


        if (response) {
            Set<User> friends1 = sender.getFriends();
            friends1.add(receiver);
        }

        repository.save(sender);
        repository.save(receiver);
    }

    public Set<User> get_friends(Authentication authentication) {
        Optional<User> optU = repository.findUserByEmail(authentication.getName());
        if (!optU.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User user = optU.get();
        return repository.findFriends(user);
    }

    public List<Contact> get_contacts(Authentication authentication) {
        Optional<User> optU = repository.findUserByEmail(authentication.getName());
        if (!optU.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User user = optU.get();
        List<Contact> list = new ArrayList<>(user.getContactList());
        list.addAll(user.getContactOf());
        return list;
    }

    public List<Contact> get_contactOf(Authentication authentication) {
        Optional<User> optU = repository.findUserByEmail(authentication.getName());
        if (!optU.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User user = optU.get();
        return user.getContactOf();
    }

    public void add_contact(Authentication authentication, Long id) {
        Optional<User> optU1 = repository.findUserByEmail(authentication.getName());
        if (!optU1.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User sender = optU1.get();

        Optional<User> optU2 = repository.findById(id);
        if (!optU2.isPresent()) {
            throw new IllegalStateException("wrong id");
        }
        User receiver = optU2.get();

        Contact c = new Contact(sender, receiver);
        sender.addContact(c);
        repository.save(receiver);
        repository.save(sender);

    }

    public void send_message(Authentication authentication, Long id, String text) {
        Optional<User> optU1 = repository.findUserByEmail(authentication.getName());
        if (!optU1.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User sender = optU1.get();

        Optional<User> optU2 = repository.findById(id);
        if (!optU2.isPresent()) {
            throw new IllegalStateException("wrong id");
        }
        User receiver = optU2.get();

        Contact temp = new Contact(sender, receiver);
        List<Contact> contactList = get_contacts(authentication);
        Optional<Contact> optC = contactList.stream().findFirst();
        if (!optC.isPresent()) {
            throw new IllegalStateException("Contact not found");
        }
        Contact c = optC.get();
        c.addMessage(text, sender.getFirstName() + " " + sender.getLastName(), sender.getId());
        contRepo.save(c);
        repository.save(sender);
    }
}
