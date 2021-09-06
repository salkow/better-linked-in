package di.uoa.gr.tedi.BetterLinkedIn.usergroup;

import di.uoa.gr.tedi.BetterLinkedIn.Posts.*;
import di.uoa.gr.tedi.BetterLinkedIn.adverts.Advert;
import di.uoa.gr.tedi.BetterLinkedIn.adverts.AdvertDTO;
import di.uoa.gr.tedi.BetterLinkedIn.adverts.AdvertRequest;
import di.uoa.gr.tedi.BetterLinkedIn.friends.*;
import di.uoa.gr.tedi.BetterLinkedIn.utils.*;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    public Long signUpUser(User user) {
        boolean userExists = userRepo.findUserByEmail(user.getEmail()).isPresent();
        if (userExists) {
            throw new IllegalStateException("email already taken");
        }
        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());

        user.setPassword(encodedPassword);

        userRepo.save(user);

        return user.getId();
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

    List<FriendDTO> all() {

        List<User> list = userRepo.findAll();
        List<FriendDTO> ret = new ArrayList<>();
        for (User i: list) {
            ret.add(new FriendDTO(i));
        }
        return ret;
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

    public List<FriendDTO> get_friends(Authentication authentication) {
        Optional<User> optU = userRepo.findUserByEmail(authentication.getName());
        if (!optU.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User user = optU.get();
        List<User> fr = new ArrayList<>(user.getFriends());
        fr.addAll(user.getFriendOf());
        List<FriendDTO> friendDetails = new ArrayList<>();
        for (User f: fr) {
            friendDetails.add(new FriendDTO(f));
        }
        return friendDetails;
    }

    public List<ContactDTO> get_contacts(Authentication authentication) {
        User user = UserServiceHelper.userAuth(authentication, userRepo);

        List<User> list = new ArrayList<>(user.getFriends());
        list.addAll(user.getFriendOf());

        List<ContactDTO> details = new ArrayList<>();
        for (User i : list) {
            details.add(new ContactDTO(i.getId(), i.getFirstName() + " "  + i.getLastName()));
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
        User sender = UserServiceHelper.userAuth(authentication, userRepo);

        User receiver = UserServiceHelper.userID(id, userRepo);
        Contact c = new Contact(sender, receiver);
        List<Contact> contacts = new ArrayList<>(sender.getContactList());
        contacts.addAll(sender.getContactOf());

        if (contacts.contains(c)) {
            // contact already exists
            return;
        }

        sender.addContact(c);
        userRepo.save(receiver);
        userRepo.save(sender);

    }

    public void send_message(Authentication authentication, Long id, WString WText) {
        User sender = UserServiceHelper.userAuth(authentication, userRepo);

        User receiver = UserServiceHelper.userID(id, userRepo);

        if (sender.getId() == receiver.getId()) {
            throw new IllegalStateException("Same user");
        }
        String text = WText.getText();
        text = text.replaceAll("\"", "");

        Contact temp = new Contact(sender, receiver);
        List<Contact> contactList = get_contactsList(authentication);
        int index = contactList.indexOf(temp);
        if (index == -1) {
            throw new IllegalStateException("contact not found bug");
        }
        Contact c = contactList.get(index);
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

    public List<Post> get_MyPosts(Authentication authentication) {
        Optional<User> opt = userRepo.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User owner = opt.get();
        return owner.getPosts();
    }

    public void upload_post(Authentication authentication, String text, MultipartFile file, String typeOfMedia) throws IOException {
        System.out.println(typeOfMedia);
        Optional<User> opt = userRepo.findUserByEmail(authentication.getName());
        if (!opt.isPresent()) {
            throw new IllegalStateException("authentication failed");
        }
        User user = opt.get();

        String filename = "";
        if (file != null &&!file.isEmpty()) {
            filename = StringUtils.cleanPath(file.getOriginalFilename());
        }

        Post post = new Post(text, filename, typeOfMedia, user);

        postRepo.save(post);

        List<Post> postsList = user.getPosts();
        postsList.add(post);
        userRepo.save(user);

        if (file != null && !file.isEmpty()) {
            String uploadDir = "images\\post_" + post.getId() + "\\";
            FileUploadUtil.saveFile(uploadDir, filename, file);
        }



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
            return null;
        }
        User user = opt.get();
        return user.getLastMessages().getMessages();
    }

    public List<Post> get_posts(Authentication authentication) {
        User owner = helper.userAuth(authentication, userRepo);

        List<User> friends = new ArrayList<>(owner.getFriends());
        friends.addAll(owner.getFriendOf());
        List<Post> postsOfFriends = new LinkedList<>();
        for (User u : friends) {
            postsOfFriends.addAll(0, u.getPosts());
        }
        return postsOfFriends;
    }

    public String get_email(Authentication authentication) {
        User user = helper.userAuth(authentication, userRepo);
        return user.getEmail();
    }


    public void update_email(Authentication authentication, String email) {
        User user = helper.userAuth(authentication, userRepo);
        email = email.replaceAll("\"", "");
        Optional<User> opt = userRepo.findUserByEmail(email);
        if (opt.isPresent()) {
            throw new IllegalStateException("Email already used");
        }


        Collection<SimpleGrantedAuthority> nowAuthorities =(Collection<SimpleGrantedAuthority>)SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        UsernamePasswordAuthenticationToken newAuth = new UsernamePasswordAuthenticationToken(email, null, nowAuthorities);
        SecurityContextHolder.getContext().setAuthentication(newAuth);

        user.setEmail(email);
        userRepo.save(user);

    }

    public void update_password(Authentication authentication, String password) {
        User user = helper.userAuth(authentication, userRepo);

        password = password.replaceAll("\"", "");
        String encodedPassword = bCryptPasswordEncoder.encode(password);

        user.setPassword(encodedPassword);
        userRepo.save(user);
    }

    public String get_nameById(Long id) {
        User user = helper.userID(id, userRepo);
        return user.getFirstName() + " " + user.getLastName();
    }

    public void comment(Authentication authentication, Long id, WString WText) {
        User user = helper.userAuth(authentication, userRepo);

        Optional<Post> opt = postRepo.findById(id);
        if (!opt.isPresent()) {
            throw new IllegalStateException("Post not found");
        }
        Post post = opt.get();
        String text= WText.getText();

        Comment comment = new Comment(text, post, user);
        user.getCommentsMade().add(comment);

        User postOwner = post.getOwner();
        if (!postOwner.getId().equals(user.getId())) {
            Notification notification = new Notification(postOwner, comment);
            postOwner.getNotifications().add(notification);
        }

        postRepo.save(post);
        userRepo.save(user);
    }



    public void like(Authentication authentication, Long id) {
        User user = UserServiceHelper.userAuth(authentication, userRepo);

        Optional<Post> opt = postRepo.findById(id);
        if (!opt.isPresent()) {
            throw new IllegalStateException("Post not found");
        }
        Post post = opt.get();

        Like like = new Like(user, post);


        Set<Like> userLikes = user.getLikes();
        userLikes.add(like);

        User postOwner = post.getOwner();
        if (!postOwner.getId().equals(user.getId())) {
            Notification notification = new Notification(postOwner, like);
            postOwner.getNotifications().add(notification);
        }

        userRepo.save(user);
        postRepo.save(post);
    }

    public List<Like> get_postLikes(Authentication authentication, Long id) {
        //User user = UserServiceHelper.userAuth(authentication, userRepo);

        Optional<Post> opt = postRepo.findById(id);
        if (!opt.isPresent()) {
            throw new IllegalStateException("Post not found");
        }
        Post post = opt.get();


        return post.getLikes();
    }

    public List<Comment> get_comments(Authentication authentication, Long id) {
        Optional<Post> opt = postRepo.findById(id);
        if (!opt.isPresent()) {
            throw new IllegalStateException("Post not found");
        }
        Post post = opt.get();

        return post.getComments();
    }

    public Long get_lastContactId(Authentication authentication) {
        User user = UserServiceHelper.userAuth(authentication, userRepo);

        Contact lastContact = user.getLastMessages();
        if (lastContact == null) {
            if (!user.getFriends().isEmpty()) {
                return user.getFriends().iterator().next().getId();
            }
            else if (!user.getFriendOf().isEmpty()) {
                return user.getFriendOf().iterator().next().getId();
            }
            else return null;
        }
        ContactId cId = lastContact.getId();
        if (cId.getFriend1Id().equals(user.getId())) {
            return cId.getFriend2Id();
        }
        else {
            return cId.getFriend1Id();
        }
    }

    public List<Notification> get_notifications(Authentication authentication) {
        User user = UserServiceHelper.userAuth(authentication, userRepo);

        return user.getNotifications();
    }

    public void upload_advert(Authentication authentication, AdvertRequest request) {
        User user = UserServiceHelper.userAuth(authentication, userRepo);

        Advert advert = new Advert(request.getTitle(), request.getText(), request.getSkills(), user);

        user.getMyAdverts().add(advert);

        userRepo.save(user);

    }

    public List<AdvertDTO> get_myAdverts(Authentication authentication) {
        User user = UserServiceHelper.userAuth(authentication, userRepo);

        List<AdvertDTO> advDTO = new ArrayList<>();
        List<Advert> adv = user.getMyAdverts();
        for (Advert i : adv) {
            advDTO.add(new AdvertDTO(i.getId(), i.getTitle(), i.getText(), i.getApplicants()));
        }
        return advDTO;
    }

    public List<AdvertDTO> get_adverts(Authentication authentication) {
        User user = UserServiceHelper.userAuth(authentication, userRepo);

        List<User> friends = new ArrayList<>(user.getFriends());
        friends.addAll(user.getFriendOf());




        List<Advert> adverts = new ArrayList<>();
        for (User u: friends) {
            adverts.addAll(u.getMyAdverts());
        }
        adverts.removeAll(user.getAdvertsApplied());

        List<AdvertDTO> advertsDTO = new ArrayList<>();
        for (Advert i : adverts) {
            advertsDTO.add(new AdvertDTO(i.getId(), i.getTitle(), i.getText(), i.getApplicants()));
        }

        return advertsDTO;
    }

    public List<ContactDTO> searchUser(Authentication authentication, String searchParameter) {
        List<User> results = userRepo.searchUserByName(searchParameter.toUpperCase());
        List<ContactDTO> ret = new ArrayList<>();
        for (User i: results) {
            ret.add(new ContactDTO(i.getId(), i.getFirstName() + " "  +i.getLastName()));
        }
        return ret;
    }
}
