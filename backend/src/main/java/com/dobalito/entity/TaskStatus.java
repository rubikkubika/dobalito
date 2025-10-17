package com.dobalito.entity;

public enum TaskStatus {
    OPEN("Открыто"),
    IN_PROGRESS("В работе"),
    COMPLETED("Завершено"),
    CANCELLED("Отменено");
    
    private final String displayName;
    
    TaskStatus(String displayName) {
        this.displayName = displayName;
    }
    
    public String getDisplayName() {
        return displayName;
    }
}










