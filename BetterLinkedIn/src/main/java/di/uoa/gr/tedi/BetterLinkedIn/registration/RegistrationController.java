package di.uoa.gr.tedi.BetterLinkedIn.registration;

import di.uoa.gr.tedi.BetterLinkedIn.utils.UserServiceHelper;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/registration")
@AllArgsConstructor
@CrossOrigin
public class RegistrationController {

    private RegistrationService registrationService;

    @PostMapping
    public String register(@RequestBody RegistrationRequest request) {
        return registrationService.register(request);
    }

}


