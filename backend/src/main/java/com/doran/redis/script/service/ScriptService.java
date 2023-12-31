package com.doran.redis.script.service;

import org.springframework.stereotype.Service;

import com.doran.record_book.dto.res.ScriptResDto;
import com.doran.record_book.entity.RecordBook;
import com.doran.redis.script.key.ScriptFemale;
import com.doran.redis.script.key.ScriptMale;
import com.doran.redis.script.mapper.ScriptMapper;
import com.doran.utils.common.Genders;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScriptService {
    private final ScriptMaleService scriptMaleService;
    private final ScriptFemaleService scriptFemaleService;
    private final ScriptMapper scriptMapper;

    //남 여 확인 후 따로 저장
    public void genderCheck(int userId, Genders genders, RecordBook script) {
        switch (genders) {
            case MALE -> {
                ScriptMale scriptMale = scriptMapper.toScriptMale(userId, script.getTitle(), script.getScriptNum());

                scriptMaleService.save(scriptMale);
            }
            case FEMALE -> {
                ScriptFemale scriptMale = scriptMapper.toScriptFemale(userId, script.getTitle(), script.getScriptNum());

                scriptFemaleService.save(scriptMale);
            }
        }
    }

    //조회
    public ScriptResDto findScript(int userId, Genders genders) {
        if (genders.equals(Genders.MALE)) {
            ScriptMale scriptMale = scriptMaleService.find(String.valueOf(userId))
                .orElseGet(ScriptMale::new);

            return scriptMapper.toScriptResDtoMale(scriptMale);
        } else {
            ScriptFemale scriptFemale = scriptFemaleService.find(String.valueOf(userId))
                .orElseGet(ScriptFemale::new);

            return scriptMapper.toScriptResDtoFemale(scriptFemale);
        }
    }

    public void delete(Genders genders, int userId) {
        if (genders.equals(Genders.MALE)) {
            log.info("남");
            scriptMaleService.delete(String.valueOf(userId));
        } else {
            scriptFemaleService.delete(String.valueOf(userId));
        }
    }
}
