package com.ssafy.beauduckmakeup.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.*;
import java.nio.file.Files;

@Slf4j
@RequiredArgsConstructor
@Service
public class AwsS3Service {

  private final AmazonS3Client amazonS3Client;

//  @Value("${cloud.aws.s3.bucket}")
  private String S3Bucket = "ssafybeauduck"; // Bucket 이름

  private MultipartFile getMultipartFile(File file) throws IOException {
    FileItem fileItem = new DiskFileItem("originFile", Files.probeContentType(file.toPath()), false, file.getName(), (int) file.length(), file.getParentFile());

    try {
      InputStream input = new FileInputStream(file);
      OutputStream os = fileItem.getOutputStream();
      IOUtils.copy(input, os);
      // Or faster..
      // IOUtils.copy(new FileInputStream(file), fileItem.getOutputStream());
    } catch (IOException ex) {
      ex.printStackTrace();
    }

    //jpa.png -> multipart 변환
    MultipartFile mFile = new CommonsMultipartFile(fileItem);
    return mFile;
  }

  public String uploadFileV1(File file) throws Exception{
    MultipartFile multipartFile = getMultipartFile(file);
    String originalName = multipartFile.getOriginalFilename(); // 파일 이름
    long size = multipartFile.getSize(); // 파일 크기

    ObjectMetadata objectMetaData = new ObjectMetadata();
    objectMetaData.setContentType(multipartFile.getContentType());
    objectMetaData.setContentLength(size);

    // S3에 업로드
    amazonS3Client.putObject(
            new PutObjectRequest(S3Bucket, originalName, multipartFile.getInputStream(), objectMetaData)
                    .withCannedAcl(CannedAccessControlList.PublicRead)
    );

    String imagePath = amazonS3Client.getUrl(S3Bucket, originalName).toString(); // 접근가능한 URL 가져오기
    return imagePath;
  }
}