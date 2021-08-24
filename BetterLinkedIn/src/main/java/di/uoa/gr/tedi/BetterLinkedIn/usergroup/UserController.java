package di.uoa.gr.tedi.BetterLinkedIn.usergroup;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;


import static java.util.Arrays.stream;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;


@RestController
public class UserController {

    private final UserService userService;
    @Autowired
    public UserController(UserService userService) {
        this.userService= userService;
    }

    @GetMapping("/api/v1/users")
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

    @GetMapping("/token/refresh")
    void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                String refresh_token = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refresh_token);
                String username = decodedJWT.getSubject();
                User user = (User)userService.loadUserByUsername(username);
                String access_token= JWT.create()
                        .withSubject(user.getUsername())
                        .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60000))
                        .withClaim("roles", user.getUserRole().toString())
                        .withIssuer(request.getRequestURL().toString())
                        .sign(algorithm);
                Map<String, String> tokens= new HashMap<>();
                tokens.put("access_token", access_token);
                tokens.put("refresh_token", refresh_token);
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);
            } catch (Exception exception) {
                response.setHeader("error", exception.getMessage());
                response.setStatus(FORBIDDEN.value());
                //response.sendError(FORBIDDEN.value());
                Map<String, String> error= new HashMap<>();
                error.put("error_message", exception.getMessage());
                response.setContentType(MimeTypeUtils.APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), response);
            }
        }
        else {
            throw new RuntimeException("Refresh token is missing!");
        }
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
