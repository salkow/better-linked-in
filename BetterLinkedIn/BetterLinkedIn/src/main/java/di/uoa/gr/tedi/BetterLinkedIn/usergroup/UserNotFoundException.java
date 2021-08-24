package di.uoa.gr.tedi.BetterLinkedIn.usergroup;

class UserNotFoundException extends RuntimeException {

    UserNotFoundException(Long id) {
        super("Could not find user " + id);
    }
}
