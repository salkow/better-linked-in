package di.uoa.gr.tedi.BetterLinkedIn.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@AllArgsConstructor
public class WString {
    private final String text;

    public WString() {
        text= "";
    }

}
