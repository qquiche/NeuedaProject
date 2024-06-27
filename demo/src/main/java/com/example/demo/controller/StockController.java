package com.example.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Stock;
import com.example.demo.repository.StockRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController // Marks this class as a Spring MVC controller where every method returns a domain object instead of a view
@RequestMapping("/api/stocks") // Maps HTTP requests to /api/users to this controller

public class StockController {

    @Autowired // Injects the UserRepository dependency - the recomended way is to use contructors  :)
    private StockRepository stockRepository;

    @CrossOrigin(origins = "http://localhost:3000") // Allows cross-origin requests from http://localhost:3000
    @GetMapping // Maps HTTP GET requests to /api/users to this method
    public List<Stock> getAllStocks() {
        /*
            Fetches and returns all User entities from the database
         */
        return stockRepository.findAll();
    }

    // TODO: API Calls needed

    // GET stock by symbol
    @CrossOrigin(origins = "http://localhost:3000") // Allows cross-origin requests from http://localhost:3000
    @GetMapping("/symbol") // Maps HTTP GET requests to /api/users/symbol to this method
    public List<Stock> getStockBySymbol(String symbol) {
        List<Stock> stocks = stockRepository.findAll();
        List<Stock> result = new ArrayList<Stock>();
        for (Stock stock : stocks) {
            if (stock.getSymbol().equals(symbol)) {
                result.add(stock);
                break;
            }
        }
        return result;
    }

    // GET stock by page (2 inputs: page number and # of entries per page)
    @CrossOrigin(origins = "http://localhost:3000") // Allows cross-origin requests from http://localhost:3000
    @GetMapping("/page") // Maps HTTP GET requests to /api/users/page to this method
    public List<Stock> getStockByPage(int page, int entriesPerPage) {
        List<Stock> stocks = stockRepository.findAll();
        List<Stock> result = new ArrayList<Stock>();
        int start = (page - 1) * entriesPerPage;
        int end = Math.min(page * entriesPerPage, stocks.size());
        for (int i = start; i < end; i++) {
            result.add(stocks.get(i));
        }
        return result;
    }

    // GET stock by categorical filter (1 input: category)
    @CrossOrigin(origins = "http://localhost:3000") // Allows cross-origin requests from http://localhost:3000
    @GetMapping("/filter") // 
    public List<Stock> getStockByFilter(String keyword, double minValue, double maxValue) {
        List<Stock> stocks = stockRepository.findAll();
        List<Stock> result = new ArrayList<Stock>();

        for (Stock stock : stocks) {
            boolean isValid = false;

            if ("price".equals(keyword)) {
                isValid = stock.getPrice() >= minValue && stock.getPrice() <= maxValue;
            } else if ("priceChange".equals(keyword)) {
                isValid = stock.getPriceChange() >= minValue && stock.getPriceChange() <= maxValue;
            } else if ("priceChangePercent".equals(keyword)) {
                isValid = stock.getPriceChangePercent() >= minValue && stock.getPriceChangePercent() <= maxValue;
            }

            if (isValid) {
                result.add(stock);
            }
        }
        return result;
    }

    //  GET stock in sorted order by numeric attribute (2 inputs: attribute and ascending/descending)
    @CrossOrigin(origins = "http://localhost:3000") // Allows cross-origin requests from http://localhost:3000
    @GetMapping("/sort") // Maps HTTP GET requests to /api/users/sort to this method
    public List<Stock> getStockSortedByAttribute(String attribute, boolean ascending) {
        List<Stock> stocks = stockRepository.findAll();
        if (attribute.equals("price")) {
            if (ascending) {
                stocks.sort((a, b) -> Double.compare(a.getPrice(), b.getPrice()));
            } else {
                stocks.sort((a, b) -> Double.compare(b.getPrice(), a.getPrice()));
            }
        }
        // TODO: Add more attributes here if needed
        return stocks;
    }
    // OPTIONAL: Implement a POST/PUT requests

    // POST stock
    @CrossOrigin(origins = "http://localhost:3000") // Allows cross-origin requests from http://localhost:3000
    @PostMapping // Maps HTTP POST requests to /api/users to this method
    public ResponseEntity<Stock> postStock(@RequestBody Stock stock) {
        stockRepository.save(stock);
        return ResponseEntity.ok(stock);
    }
}

