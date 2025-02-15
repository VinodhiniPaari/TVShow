package com.example.tvshowapi.utils;

import java.nio.file.*;
import java.util.List;
import java.io.IOException;

public class TVTitleFileReader {
    public static List<String> readTitlesFromFile(String filePath) throws IOException {
        return Files.readAllLines(Paths.get(filePath));
    }
}
