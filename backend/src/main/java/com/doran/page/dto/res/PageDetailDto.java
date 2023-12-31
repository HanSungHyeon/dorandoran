package com.doran.page.dto.res;

import java.util.List;

import com.doran.content.dto.res.ContentResDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PageDetailDto {
    private int pageId;
    private int idx;
    private String imgUrl;
    private List<ContentResDto> contentResDto;
}
