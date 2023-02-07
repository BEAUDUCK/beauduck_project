package com.ssafy.beauduckmakeup.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.FileItem;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

@Slf4j
@RequiredArgsConstructor
@Service
public class AwsS3Service {

  private final AmazonS3Client amazonS3Client;

//  @Value("${cloud.aws.s3.bucket}")
  private String S3Bucket = "ssafybeauduck"; // Bucket 이름

  public String uploadFileV1(MultipartFile multipartFile) throws Exception{
    String originalName = multipartFile.getOriginalFilename(); // 파일 이름
    long size = multipartFile.getSize(); // 파일 크기
    System.out.println("File Name: "+originalName+" File size: "+size);

    ObjectMetadata objectMetaData = new ObjectMetadata();
    objectMetaData.setContentType(multipartFile.getContentType());
    objectMetaData.setContentLength(size);

    // S3에 업로드
    amazonS3Client.putObject(
            new PutObjectRequest(S3Bucket, originalName, multipartFile.getInputStream(), objectMetaData)
                    .withCannedAcl(CannedAccessControlList.PublicRead)
    );

    String imagePath = amazonS3Client.getUrl(S3Bucket, originalName).toString(); // 접근가능한 URL 가져오기
    System.out.println("ImagePath: "+imagePath);
    return imagePath;
  }
}