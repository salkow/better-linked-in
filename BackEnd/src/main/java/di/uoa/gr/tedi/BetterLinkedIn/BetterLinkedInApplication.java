package di.uoa.gr.tedi.BetterLinkedIn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource("classpath:application.properties")
public class BetterLinkedInApplication {

	public static void main(String[] args) {
		SpringApplication application = new SpringApplication(BetterLinkedInApplication.class);
		//application.setAdditionalProfiles("ssl");
		application.run(args);
	}

}
