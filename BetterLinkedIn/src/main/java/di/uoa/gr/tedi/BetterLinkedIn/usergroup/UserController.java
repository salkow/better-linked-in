package di.uoa.gr.tedi.BetterLinkedIn.usergroup;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService= userService;
    }

    @GetMapping("/users")
    List<User> all() {
        return userService.all();
    }

    @GetMapping("/perform_login")
    String login() {
        return "login";
    }

    @GetMapping("/")
    String index() {
        return "index";
    }


/*
    @GetMapping("/user")
    User one() {
        return repository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    }
*/

    @PutMapping("api/v1/userexperience")
    public void updateUserExperience(Authentication authentication, @RequestBody UserExperience userExperience) {
        userService.updateUserExperience(authentication, userExperience);

    }

    @GetMapping("api/v1/userexperience")
    public UserExperience readUserExperience(Authentication authentication) {
        return userService.readUserExperience(authentication);
    }

    @PutMapping("api/v1/usereducation")
    public void updateUserEducation(Authentication authentication, @RequestBody UserEducation userEducation) {
        userService.updateUserEducation(authentication, userEducation);

    }


}
