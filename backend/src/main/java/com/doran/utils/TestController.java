package com.doran.utils;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.doran.animal.dto.res.AnimalDto;
import com.doran.animal.service.AnimalService;
import com.doran.redis.balcklist.service.BlackListService;
import com.doran.redis.invite.key.Invite;
import com.doran.redis.invite.service.InviteService;
import com.doran.utils.response.CommonResponseEntity;
import com.doran.utils.response.SuccessCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/test")
public class TestController {
    private final AnimalService animalService;
    private final InviteService inviteService;
    private final BlackListService blackListService;

    @GetMapping("/animal/{id}")
    public ResponseEntity<AnimalDto> selectAnimal(@PathVariable int id) {
        return ResponseEntity.ok(animalService.selectAnimal(id));
    }

    @GetMapping("/redis")
    public ResponseEntity findInvite(@RequestParam("code") String code,
        @RequestParam("id") int id) {
        inviteService.findCode(code);

        Invite find = inviteService.findCode(id);
        log.info("코드 : {}", find.getCode());
        log.info("유저id : {}", find.getUserId());
        return null;
    }

    @PostMapping("/redis/blacklist/{accesstoken}")
    public ResponseEntity blackList(@PathVariable String accesstoken) {
        log.info("AccessToken : {}", accesstoken);
        blackListService.save(accesstoken);

        return null;
    }

    //인증 인가 테스트
    @PreAuthorize("hasRole('ROLE_CHILD')")
    @GetMapping("/oauth/child")
    public ResponseEntity oauth() {
        return CommonResponseEntity.getResponseEntity(SuccessCode.OK);
    }

    @PreAuthorize("hasRole('ROLE_PARENT')")
    @GetMapping("/oauth/parent")
    public ResponseEntity oauth2() {
        return CommonResponseEntity.getResponseEntity(SuccessCode.OK);
    }
}
