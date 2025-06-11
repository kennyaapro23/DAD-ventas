package com.example.msclient.repository;

import com.example.msclient.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClientRepository extends JpaRepository<Client, Integer> {

    List<Client> findByNameContainingIgnoreCase(String name);
    List<Client> findByDocumentContainingIgnoreCase(String document);
    List<Client> findByNameContainingIgnoreCaseAndDocumentContainingIgnoreCase(String name, String document);

}
