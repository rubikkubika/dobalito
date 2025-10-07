package com.dobalito.exception;

public class ResourceAlreadyExistsException extends RuntimeException {
    public ResourceAlreadyExistsException(String message) {
        super(message);
    }
    
    public ResourceAlreadyExistsException(String resource, String name) {
        super(String.format("%s с именем '%s' уже существует", resource, name));
    }
}

