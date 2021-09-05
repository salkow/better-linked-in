package di.uoa.gr.tedi.BetterLinkedIn.registration;

import di.uoa.gr.tedi.BetterLinkedIn.usergroup.User;
import di.uoa.gr.tedi.BetterLinkedIn.usergroup.UserService;
import di.uoa.gr.tedi.BetterLinkedIn.utils.FileUploadUtil;
import di.uoa.gr.tedi.BetterLinkedIn.utils.UserServiceHelper;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final UserService userService;
    private final EmailValidator emailValidator;

    public void register(MultipartFile multipartFile, RegistrationRequest request) throws IOException {
        boolean isValidEmail = emailValidator.test(request.getEmail());
        if (!isValidEmail) {
            throw new IllegalStateException("email not valid");
        }

        String filename = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        User user =new User(request.getFirstName(), request.getLastName(), request.getPassword(), request.getEmail(), request.getPhone(), filename, request.getJob(), request.getCompany());
        Long id = userService.signUpUser(user);

        String uploadDir = "images\\" + user.getId()  + "\\";
        FileUploadUtil.saveFile(uploadDir, filename, multipartFile);

    }


    @Bean
    public UserServiceHelper userServiceHelper() {
        return new UserServiceHelper();
    }

/*    public void registerImage(MultipartFile multipartFile, String email) throws IOException{
        String filename = StringUtils.cleanPath(multipartFile.getOriginalFilename());

        User user = userService.saveProfilePhoto(filename, email);

        String uploadDir = "user-photos\\" + user.getId() + "\\";

        FileUploadUtil.saveFile(uploadDir, filename, multipartFile);
    }*/
}
