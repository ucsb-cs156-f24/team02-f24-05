package edu.ucsb.cs156.example.repositories;

import edu.ucsb.cs156.example.entities.RecommendationRequest;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * The RecommendationRequestReposity is a repository for RecommendationRequest entities
 */

@Repository
public interface RecommendationRequestRepository extends CrudRepository<RecommendationRequest, Long> {
  
}