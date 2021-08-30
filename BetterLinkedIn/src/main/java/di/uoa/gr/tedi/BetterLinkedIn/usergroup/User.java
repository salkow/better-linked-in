package di.uoa.gr.tedi.BetterLinkedIn.usergroup;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import di.uoa.gr.tedi.BetterLinkedIn.Posts.Post;
import di.uoa.gr.tedi.BetterLinkedIn.friends.Contact;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.*;

@Getter
@Setter
@Entity
public class User implements UserDetails {

    private @Id @GeneratedValue @NaturalId
    Long id;

    private String firstName;

    private String lastName;

    private String password;

    private String email;

    private String phone;

    private String photo;

    private String job;

    private String company;

    @Enumerated(EnumType.STRING)
    private UserRole userRole = UserRole.USER;

    @JsonIgnore
    private Boolean locked = false;

    @JsonIgnore
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
    @JsonIgnore
    private Set<UserConnectionRequest> connectionRequests= new HashSet<>();

    @OneToMany(mappedBy = "receiver", orphanRemoval = true)
    @JsonIgnore
    private Set<UserConnectionRequest> connectionRequestsR= new HashSet<>();

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name="tbl_friends",
            joinColumns=@JoinColumn(name="personId"),
            inverseJoinColumns=@JoinColumn(name="friendId")
    )
    @JsonIgnore
    private Set<User> friends = new HashSet<>();

    @ManyToMany(mappedBy = "friends")
    @JsonIgnore
    private Set<User> friendOf = new HashSet<>();

    @OneToMany(mappedBy = "friend1", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Contact> contactList= new ArrayList<>();

    @OneToMany(mappedBy = "friend2", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Contact> contactOf= new ArrayList<>();

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Post> posts= new HashSet<>();

    public User() {}

    public User(String firstName, String LastName, String password, String email, String phone, String photo, String job, String company) {
        this.firstName= firstName;
        this.lastName = LastName;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.photo = photo;
        this.experience= new UserExperience();
        this.education= new UserEducation();
        this.skills= new UserSkills();
        this.job= job;
        this.company= company;

    }

    public User(String firstName, String LastName, String password, String email, String phone, String photo, String job, String company, UserRole userRole) {
        this.firstName= firstName;
        this.lastName = LastName;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.photo = photo;
        this.userRole= userRole;
        this.job = job;
        this.company = company;

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

    public void addContact(Contact contact) {
        contactList.add(contact);
    }

    public void addContactOf(Contact contact) {
        contactOf.add(contact);
    }
}