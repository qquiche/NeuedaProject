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
    private Map<String, Integer> stockShares = new HashMap<>();
    private double balance;

    public User() {
    }

    public User(Long id, String name, double balance, Map<String, Integer> stockShares) {
        this.id = id;
        this.name = name;
        this.balance = balance;
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


    public Map<String, Integer> getStockShares() {
        return stockShares;
    }

    public void setStockShares(Map<String, Integer> stockShares) {
        this.stockShares = stockShares;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public void addStock(String stockId, Integer shares) {
        stockShares.put(stockId, shares);
    }

    public void removeStock(String stockId) {
        stockShares.remove(stockId);
    }

    public void updateStock(String stockId, Integer shares) {
        stockShares.put(stockId, shares);
    }

    public void clearStocks() {
        stockShares.clear();
    }

    public boolean hasStock(String stockId) {
        return stockShares.containsKey(stockId);
    }

    public Integer getShares(String stockId) {
        return stockShares.get(stockId);
    }

    public void buyStock(String stockId, Integer shares, double price) {
        double cost = shares * price;
        if (balance >= cost) {
            balance -= cost;
        } else {
            return;
        }
        if (stockShares.containsKey(stockId)) {
            stockShares.put(stockId, stockShares.get(stockId) + shares);
        } else {
            stockShares.put(stockId, shares);
        }
    }

    public void sellStock(String stockId, Integer shares, double price) {
        if(!stockShares.containsKey(stockId)) {
            return;
        }
        double profit = shares * price;
        balance += profit;
        if (stockShares.containsKey(stockId)) {
            stockShares.put(stockId, stockShares.get(stockId) - shares);
            if (stockShares.get(stockId) == 0) {
                stockShares.remove(stockId);
            }
        }
    }

}
