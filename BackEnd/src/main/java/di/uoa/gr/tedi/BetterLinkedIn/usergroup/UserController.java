package di.uoa.gr.tedi.BetterLinkedIn.usergroup;

import di.uoa.gr.tedi.BetterLinkedIn.posts.*;
import di.uoa.gr.tedi.BetterLinkedIn.utils.AdvertDTO;
import di.uoa.gr.tedi.BetterLinkedIn.adverts.AdvertRequest;
import di.uoa.gr.tedi.BetterLinkedIn.friends.FriendRequest;
import di.uoa.gr.tedi.BetterLinkedIn.friends.Message;
import di.uoa.gr.tedi.BetterLinkedIn.utils.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;


import static java.util.Arrays.stream;


@RestController
@CrossOrigin
public class UserController {

    private final UserService userService;
    @Autowired
    public UserController(UserService userService) {
        this.userService= userService;
    }

    @GetMapping("/api/v1/users")
    List<FriendDTO> all() {
        return userService.all();
    }



    @GetMapping("api/v1/user")
    PersonalDetailsDTO one(Authentication authentication) {

        User user = userService.one(authentication);
        if (user != null) {
            PersonalDetailsDTO details = new PersonalDetailsDTO();
            details.user_to_details(user);
            return details;
        }
        else return null;
    }


    @GetMapping("api/v1/user/{id}")
    PersonalDetailsDTO one(@PathVariable("id") Long id) {

        User user = userService.one(id);
        if (user != null) {
            PersonalDetailsDTO details = new PersonalDetailsDTO();
            details.user_to_details(user);
            if (!details.getEducationDisplayable()) {
                details.setEducationText(" ");
            }
            if (!details.getExperienceDisplayable()) {
                details.setExperienceText(" ");
            }
            if (!details.getSkillsDisplayable()) {
                details.setSkillsText(" ");
            }
            return details;
        }
        else return null;
    }

    @GetMapping("api/v1/id")
    public Long get_id(Authentication authentication) {
        return userService.get_id(authentication);
    }

    @GetMapping("api/v1/name")
    public String get_name(Authentication authentication) {
        return userService.get_name(authentication);
    }

    @GetMapping("api/v1/name/{id}")
    public String get_nameById(@PathVariable("id") Long id) {
        return userService.get_nameById(id);
    }

    @GetMapping("api/v1/email")
    public String get_email(Authentication authentication) {
        return userService.get_email(authentication);
    }

    @PutMapping("api/v1/email")
    public void update_email(Authentication authentication, @RequestBody String email) {
        userService.update_email(authentication, email);
    }

    @PutMapping("api/v1/password")
    public void update_password(Authentication authentication, @RequestBody String password) {
        userService.update_password(authentication, password);
    }

    @PutMapping("api/v1/experience")
    public void updateUserExperience(Authentication authentication, @RequestBody UserExperience userExperience) {
        userService.update_userExperience(authentication, userExperience);

    }


    @PutMapping("api/v1/education")
    public void updateUserEducation(Authentication authentication, @RequestBody UserEducation userEducation) {
        userService.updateUserEducation(authentication, userEducation);
    }


    @PutMapping("api/v1/skills")
    public void updateUserSkills(Authentication authentication, @RequestBody UserSkills skills) {
        userService.updateUserSkills(authentication, skills);
    }


    @PutMapping("api/v1/friendRequest/{receiverid}")
    public void sendFriendRequest(Authentication authentication, @PathVariable("receiverid") Long receiverId) {
        userService.sendFriendRequest(authentication, receiverId);
    }

    @GetMapping("api/v1/friendRequestsSent")
    public List<UserConnectionRequest> get_requestsSent(Authentication authentication) {
        return userService.get_requestsSent(authentication);
    }

    @GetMapping("api/v1/friendRequestsReceived")
    public List<FriendRequest> get_requestsReceived(Authentication authentication) {
        return userService.get_requestsReceived(authentication);
    }

