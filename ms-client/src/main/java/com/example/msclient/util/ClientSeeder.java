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
                // Crea los clientes con nombres específicos
                Client client1 = new Client();
                client1.setName("Juan Pérez");
                client1.setDocument("DNI1000001");

                Client client2 = new Client();
                client2.setName("María Gómez");
                client2.setDocument("DNI1000002");

                Client client3 = new Client();
                client3.setName("Carlos Rodríguez");
                client3.setDocument("DNI1000003");

                Client client4 = new Client();
                client4.setName("Ana Sánchez");
                client4.setDocument("DNI1000004");

                Client client5 = new Client();
                client5.setName("Pedro López");
                client5.setDocument("DNI1000005");

                Client client6 = new Client();
                client6.setName("Luisa Fernández");
                client6.setDocument("DNI1000006");

                Client client7 = new Client();
                client7.setName("José Martínez");
                client7.setDocument("DNI1000007");

                Client client8 = new Client();
                client8.setName("Sofía García");
                client8.setDocument("DNI1000008");

                Client client9 = new Client();
                client9.setName("David Hernández");
                client9.setDocument("DNI1000009");

                Client client10 = new Client();
                client10.setName("Carmen Ruiz");
                client10.setDocument("DNI1000010");

                Client client11 = new Client();
                client11.setName("Luis Álvarez");
                client11.setDocument("DNI1000011");

                Client client12 = new Client();
                client12.setName("Patricia Pérez");
                client12.setDocument("DNI1000012");

                Client client13 = new Client();
                client13.setName("Felipe González");
                client13.setDocument("DNI1000013");

                Client client14 = new Client();
                client14.setName("Elena Díaz");
                client14.setDocument("DNI1000014");

                Client client15 = new Client();
                client15.setName("Martín Navarro");
                client15.setDocument("DNI1000015");

                Client client16 = new Client();
                client16.setName("Victoria Torres");
                client16.setDocument("DNI1000016");

                Client client17 = new Client();
                client17.setName("Ricardo Sánchez");
                client17.setDocument("DNI1000017");

                Client client18 = new Client();
                client18.setName("Raquel Morales");
                client18.setDocument("DNI1000018");

                Client client19 = new Client();
                client19.setName("Javier Jiménez");
                client19.setDocument("DNI1000019");

                Client client20 = new Client();
                client20.setName("Verónica Ruiz");
                client20.setDocument("DNI1000020");

                // Guarda los clientes
                clientRepository.save(client1);
                clientRepository.save(client2);
                clientRepository.save(client3);
                clientRepository.save(client4);
                clientRepository.save(client5);
                clientRepository.save(client6);
                clientRepository.save(client7);
                clientRepository.save(client8);
                clientRepository.save(client9);
                clientRepository.save(client10);
                clientRepository.save(client11);
                clientRepository.save(client12);
                clientRepository.save(client13);
                clientRepository.save(client14);
                clientRepository.save(client15);
                clientRepository.save(client16);
                clientRepository.save(client17);
                clientRepository.save(client18);
                clientRepository.save(client19);
                clientRepository.save(client20);

                System.out.println("✔ 20 Clientes insertados");
            } else {
                System.out.println("✔ Los clientes ya existen");
            }
        };
    }
}
