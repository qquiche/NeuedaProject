package com.example.demo.config;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.demo.model.Stock;
import com.example.demo.repository.StockRepository;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

import java.util.HashMap;
import java.util.List;

@Configuration // Indicates that this class contains Spring configuration
public class DBInitializer_Stock {

    /*
     * Bean that initializes the database with sample users.
     */
    @Bean
    CommandLineRunner initDatabase(StockRepository stockRepository, UserRepository userRepository) {
        return args -> {
            // Create a list of sample users
            var stocks = List.of(
                    new Stock(1l, "Apple Inc.", "AAPL", 125.91, -1.23, -0.97),
                    new Stock(2l, "Microsoft Corporation", "MSFT", 250.78, 2.34, 0.94),
                    new Stock(3l, "Amazon.com Inc.", "AMZN", 3286.58, -15.42, -0.47),
                    new Stock(4l, "Alphabet Inc.", "GOOGL", 2345.10, 10.25, 0.44),
                    new Stock(5l, "Facebook Inc.", "FB", 329.51, 5.12, 1.58),
                    new Stock(6l, "Tesla Inc.", "TSLA", 661.75, -20.87, -3.06),
                    new Stock(7l, "NVIDIA Corporation", "NVDA", 532.00, 12.65, 2.44),
                    new Stock(8l, "PayPal Holdings Inc.", "PYPL", 250.00, -3.78, -1.49),
                    new Stock(9l, "Netflix Inc.", "NFLX", 500.00, 4.30, 0.87),
                    new Stock(10l, "Adobe Inc.", "ADBE", 500.00, 7.89, 1.60),
                    new Stock(11l, "Zoom Video Communications Inc.", "ZM", 500.00, -5.23, -1.03),
                    new Stock(12l, "GameStop Corp", "GME", 23.39, -0.53, -1.03),
                    new Stock(13l, "Microsoft Corp", "MSFT", 448.15, -1.63, -0.36),
                    new Stock(14l, "Reddit Inc", "RDDT", 56.76, -0.54, -0.94),
                    new Stock(15l, "Intel Corp", "INTC", 30.80, -0.28, -0.92),
                    new Stock(16l, "Walt Disney Co", "DIS", 101.97, -0.32, -0.31),
                    new Stock(17l, "Roblox Corp", "RBLX", 35.18, -0.99, -2.72),
                    new Stock(18l, "T-Mobile US Inc.", "TMUS", 178.02, 1.29, 0.73),
                    new Stock(19l, "Meta Platforms Inc", "META", 497.59, 2.81, 0.57),
                    new Stock(20l, "AMC Entertainment Holdings", "AMC", 4.50, -0.045, -0.99),
                    new Stock(21l, "Snail Inc", "SNAL", 0.91, 0.067, 7.90)
                    
            );

            var users = List.of(
                    new User(1l, "Grace", new HashMap<Long, Integer>()),
                    new User(2l, "Kelvin", new HashMap<Long, Integer>()),
                    new User(3l, "Naren", new HashMap<Long, Integer>()),
                    new User(4l, "Ethan", new HashMap<Long, Integer>())
            );
            // Save all users to the database
            stockRepository.saveAll(stocks);
            userRepository.saveAll(users);
        };
    }
}
