package com.example.demo.model;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.HashMap;
import java.util.Map;


@Entity

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ElementCollection
    private Map<Long, Integer> stockShares = new HashMap<>();

    public User() {
    }

    public User(Long id, String name, Map<Long, Integer> stockShares) {
        this.id = id;
        this.name = name;
        this.stockShares = stockShares;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name = name;
    }


    public Map<Long, Integer> getStockShares() {
        return stockShares;
    }


    public void setStockShares(Map<Long, Integer> stockShares) {
        this.stockShares = stockShares;
    }

    public void addStock(Long stockId, Integer shares) {
        stockShares.put(stockId, shares);
    }

    public void removeStock(Long stockId) {
        stockShares.remove(stockId);
    }

    public void updateStock(Long stockId, Integer shares) {
        stockShares.put(stockId, shares);
    }

    public void clearStocks() {
        stockShares.clear();
    }

    public boolean hasStock(Long stockId) {
        return stockShares.containsKey(stockId);
    }

    public Integer getShares(Long stockId) {
        return stockShares.get(stockId);
    }

    public void buyStock(Long stockId, Integer shares) {
        if (stockShares.containsKey(stockId)) {
            stockShares.put(stockId, stockShares.get(stockId) + shares);
        } else {
            stockShares.put(stockId, shares);
        }
    }

    public void sellStock(Long stockId, Integer shares) {
        if (stockShares.containsKey(stockId)) {
            stockShares.put(stockId, stockShares.get(stockId) - shares);
            if (stockShares.get(stockId) == 0) {
                stockShares.remove(stockId);
            }
        }
    }

}
