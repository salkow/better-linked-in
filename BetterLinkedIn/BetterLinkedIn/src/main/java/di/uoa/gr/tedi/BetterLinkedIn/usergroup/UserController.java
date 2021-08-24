package di.uoa.gr.tedi.BetterLinkedIn.usergroup;

import di.uoa.gr.tedi.BetterLinkedIn.utils.AuthenticationRequest;
import di.uoa.gr.tedi.BetterLinkedIn.utils.JwtUtil;
import di.uoa.gr.tedi.BetterLinkedIn.utils.LogInResponse;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
public class UserController {

    private final UserService userService;
    private AuthenticationManager authenticationManager;
    private JwtUtil jwtUtil;

    @Autowired
    public UserController(UserService userService, AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.userService = userService;
        this.authenticationManager = new AuthenticationManager();
        this.jwtUtil = jwtUtil;
    }



    @GetMapping("/api/v1/users")
    List<User> all() {
        return userService.all();
    }

    @GetMapping("/perform_login")
    String login() {
        return "login";
    }

    @PostMapping("/perform_login")
    ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) {
        final Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                authenticationRequest.getUserName(), authenticationRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user=(User)authentication.getPrincipal();
        String jwtToken = jwtUtil.generateToken(user);

        LogInResponse response=new LogInResponse();
        response.setToken(jwtToken);


        return ResponseEntity.ok(response);
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

    @PutMapping("api/v1/experience")
    public void updateUserExperience(Authentication authentication, @RequestBody UserExperience userExperience) {
        userService.updateUserExperience(authentication, userExperience);

    }

    @GetMapping("api/v1/experience")
    public UserExperience readUserExperience(Authentication authentication) {
        return userService.readUserExperience(authentication);
    }

    @PutMapping("api/v1/education")
    public void updateUserEducation(Authentication authentication, @RequestBody UserEducation userEducation) {
        userService.updateUserEducation(authentication, userEducation);

    }

    @GetMapping("api/v1/education")
    public UserEducation readUserEducation(Authentication authentication) {
        return userService.readUserEducation(authentication);
    }

    @PutMapping("api/v1/skills")
    public void updateUserSkills(Authentication authentication, @RequestBody UserSkills userSkills) {
        userService.updateUserSkills(authentication, userSkills);

    }

    @GetMapping("api/v1/skills")
    public UserSkills readUserSkills(Authentication authentication) {
        return userService.readUserSkills(authentication);
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
    public List<UserConnectionRequest> get_requestsReceived(Authentication authentication) {
        return userService.get_requestsReceived(authentication);
    }

    @PutMapping("api/v1/friendRequestResponse/{senderid}")
    public void accept_friendRequest(Authentication authentication, @PathVariable("senderid") Long senderId) {
        userService.accept_friendRequest(authentication, senderId);
    }



}
