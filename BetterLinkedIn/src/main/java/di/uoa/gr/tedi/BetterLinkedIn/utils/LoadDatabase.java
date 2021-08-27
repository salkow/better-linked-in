package di.uoa.gr.tedi.BetterLinkedIn.utils;

import di.uoa.gr.tedi.BetterLinkedIn.usergroup.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
public class LoadDatabase {

    @Bean
    CommandLineRunner initDatabase(UserService userService) {
        return args -> {
            //log.info("Preloading " + userService.signUpUser(new User("Bilbo", "Baggins", "pss", "bilbo@gmail.com", "+306666666", "baggins.jpeg", UserRole.ADMIN)));
        };
    }
}
