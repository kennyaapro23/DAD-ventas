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
                System.out.println("⏳ Insertando clientes reales simulados...");

                String[][] clientes = {
                        {"Juan Pérez", "70894561", "juanperez@mail.com", "987-654-321"},
                        {"María García", "70123456", "mariagarcia@mail.com", "987-123-456"},
                        {"Luis Torres", "70478512", "luistorres@mail.com", "987-222-333"},
                        {"Ana Fernández", "70987654", "ana.fernandez@mail.com", "988-111-222"},
                        {"Carlos Ramírez", "70654321", "carlos.ramirez@mail.com", "989-654-321"},
                        {"Lucía Gómez", "70345678", "lucia.gomez@mail.com", "987-789-123"},
                        {"José Medina", "70234123", "josemedina@mail.com", "988-456-789"},
                        {"Elena Rojas", "70901234", "elena.rojas@mail.com", "987-000-999"},
                        {"Andrés Salazar", "70881234", "andres.salazar@mail.com", "987-555-111"},
                        {"Valeria Castro", "70442233", "valeria.castro@mail.com", "988-333-777"},
                        {"Fernando Díaz", "70229876", "fernando.diaz@mail.com", "987-666-444"},
                        {"Camila Herrera", "70330987", "camila.herrera@mail.com", "987-444-666"},
                        {"Daniel Vega", "70876123", "daniel.vega@mail.com", "987-888-000"},
                        {"Isabel Silva", "70900123", "isabel.silva@mail.com", "988-222-555"},
                        {"Ricardo León", "70771234", "ricardo.leon@mail.com", "987-321-456"},
                        {"Patricia Navarro", "70349876", "patricia.navarro@mail.com", "988-999-888"},
                        {"Hugo Cabrera", "70668899", "hugo.cabrera@mail.com", "987-777-333"},
                        {"Florencia Meza", "70883344", "florencia.meza@mail.com", "987-111-888"},
                        {"Diego Morales", "70559987", "diego.morales@mail.com", "988-000-444"},
                        {"Natalia Campos", "70998877", "natalia.campos@mail.com", "987-555-777"}
                };

                for (String[] c : clientes) {
                    Client client = new Client();
                    client.setName(c[0]);
                    client.setDocument(c[1]);
                    client.setEmail(c[2]);
                    client.setTelefono(c[3]);
                    clientRepository.save(client);
                }

                System.out.println("✔ 20 clientes reales simulados insertados correctamente.");
            } else {
                System.out.println("✔ Clientes ya existen, no se insertan duplicados.");
            }
        };
    }
}
