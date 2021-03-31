package com.malgn.board.util;

import org.imgscalr.Scalr;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

public class FileUtil {

    // 파일 리사이징
    public static String imageResize(File file, String filePath, String uploadDir, String imageType) throws Exception{
        BufferedImage originalImage = ImageIO.read(new File(filePath));
        int imgwidth = Math.min(originalImage.getHeight(),  originalImage.getWidth());
        int imgheight = imgwidth;

        BufferedImage scaledImage = Scalr.crop(originalImage, (originalImage.getWidth() - imgwidth)/2, (originalImage.getHeight() - imgheight)/2, imgwidth, imgheight, null);
        BufferedImage resizedImage = Scalr.resize(scaledImage, 350, 350, null);

        String thumbSavePath = uploadDir +makeFolderPath() + "thumbnail";

        File folder = new File(thumbSavePath);

        if(!folder.exists()) {
            folder.mkdirs();
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        UUID uid = UUID.randomUUID();

        thumbSavePath += File.separator+ "T"+ uid+"."+imageType;

        ImageIO.write(resizedImage, imageType, new File(thumbSavePath));

        thumbSavePath = "/image" +makeFolderPath()+"thumbnail/T"+ uid+"."+imageType;

        return thumbSavePath;
    }

    // 파일 리사이징
    public static String imageResize(MultipartFile  file, String filePath, String uploadDir, String imageType) throws Exception{
        BufferedImage originalImage = ImageIO.read(new File(filePath));
        int imgwidth = Math.min(originalImage.getHeight(),  originalImage.getWidth());
        int imgheight = imgwidth;

        BufferedImage scaledImage = Scalr.crop(originalImage, (originalImage.getWidth() - imgwidth)/2, (originalImage.getHeight() - imgheight)/2, imgwidth, imgheight, null);
        BufferedImage resizedImage = Scalr.resize(scaledImage, 350, 350, null);

        String thumbSavePath = uploadDir +makeFolderPath() + "thumbnail";

        File folder = new File(thumbSavePath);

        if(!folder.exists()) {
            folder.mkdirs();
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        UUID uid = UUID.randomUUID();

        thumbSavePath += File.separator+ "T"+ uid+"."+imageType;

        ImageIO.write(resizedImage, imageType, new File(thumbSavePath));

        thumbSavePath = "/image" +makeFolderPath()+"thumbnail/T"+ uid+"."+imageType;

        return thumbSavePath;
    }

    // 오늘날짜로 string 만들어주는 메소드
    public static String makeFolderPath(){
        Calendar cal = Calendar.getInstance();
        String year = String.valueOf(cal.get(Calendar.YEAR));
        String month = String.valueOf(cal.get(Calendar.MONTH) + 1);
        if(month.length()==1){
            month = "0"+month;
        }
        String day = String.valueOf(cal.get(Calendar.DAY_OF_MONTH));
        if(day.length()==1){
            day = "0"+day;
        }
        String path = "/" + year + "/" + month + "/" + day + "/";

        return path;
    }

}
