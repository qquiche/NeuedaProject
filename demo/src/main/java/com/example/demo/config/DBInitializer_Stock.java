package com.example.demo.config;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.demo.model.Stock;
import com.example.demo.repository.StockRepository;

import java.util.List;

@Configuration // Indicates that this class contains Spring configuration
public class DBInitializer_Stock {

    /*
     * Bean that initializes the database with sample users.
     */
    @Bean
    CommandLineRunner initDatabase(StockRepository stockRepository) {
        return args -> {
            // Create a list of sample users
            var stocks = List.of(
                    new Stock(1, "Apple Inc.", "AAPL", 125.91),
                    new Stock(2, "Microsoft Corporation", "MSFT", 250.78),
                    new Stock(3, "Amazon.com Inc.", "AMZN", 3286.58)
            );

            // Save all users to the database
            stockRepository.saveAll(stocks);
        };
    }
}
