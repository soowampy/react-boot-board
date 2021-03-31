package com.malgn.board.common.properties;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
public class FileUploadProperites {
    private Environment environment;
    public FileUploadProperites(Environment environment){
        this.environment = environment;
    }

    public String getUploadDir(){
        try {
            return environment.getProperty("file.upload.dir");
        } catch(Exception e) { return ""; }
    }

    public String getUploadWhiteList(){
        try {
            return environment.getProperty("file.upload.image.whiteList");
        } catch(Exception e) { return ""; }
    }

    public String getUploadLimitSize(){
        try {
            return environment.getProperty("file.upload-limit-size");
        } catch(Exception e) { return ""; }
    }


}
