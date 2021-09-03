package di.uoa.gr.tedi.BetterLinkedIn.usergroup;

import di.uoa.gr.tedi.BetterLinkedIn.Posts.Comment;
import di.uoa.gr.tedi.BetterLinkedIn.Posts.Post;
import di.uoa.gr.tedi.BetterLinkedIn.Posts.PostRepository;
import di.uoa.gr.tedi.BetterLinkedIn.Posts.PostRequest;
import di.uoa.gr.tedi.BetterLinkedIn.friends.*;
import di.uoa.gr.tedi.BetterLinkedIn.utils.ContactDetails;
import di.uoa.gr.tedi.BetterLinkedIn.utils.Details;
import di.uoa.gr.tedi.BetterLinkedIn.utils.UserServiceHelper;
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
    private final UserServiceHelper helper = new UserServiceHelper();
    private final UserRepository userRepo;
    private final ContactRepository contRepo;
    private final PostRepository postRepo;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepo.findUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, email)));
    }

    public String signUpUser(User user) {
        boolean userExists = userRepo.findUserByEmail(user.getEmail()).isPresent();
        if (userExists) {
            throw new IllegalStateException("email already taken");
        }
        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());

        user.setPassword(encodedPassword);

        userRepo.save(user);

        return "";
    }


    public void update_userExperience(Authentication authentication, UserExperience personalExperience) {

        Optional<User> opt = userRepo.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }

        User user = opt.get();
        user.setExperience(personalExperience);
        userRepo.save(user);

    }

    public void updateUserEducation(Authentication authentication, UserEducation userEducation) {

        Optional<User> opt = userRepo.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }

        User user = opt.get();
        user.setEducation(userEducation);
        userRepo.save(user);

    }

    List<User> all() {
        return userRepo.findAll();
    }

    public UserExperience readUserExperience(Authentication authentication) {
        Optional<User> opt = userRepo.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        return opt.get().getExperience();

    }

    public UserEducation readUserEducation(Authentication authentication) {
        Optional<User> opt = userRepo.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        return opt.get().getEducation();
    }

    public void updateUserSkills(Authentication authentication, UserSkills skills) {
        Optional<User> opt = userRepo.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }

        User user = opt.get();

        user.setSkills(skills);
        userRepo.save(user);

    }

    public UserSkills readUserSkills(Authentication authentication) {
        Optional<User> opt = userRepo.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        return opt.get().getSkills();
    }

    public void sendFriendRequest(Authentication authentication, Long receiverId) {
        Optional<User> opt = userRepo.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User sender = opt.get();

        Optional<User> opt2 = userRepo.findById(receiverId);
        if (!opt2.isPresent()) {
            throw new IllegalStateException("user not found");
        }
        User receiver = opt2.get();

        UserConnectionRequest userConnectionRequest = new UserConnectionRequest(sender, receiver, false);

        sender.addConnectionRequest(userConnectionRequest);

        receiver.addConnectionRequestR(userConnectionRequest);

        userRepo.save(sender);
        userRepo.save(receiver);
    }

    public List<UserConnectionRequest> get_requestsSent(Authentication authentication) {
        Optional<User> opt = userRepo.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User user = opt.get();
        return userRepo.findFriendRequestsSent(user);
    }

    public List<FriendRequest> get_requestsReceived(Authentication authentication) {
        Optional<User> opt = userRepo.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User user = opt.get();
        List<User> senders = userRepo.findFriendRequestsReceived(user);
        List<FriendRequest> ids = new ArrayList();
        for (User u : senders) {
            ids.add(new FriendRequest(u.getId(), u.getFirstName() + " " + u.getLastName()));
        }
        return ids;
    }

    public void respond_friendRequest(Authentication authentication, Long senderId, boolean response) {
        Optional<User> optU1 = userRepo.findUserByEmail(authentication.getName());
        if (!optU1.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User receiver = optU1.get();

        Optional<User> optU2 = userRepo.findById(senderId);
        if (!optU2.isPresent()) {
            throw new IllegalStateException("wrong id");
        }
        User sender = optU2.get();
        //make sure request exists
        Optional<UserConnectionRequest> optReq = userRepo.findFriendRequestByUser(sender, receiver);
        if (!optReq.isPresent()) {
            throw new IllegalStateException("wrong id");
        }

        UserConnectionRequest req = optReq.get();
        //remove it from table, since it's not pending
        userRepo.removeFriendRequestByUsers(sender, receiver);
        sender.getConnectionRequests().remove(req);
        receiver.getConnectionRequestsR().remove(req);


        if (response) {
            Set<User> friends1 = sender.getFriends();
            friends1.add(receiver);
        }

        userRepo.save(sender);
        userRepo.save(receiver);
    }

    public List<Details> get_friends(Authentication authentication) {
        Optional<User> optU = userRepo.findUserByEmail(authentication.getName());
        if (!optU.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User user = optU.get();
        List<User> fr = new ArrayList<>(user.getFriends());
        fr.addAll(user.getFriendOf());
        List<Details> friendDetails = new ArrayList<>();
        for (User f: fr) {
            friendDetails.add(new Details(f));
        }
        return friendDetails;
    }

    public List<ContactDetails> get_contacts(Authentication authentication) {
        Optional<User> optU = userRepo.findUserByEmail(authentication.getName());
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
        Optional<User> optU = userRepo.findUserByEmail(authentication.getName());
        if (!optU.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User user = optU.get();
        List<Contact> contacts = new ArrayList<>(user.getContactList());
        contacts.addAll(user.getContactOf());
        return contacts;
    }

    public void add_contact(Authentication authentication, Long id) {
        Optional<User> optU1 = userRepo.findUserByEmail(authentication.getName());
        if (!optU1.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User sender = optU1.get();

        Optional<User> optU2 = userRepo.findById(id);
        if (!optU2.isPresent()) {
            throw new IllegalStateException("wrong id");
        }
        User receiver = optU2.get();

        Contact c = new Contact(sender, receiver);
        sender.addContact(c);
        userRepo.save(receiver);
        userRepo.save(sender);

    }

    public void send_message(Authentication authentication, Long id, String text) {
        Optional<User> optU1 = userRepo.findUserByEmail(authentication.getName());
        if (!optU1.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User sender = optU1.get();

        Optional<User> optU2 = userRepo.findById(id);
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
        userRepo.save(sender);
        userRepo.save(receiver);
    }

    public List<Message> get_messages(Authentication authentication, Long id) {
        Optional<User> optU1 = userRepo.findUserByEmail(authentication.getName());
        if (!optU1.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User sender = optU1.get();

        Optional<User> optU2 = userRepo.findById(id);
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
        return userRepo.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    }

    public Set<Post> get_MyPosts(Authentication authentication) {
        Optional<User> opt = userRepo.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User owner = opt.get();
        return owner.getPosts();
    }

    public void upload_post(Authentication authentication, PostRequest req) {
        Optional<User> opt = userRepo.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User user = opt.get();

        Post post = new Post(req.getText(), req.getMedia(), user);
        Set<Post> postsSet = user.getPosts();
        postsSet.add(post);
        userRepo.save(user);
    }

    public User one(Authentication authentication) {
        Optional<User> opt = userRepo.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        return opt.get();
    }

    public Long get_id(Authentication authentication) {
        Optional<User> opt = userRepo.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        return opt.get().getId();
    }

    public Boolean check_friend(Authentication authentication, Long id) {
        Optional<User> opt = userRepo.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User user = opt.get();

        Set<User> friends = new HashSet<>(user.getFriends());
        friends.addAll(user.getFriendOf());

        Optional<User> opt2 = userRepo.findById(id);
        if (!opt2.isPresent()) {
            throw new IllegalStateException("wrong id");
        }
        User user2 = opt2.get();

        return friends.contains(user2);
    }

    public String get_name(Authentication authentication) {
        Optional<User> opt = userRepo.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User user = opt.get();
        return user.getFirstName() + " " + user.getLastName();
    }

    public List<Message> get_lastMessages(Authentication authentication) {
        Optional<User> opt = userRepo.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User user = opt.get();
        return user.getLastMessages().getMessages();
    }

    public Set<Post> get_posts(Authentication authentication) {
        User owner = helper.userAuth(authentication, userRepo);

        List<User> friends = new ArrayList<>(owner.getFriends());
        friends.addAll(owner.getFriendOf());
        Set<Post> postsOfFriends = new HashSet<>();
        for (User u : friends) {
            postsOfFriends.addAll(u.getPosts());
        }
        return postsOfFriends;
    }

    public String get_email(Authentication authentication) {
        User user = helper.userAuth(authentication, userRepo);
        return user.getEmail();
    }


    public void update_email(Authentication authentication, String email) {
        User user = helper.userAuth(authentication, userRepo);
        Optional<User> opt = userRepo.findUserByEmail(email);
        if (opt.isPresent()) {
            throw new IllegalStateException("Email already used");
        }
        user.setEmail(email);
        userRepo.save(user);
    }

    public void update_password(Authentication authentication, String password) {
        User user = helper.userAuth(authentication, userRepo);
        String encodedPassword = bCryptPasswordEncoder.encode(password);

        user.setPassword(encodedPassword);
        userRepo.save(user);
    }

    public String get_nameById(Long id) {
        User user = helper.userID(id, userRepo);
        return user.getFirstName() + " " + user.getLastName();
    }

    public void comment(Authentication authentication, Long id, String text) {
        User user = helper.userAuth(authentication, userRepo);

        Optional<Post> opt = postRepo.findById(id);
        if (!opt.isPresent()) {
            throw new IllegalStateException("Post not found");
        }
        Post post = opt.get();

        Comment comment = new Comment(text, post, user);
        user.getCommentsMade().add(comment);
        postRepo.save(post);
        userRepo.save(user);
    }
}
