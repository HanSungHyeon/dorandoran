package com.doran.utils.bucket.service;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.doran.utils.bucket.dto.InsertDto;
import com.doran.utils.exception.dto.CustomException;
import com.doran.utils.exception.dto.ErrorCode;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class BucketService {
    @Value("${spring.cloud.gcp.storage.bucket}")
    private String bucket;
    private final Storage storage;

    public String insertFile(InsertDto dto) {
        log.info("bucket : {}", bucket);
        try {
            String uuid = UUID.randomUUID().toString(); // Google Cloud Storage에 저장될 파일 이름
            String ext = dto.getFile().getContentType(); // 파일의 형식 ex) JPG

            log.info("uuid : {}", uuid);
            log.info("exd : {}", ext);

            if (ext.equals("audio/wave")) {
                ext = "audio/wav";
            }

            // Cloud에 이미지 업로드
            BlobInfo blobInfo = storage.create(
                BlobInfo.newBuilder(bucket, uuid)
                    .setContentType(ext)
                    .build(),
                dto.getFile().getInputStream()
            );
            String URL = "https://storage.googleapis.com/" + bucket + "/";
            return URL + uuid;
        } catch (IOException e) {
            log.info(e.getMessage());
            throw new CustomException(ErrorCode.BUCKET_EXCEPTION);
        }

    }

    //버킷 단일 삭제
    public void deleteFile(String fileName) {
        storage.delete(bucket, fileName);
    }

    //버킷 다중 삭제
    public void deleteFile(List<String> list) {
        List<BlobId> fileList = list.stream()
            .map(s -> {
                String add = "https://storage.googleapis.com/" + bucket + "/";
                return BlobId.of(bucket, s.substring(add.length()));
            })
            .toList();

        storage.delete(fileList);
    }

    //리팩
    public Blob downloadFile() {
        String file = "361f2945-4f04-41c5-a1c5-456d830e46d4";
        String location = "ttt";
        Blob blob = storage.get(bucket, file);
        blob.downloadTo(Paths.get(location));
        return blob;
    }
}
