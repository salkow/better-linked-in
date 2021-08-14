package di.uoa.gr.tedi.BetterLinkedIn.security.config;

import di.uoa.gr.tedi.BetterLinkedIn.security.PasswordEncoder;
import di.uoa.gr.tedi.BetterLinkedIn.usergroup.UserService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configurers.userdetails.DaoAuthenticationConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@AllArgsConstructor
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserService userService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                    .configurationSource(request -> new CorsConfiguration()
                    .applyPermitDefaultValues())
                    .and()
                .csrf().disable()
                .authorizeRequests()
                    .antMatchers("/api/v*/registration/**", "/perform_login")
                    .permitAll()
                    .anyRequest()
                    .authenticated()
                    .and()
                .formLogin()
                    .loginPage("http://localhost:3000/sign-in")
                    .loginProcessingUrl("/perform_login")
                    .defaultSuccessUrl("http:localhost:3000/")
                    .failureHandler((req, res, exp) -> {
                        String errMsg= "";
                        if (exp.getClass().isAssignableFrom(BadCredentialsException.class)) {
                            errMsg+= "Invalid email or password";
                        }
                        else {
                            errMsg+= "Unknown Error";
                        }
                        req.getSession().setAttribute("message", errMsg);
                        res.sendRedirect("/perform_login");
                    })
                .permitAll();

    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(daoAuthenticationProvider());
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(bCryptPasswordEncoder);
        provider.setUserDetailsService(userService);
        return provider;
    }

}
