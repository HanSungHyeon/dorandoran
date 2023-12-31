package com.doran.profile.service;

import com.doran.profile.dto.res.ProfileDto;
import com.doran.profile.dto.res.ProfileListDto;
import com.doran.profile.entity.Profile;
import com.doran.utils.common.UserInfo;

public interface ProfileService {

    ProfileListDto selectAllProfile(int childId);

    ProfileDto selectProfile(int childId, int profileId);

    Profile findProfileById(int profileId);

    void createChildProfile(int childId, String name);

    void updateProfileAnimal(UserInfo userInfo, int animalId);

    ProfileDto selectProfile(int profileId);

    void deleteProfile(int profileId);
}
