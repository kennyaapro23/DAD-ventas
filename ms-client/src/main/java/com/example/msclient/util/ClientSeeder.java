package com.example.msclient.util;



import com.example.msclient.entity.Client;
import com.example.msclient.repository.ClientRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ClientSeeder {

    @Bean
    CommandLineRunner initClients(ClientRepository clientRepository) {
        return args -> {
            if (clientRepository.count() == 0) {
                System.out.println("⏳ Insertando clientes...");

                for (int i = 1; i <= 20; i++) {
                    Client client = new Client();
                    client.setName("Cliente " + i);
                    client.setDocument("DNI10000" + i);
                    client.setEmail("cliente" + i + "@mail.com");
                    client.setTelefono("999-000-" + String.format("%03d", i));

                    clientRepository.save(client);
                }

                System.out.println("✔ 20 Clientes insertados correctamente.");
            } else {
                System.out.println("✔ Clientes ya existen, no se insertan duplicados.");
            }
        };
    }
}
