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
                // TODO: Add more dummy data
                    new Stock(1, "Apple Inc.", "AAPL", 125.91),
                    new Stock(2, "Microsoft Corporation", "MSFT", 250.78),
                    new Stock(3, "Amazon.com Inc.", "AMZN", 3286.58),
                    new Stock(4, "Alphabet Inc.", "GOOGL", 2345.10),
                    new Stock(5, "Facebook Inc.", "FB", 329.51),
                    new Stock(6, "Tesla Inc.", "TSLA", 661.75),
                    new Stock(7, "NVIDIA Corporation", "NVDA", 532.00),
                    new Stock(8, "PayPal Holdings Inc.", "PYPL", 250.00),
                    new Stock(9, "Netflix Inc.", "NFLX", 500.00),
                    new Stock(10, "Adobe Inc.", "ADBE", 500.00),
                    new Stock(11, "Zoom Video Communications Inc.", "ZM", 500.00)
            );

            // Save all users to the database
            stockRepository.saveAll(stocks);
        };
    }
}
