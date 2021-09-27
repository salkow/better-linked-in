package di.uoa.gr.tedi.BetterLinkedIn.registration;

import di.uoa.gr.tedi.BetterLinkedIn.utils.UserServiceHelper;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping(path = "api/v1/registration")
@AllArgsConstructor
@CrossOrigin
public class RegistrationController {

    private RegistrationService registrationService;
/*

    @PostMapping
    public void register(@RequestBody RegistrationRequest request) {
        registrationService.register(request);
    }
*/

    @PostMapping
    public void register(@RequestParam("photo") MultipartFile multipartFile, @RequestParam("email") String email,
                         @RequestParam("firstName") String firstName ,@RequestParam("lastName") String lastName, @RequestParam("password") String password, @RequestParam("phone") String phone,
    @RequestParam("job") String job, @RequestParam("company") String company) throws IOException {
        RegistrationRequest request = new RegistrationRequest(firstName, lastName, password, email, phone, job, company);
        registrationService.register(multipartFile, request);
    }

}


