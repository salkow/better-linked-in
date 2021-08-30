package di.uoa.gr.tedi.BetterLinkedIn.Posts;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class PostRequest {
    private final String title;
    private final String text;
    private final String media;
}
