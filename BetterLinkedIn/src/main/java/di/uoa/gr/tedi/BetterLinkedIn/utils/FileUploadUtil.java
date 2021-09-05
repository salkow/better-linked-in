package di.uoa.gr.tedi.BetterLinkedIn.utils;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

public class FileUploadUtil {

    public static void saveFile(String dir, String filename, MultipartFile multipartFile) throws IOException {
        Path path = Paths.get(dir);

        if (!Files.exists(path)) {
            Files.createDirectory(path);
        }

        try (InputStream inputStream = multipartFile.getInputStream()) {
            Path filePath = path.resolve(filename);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        }
        catch (IOException e) {
            throw new IOException("Could not save file: " + filename, e);
        }
    }
}
