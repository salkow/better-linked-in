package di.uoa.gr.tedi.BetterLinkedIn.usergroup;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
public class LoadDatabase {

    @Bean
    CommandLineRunner initDatabase(UserRepository repository) {
        return args -> {
            //log.info("Preloading " + repository.save(new User("Bilbo Baggins", "burglar", "bilbo@gmail.com")));
        };
    }
}
