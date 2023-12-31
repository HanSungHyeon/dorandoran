package com.doran.parent.repository;

import java.util.Optional;

import com.doran.parent.entity.Parent;
import com.querydsl.jpa.impl.JPAQueryFactory;
import static com.doran.parent.entity.QParent.parent;
import static com.doran.child.entity.QChild.child;
import static com.doran.profile.entity.QProfile.*;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ParentRepositoryCustomImpl implements ParentRepositoryCustom {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Optional<Parent> findParentByChildUserId(int childUserId) {
        return Optional.ofNullable(jpaQueryFactory
            .select(parent)
            .from(child)
                .join(child.parent, parent)
                .where(child.user.id.eq(childUserId))
            .fetchOne()
        );
    }

    // userId로 parent 반환
    @Override
    public Optional<Parent> findParentByUserId(int userId){
        return Optional.ofNullable(jpaQueryFactory
            .select(parent)
            .from(parent)
            .where(parent.user.id.eq(userId))
            .fetchOne()
        );
    }

    //profileId로 parent 반환
    @Override
    public Optional<Parent> findParentByProfileId(int profileId){
        return Optional.ofNullable(jpaQueryFactory
            .select(parent)
            .from(profile)
            .join(profile.child, child)
            .join(child.parent, parent)
            .where(profile.id.eq(profileId))
            .fetchOne()
        );
    }
}