    @PutMapping("api/v1/friendRequestResponse/{senderid}")
    public void accept_friendRequest(Authentication authentication, @PathVariable("senderid") Long senderId, @RequestBody WBool wrapper) {
        userService.respond_friendRequest(authentication, senderId, wrapper.getResponse());
    }

    @GetMapping("api/v1/friends")
    public List<FriendDTO> get_friends(Authentication authentication) {
        return userService.get_friends(authentication);
    }

    @GetMapping("api/v1/checkFriend/{id}")
    public Boolean check_friend(Authentication authentication, @PathVariable("id") Long id) {

        return userService.check_friend(authentication, id);
    }

    @GetMapping("api/v1/contacts")
    public List<ContactDTO> get_contacts(Authentication authentication) {
        return userService.get_contacts(authentication);
    }


    @PutMapping("api/v1/sendMessage/{receiverId}")
    public void send_message(Authentication authentication, @PathVariable("receiverId") Long id, @RequestBody WString Wtext) {
        userService.send_message(authentication, id, Wtext);
    }

    @GetMapping("api/v1/messages/{receiverId}")
    public List<Message> get_messages(Authentication authentication, @PathVariable("receiverId") Long id) {
        return userService.get_messages(authentication, id);
    }

    @GetMapping("api/v1/messages")
    public List<Message> get_messages(Authentication authentication) {
        return userService.get_lastMessages(authentication);
    }

    @GetMapping("api/v1/myPosts")
    public List<Post> get_MyPosts(Authentication authentication) {
        return userService.get_MyPosts(authentication);
    }

    @GetMapping("api/v1/posts")
    public List<Post> get_posts(Authentication authentication) {
        return userService.get_posts(authentication);
    }

    @PostMapping("api/v1/post")
    public void upload_post(Authentication authentication, @RequestParam String text, @RequestParam @Nullable MultipartFile media, @RequestParam String typeOfMedia) throws IOException {
        userService.upload_post(authentication, text, media, typeOfMedia);
    }

    @PutMapping("api/v1/comment/{post_id}")
    public void comment(Authentication authentication, @PathVariable("post_id") Long id, @RequestBody WString WText) {
        userService.comment(authentication, id, WText);
    }

    @GetMapping("api/v1/comment/{post_id}")
    public List<Comment> get_comments(Authentication authentication, @PathVariable("post_id") Long id) {
        return userService.get_comments(authentication, id);
    }

    @PutMapping("api/v1/like/{post_id}")
    public void like(Authentication authentication, @PathVariable("post_id") Long id) {
        userService.like(authentication, id);
    }

    @GetMapping("api/v1/postLikes/{post_id}")
    public List<Like> get_postLikes(Authentication authentication, @PathVariable("post_id") Long id) {
        return userService.get_postLikes(authentication, id);
    }

    @GetMapping("api/v1/lastContactId")
    public Long get_lastContactId(Authentication authentication) {
        return userService.get_lastContactId(authentication);
    }

    @GetMapping("api/v1/notifications")
    public List<Notification> get_notifications(Authentication authentication) {
        return userService.get_notifications(authentication);
    }

    @PostMapping("api/v1/advert")
    public void upload_advert(Authentication authentication, @RequestBody AdvertRequest request) {
        userService.upload_advert(authentication, request);
    }

    @GetMapping("api/v1/myAdverts")
    public List<AdvertDTO> get_myAdverts(Authentication authentication) {
        return userService.get_myAdverts(authentication);
    }

    @GetMapping("api/v1/adverts")
    public List<AdvertDTO> get_adverts(Authentication authentication) {
        return userService.get_adverts(authentication);
    }

    @PutMapping("api/v1/apply/{advert_id}")
    public void apply_advert(Authentication authentication, @PathVariable("advert_id") Long id) {
        userService.apply_advert(authentication, id);
    }

    @PostMapping("api/v1/search")
    public List<ContactDTO> searchUser(Authentication authentication, @RequestBody WString searchParameter) {
        return userService.searchUser(authentication, searchParameter.getText());
    }
}
