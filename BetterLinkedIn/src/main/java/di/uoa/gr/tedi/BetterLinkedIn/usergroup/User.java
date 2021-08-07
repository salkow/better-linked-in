package di.uoa.gr.tedi.BetterLinkedIn.usergroup;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;

@Getter
@Setter
@Entity
public class User implements UserDetails {

    private @Id @GeneratedValue Long id;
    private String firstName;
    private String lastName;
    private String password;
    private String email;
    private String phone;
    private String photo;
    @Enumerated(EnumType.STRING)
    private UserRole userRole = UserRole.USER;
    private Boolean locked = false;
    private Boolean enabled = true;

    public User() {}

    public User(String firstName, String LastName, String password, String email, String phone, String photo) {
        this.firstName= firstName;
        this.lastName = LastName;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.photo = photo;
    }

    public User(String firstName, String LastName, String password, String email, String phone, String photo, UserRole userRole) {
        this.firstName= firstName;
        this.lastName = LastName;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.photo = photo;
        this.userRole= userRole;
    }



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority= new SimpleGrantedAuthority(userRole.name());

        return Collections.singletonList(authority);
    }

    @Override
    public String getUsername() {
        return email;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}