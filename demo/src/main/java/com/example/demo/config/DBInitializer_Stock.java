package com.example.demo.config;
import org.ietf.jgss.GSSContext;
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
                    new Stock(21l, "Snail Inc", "SNAL", 0.91, 0.067, 7.90),
                    new Stock(22l, "Twitter Inc", "TWTR", 45.67, -0.23, -0.50),
                    new Stock(23l, "Alibaba Group Holding Ltd", "BABA", 150.00, -0.50, -0.33),
                    new Stock(24l, "Palantir Technologies Inc", "PLTR", 25.00, -0.50, -0.33),
                    new Stock(25l, "Coinbase Global Inc", "COIN", 250.00, -0.50, -0.33),
                    new Stock(26l, "Shopify Inc", "SHOP", 1000.00, -0.50, -0.33),
                    new Stock(27l, "Square Inc", "SQ", 250.00, -0.50, -0.33),
                    new Stock(28l, "Spotify Technology SA", "SPOT", 250.00, -0.50, -0.33),
                    new Stock(29l, "Slack Technologies Inc", "WORK", 250.00, -0.50, -0.33),
                    new Stock(30l, "Pinterest Inc", "PINS", 250.00, -0.50, -0.33),
                    new Stock(31l, "Snap Inc", "SNAP", 250.00, -0.50, -0.33),
                    new Stock(32l, "Twilio Inc", "TWLO", 250.00, -0.50, -0.33),
                    new Stock(33l, "Uber Technologies Inc", "UBER", 250.00, -0.50, -0.33),
                    new Stock(34l, "Lyft Inc", "LYFT", 250.00, -0.50, -0.33),
                    new Stock(35l, "DoorDash Inc", "DASH", 250.00, -0.50, -0.33),
                    new Stock(36l, "Airbnb Inc", "ABNB", 250.00, -0.50, -0.33),
                    new Stock(37l, "Snowflake Inc", "SNOW", 250.00, -0.50, -0.33),
                    new Stock(38l, "Unity Software Inc", "U", 250.00, -0.50, -0.33),
                    new Stock(39l, "Asana Inc", "ASAN", 250.00, -0.50, -0.33),
                    new Stock(40l, "The Goldman Sachs Group, INC.", "GS", 450.00, 3.82, 0.86),
                    new Stock(41l, "JPMorgan Chase & Co.", "JPM", 150.00, 1.23, 0.83),
                    new Stock(42l, "Bank of America Corp", "BAC", 50.00, 0.23, 0.46),
                    new Stock(43l, "Wells Fargo & Co", "WFC", 25.00, 0.23, 0.92),
                    new Stock(44l, "Citigroup Inc", "C", 50.00, 0.23, 0.46),
                    new Stock(45l, "Morgan Stanley", "MS", 50.00, 0.23, 0.46),
                    new Stock(46l, "BlackRock Inc", "BLK", 50.00, 0.23, 0.46),
                    new Stock(47l, "Vanguard Group Inc", "VGRD", 50.00, 0.23, 0.46),
                    new Stock(48l, "Charles Schwab Corp", "SCHW", 50.00, 0.23, 0.46),
                    new Stock(49l, "Fidelity Investments Inc", "FID", 50.00, 0.23, 0.46),
                    new Stock(50l, "American Express Co", "AXP", 50.00, 0.23, 0.46)



                    
                    
            );

            var users = List.of(
                    new User(1l, "Grace",1000, new HashMap<String, Integer>()),
                    new User(2l, "Kelvin",13002, new HashMap<String, Integer>()),
                    new User(3l, "Naren",500, new HashMap<String, Integer>()),
                    new User(4l, "Ethan",0, new HashMap<String, Integer>())
            );
            // Save all users to the database
            stockRepository.saveAll(stocks);
            userRepository.saveAll(users);
        };
    }
}
