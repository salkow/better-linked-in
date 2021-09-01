package di.uoa.gr.tedi.BetterLinkedIn.usergroup;

import di.uoa.gr.tedi.BetterLinkedIn.Posts.Post;
import di.uoa.gr.tedi.BetterLinkedIn.Posts.PostRequest;
import di.uoa.gr.tedi.BetterLinkedIn.friends.*;
import di.uoa.gr.tedi.BetterLinkedIn.utils.ContactDetails;
import di.uoa.gr.tedi.BetterLinkedIn.utils.SkillsList;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private final static String USER_NOT_FOUND_MSG = "User with email %s not found";
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

    public void updateUserSkills(Authentication authentication, SkillsList skillsList) {
        Optional<User> opt = repository.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }

        User user = opt.get();
        UserSkills skills = new UserSkills(String.join(",", skillsList.getPersonalSkills()), skillsList.getDisplayable());

        user.setSkills(skills);
        repository.save(user);

    }

    public SkillsList readUserSkills(Authentication authentication) {
        Optional<User> opt = repository.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        return new SkillsList(opt.get().getSkills());
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
        for (User u : senders) {
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

    public List<ContactDetails> get_contacts(Authentication authentication) {
        Optional<User> optU = repository.findUserByEmail(authentication.getName());
        if (!optU.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User user = optU.get();
        List<Contact> list = new ArrayList<>(user.getContactList());
        list.addAll(user.getContactOf());

        List<ContactDetails> details = new ArrayList<>();
        for (Contact i : list) {
            ContactId cId = i.getId();
            Long id;
            String name;
            if (cId.getFriend1Id().equals(user.getId())) {
                id = cId.getFriend2Id();
                name = i.getFriend2Name();
            } else {
                id = cId.getFriend1Id();
                name = i.getFriend1Name();
            }
            details.add(new ContactDetails(id, name));
        }
        return details;
    }

    public List<Contact> get_contactsList(Authentication authentication) {
        Optional<User> optU = repository.findUserByEmail(authentication.getName());
        if (!optU.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User user = optU.get();
        return user.getContactList();
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
        List<Contact> contactList = get_contactsList(authentication);
        Optional<Contact> optC = contactList.stream().findFirst();
        if (!optC.isPresent()) {
            add_contact(authentication, id);
            optC = contactList.stream().findFirst();
            if (!optC.isPresent()) {
                throw new IllegalStateException("contact not found bug");
            }
        }
        Contact c = optC.get();
        c.addMessage(text, sender.getId(), sender.getFirstName() + " " + sender.getLastName());
        sender.setLastMessages(c);
        receiver.setLastMessages(c);
        contRepo.save(c);
        repository.save(sender);
    }

    public List<Message> get_messages(Authentication authentication, Long id) {
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
        List<Contact> contactList = get_contactsList(authentication);
        Optional<Contact> optC = contactList.stream().findFirst();
        if (!optC.isPresent()) {
            throw new IllegalStateException("Contact not found");
        }
        Contact c = optC.get();
        return c.getMessages();
    }

    public User one(Long id) {
        return repository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    }

    public Set<Post> get_MyPosts(Authentication authentication) {
        Optional<User> opt = repository.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User owner = opt.get();
        return owner.getPosts();
    }

    public void upload_post(Authentication authentication, PostRequest req) {
        Optional<User> opt = repository.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User user = opt.get();

        Post post = new Post(req.getText(), req.getMedia(), user);
        Set<Post> postsSet = user.getPosts();
        postsSet.add(post);
        repository.save(user);
    }

    public User one(Authentication authentication) {
        Optional<User> opt = repository.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        return opt.get();
    }

    public Long get_id(Authentication authentication) {
        Optional<User> opt = repository.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        return opt.get().getId();
    }

    public Boolean check_friend(Authentication authentication, Long id) {
        Optional<User> opt = repository.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User user = opt.get();

        Set<User> friends = new HashSet<>(user.getFriends());
        friends.addAll(user.getFriendOf());

        Optional<User> opt2 = repository.findById(id);
        if (!opt2.isPresent()) {
            throw new IllegalStateException("wrong id");
        }
        User user2 = opt2.get();

        return friends.contains(user2);
    }

    public String get_name(Authentication authentication) {
        Optional<User> opt = repository.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User user = opt.get();
        return user.getFirstName() + " " + user.getLastName();
    }

    public List<Message> get_lastMessages(Authentication authentication) {
        Optional<User> opt = repository.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User user = opt.get();
        return user.getLastMessages().getMessages();
    }

    public Set<Post> get_posts(Authentication authentication) {
        Optional<User> opt = repository.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User owner = opt.get();

        List<User> friends = new ArrayList<>(owner.getFriends());
        friends.addAll(owner.getFriendOf());
        Set<Post> postsOfFriends = new HashSet<>();
        for (User u : friends) {
            postsOfFriends.addAll(u.getPosts());
        }
        return postsOfFriends;
    }
}
