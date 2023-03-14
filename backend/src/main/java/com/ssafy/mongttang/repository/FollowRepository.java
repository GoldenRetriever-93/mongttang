package com.ssafy.mongttang.repository;

import com.ssafy.mongttang.dto.UserInterface;
import com.ssafy.mongttang.entity.Follow;
import com.ssafy.mongttang.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Integer> {

    List<Follow> findByFollowFrom(User user);
}
