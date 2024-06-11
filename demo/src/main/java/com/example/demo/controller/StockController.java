package com.example.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Stock;
import com.example.demo.repository.StockRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;

@RestController // Marks this class as a Spring MVC controller where every method returns a domain object instead of a view
@RequestMapping("/api/stocks") // Maps HTTP requests to /api/users to this controller

public class StockController {

    @Autowired // Injects the UserRepository dependency - the recomended way is to use contructors  :)
    private StockRepository stockRepository;


    @GetMapping // Maps HTTP GET requests to /api/users to this method
    public List<Stock> getAllStocks() {
        /*
            Fetches and returns all User entities from the database
         */
        return stockRepository.findAll();
    }

    // TODO: API Calls needed

    // GET stock by symbol

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

    //  GET stock in sorted order by numeric attribute (2 inputs: attribute and ascending/descending)
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
}

