package com.example.msclient.service.impl;

import com.example.msclient.entity.Client;
import com.example.msclient.repository.ClientRepository;
import com.example.msclient.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientServiceImpl implements ClientService {
    @Autowired
    private ClientRepository clientRepository;
    @Override
    public List<Client> listar() {
        return clientRepository.findAll();
    }

    @Override
    public Optional<Client> listarPorId(Integer id) {
        return clientRepository.findById(id);
    }

    @Override
    public Client guardar(Client client) {
        return clientRepository.save(client);
    }

    @Override
    public Client actualizar(Client client) {
        return clientRepository.save(client);
    }

    @Override
    public void eliminar(Integer id) {
    clientRepository.deleteById(id);
    }


    @Override
    public List<Client> listarByName(String name) {
        return clientRepository.findByNameContainingIgnoreCase(name);
    }

    @Override
    public List<Client> listarbyDocument(String document) {
        return clientRepository.findByDocumentContainingIgnoreCase(document);
    }

    @Override
    public List<Client> advancedSearch(String name, String document) {
        if (name != null && !name.isEmpty() && document != null && !document.isEmpty()) {
            return clientRepository.findByNameContainingIgnoreCaseAndDocumentContainingIgnoreCase(name, document);
        } else if (name != null && !name.isEmpty()) {
            return clientRepository.findByNameContainingIgnoreCase(name);
        } else if (document != null && !document.isEmpty()) {
            return clientRepository.findByDocumentContainingIgnoreCase(document);
        } else {
            return clientRepository.findAll();
        }
    }

}
