package com.dobalito.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
    
    public ResourceNotFoundException(String resource, Long id) {
        super(String.format("%s с ID %d не найден", resource, id));
    }
    
    public ResourceNotFoundException(String resource, String name) {
        super(String.format("%s с именем '%s' не найден", resource, name));
    }
}

