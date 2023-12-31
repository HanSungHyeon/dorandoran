package com.doran.letter.dto.req;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LetterInsertDto {
    private MultipartFile content;
    private Integer profileId; // 아이의 프로필 id 필요 (송 수신 둘다)
}
