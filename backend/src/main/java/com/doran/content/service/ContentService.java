package com.doran.content.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.doran.content.dto.res.ContentResDto;
import com.doran.content.entity.Content;
import com.doran.content.mapper.ContentMapper;
import com.doran.content.repository.ContentRepository;
import com.doran.page.entity.Page;
import com.doran.record_book.repository.RecordBookRepository;
import com.doran.utils.exception.dto.CustomException;
import com.doran.utils.exception.dto.ErrorCode;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ContentService {
    private final ContentRepository contentRepository;
    private final ContentMapper contentMapper;
    private final RecordBookRepository recordBookRepository;

    public void insertContent(Page page, String script) {
        Content content = contentMapper.toContent(page, script);
        contentRepository.save(content);
    }

    public List<ContentResDto> getContentWithVoice(int userId, Integer pageId, Integer bookId) {
        return contentRepository.getContentWithVoice(userId, pageId, bookId);
    }

    public Content getContentById(int contentId) {
        return contentRepository.findById(contentId)
            .orElseThrow(() -> new CustomException(ErrorCode.CONTENT_NOT_FOUND));
    }

    public List<String> findContentByPageList(List<Page> pageList) {
        return contentRepository.findContentByPageList(pageList);
    }

    @Transactional
    public void updateContent() {
        contentRepository.updateScript();
        recordBookRepository.updateRecordBook();
    }
}
