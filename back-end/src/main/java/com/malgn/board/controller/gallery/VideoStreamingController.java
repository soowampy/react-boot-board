package com.malgn.board.controller.gallery;

import com.malgn.board.domain.gallery.Files;
import com.malgn.board.service.gallery.GalleryService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.UrlResource;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.InetAddress;
import java.net.MalformedURLException;

import static org.apache.logging.log4j.util.Strings.isNotEmpty;


@RestController
public class VideoStreamingController {

    @Value("${server.port}")
    private String videoLocation;
    private final GalleryService gService;

    public VideoStreamingController(GalleryService gService) {
        this.gService = gService;
    }

    @GetMapping("/api/videos/{name}/full")
    public ResponseEntity<UrlResource> getFullVideo(@PathVariable String name) throws MalformedURLException {
        UrlResource video = new UrlResource("localhost:8800/"+name);
        return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
                .contentType(MediaTypeFactory.getMediaType(video).orElse(MediaType.APPLICATION_OCTET_STREAM))
                .body(video);
    }

    @GetMapping("/api/videos/{fileId}")
    public ResponseEntity<ResourceRegion> getVideo(@PathVariable String fileId,
                                                   @RequestHeader HttpHeaders headers, HttpServletRequest req) throws IOException {
        String protocol = req.getProtocol();
        String hostName= InetAddress.getLocalHost().getHostName();


//        String addr = req.getRemoteAddr();

        Files f = gService.getFileInfo(Integer.parseInt(fileId));
//        String path = "http://localhost:8800"+f.getPath();

        //String path = String.format("http://%s:%d%s", req.getRemoteHost(), req.getLocalPort(), f.getPath());
        String path="http://localhost:20002"+f.getPath();
        UrlResource video = new UrlResource(path);
        ResourceRegion region = resourceRegion(video, headers);
        return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
                .contentType(MediaTypeFactory.getMediaType(video).orElse(MediaType.APPLICATION_OCTET_STREAM))
                .body(region);
    }

    private ResourceRegion resourceRegion(UrlResource video, HttpHeaders headers) throws IOException {

        final long chunkSize = 10_000_000;
        long contentLength = video.contentLength();

        HttpRange httpRange = headers.getRange().stream().findFirst().get();

        HttpRange range = headers.getRange().stream().findAny().orElse(null);

        long start = 0;
        long end = 0;
        long rangeLength = Long.min(chunkSize, video.contentLength());

        if(httpRange != null) {
            start = httpRange.getRangeStart(contentLength);
            end = httpRange.getRangeEnd(contentLength);
            rangeLength = Long.min(chunkSize, end - start + 1);
            return new ResourceRegion(video, start, rangeLength);
        } else {
            rangeLength = Long.min(chunkSize, contentLength);
            return new ResourceRegion(video, 0, rangeLength);
        }
    }

}