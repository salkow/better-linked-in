package di.uoa.gr.tedi.BetterLinkedIn.usergroup;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

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
    @Embedded
    @AttributeOverrides({
            @AttributeOverride( name = "displayable", column = @Column(name = "experience_displayable")),
            @AttributeOverride(name = "text", column = @Column(name = "experience_text"))
    })

    private UserExperience experience;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "displayable", column = @Column(name = "education_displayable")),
            @AttributeOverride(name = "text", column = @Column(name = "education_text"))
    })
    private UserEducation education;
    @Embedded
    @AttributeOverride(name = "displayable", column = @Column(name = "skills_displayable"))
    private UserSkills skills;

    @OneToMany(mappedBy = "sender", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("sender")
    private Set<UserConnectionRequest> connectionRequests= new HashSet<>();
    @OneToMany(mappedBy = "receiver", orphanRemoval = true)
    @JsonIgnoreProperties("receiver")
    private Set<UserConnectionRequest> connectionRequestsR= new HashSet<>();
    @ManyToMany
    @JoinTable(name="tbl_friends",
            joinColumns=@JoinColumn(name="personId"),
            inverseJoinColumns=@JoinColumn(name="friendId")
    )
    @JsonIgnore
    private Set<User> friends = new HashSet<>();
    @ManyToMany
    @JoinTable(name="tbl_friends",
            joinColumns=@JoinColumn(name="friendId"),
            inverseJoinColumns=@JoinColumn(name="personId")
    )
    @JsonIgnore
    private Set<User> friendOf = new HashSet<>();

    public User() {}

    public User(String firstName, String LastName, String password, String email, String phone, String photo) {
        this.firstName= firstName;
        this.lastName = LastName;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.photo = photo;
        this.experience= new UserExperience();
        this.education= new UserEducation();
        this.skills= new UserSkills();

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

    public void addConnectionRequest(UserConnectionRequest userConnectionRequest) {
        connectionRequests.add(userConnectionRequest);
    }

    public void addConnectionRequestR(UserConnectionRequest userConnectionRequest) {
        connectionRequestsR.add(userConnectionRequest);
    }
}