package com.dobalito.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
        Map<String, Object> body = Map.of(
            "timestamp", LocalDateTime.now(),
            "status", HttpStatus.NOT_FOUND.value(),
            "error", "Not Found",
            "message", ex.getMessage(),
            "path", request.getDescription(false).replace("uri=", "")
        );
        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(ResourceAlreadyExistsException.class)
    public ResponseEntity<?> handleResourceAlreadyExistsException(ResourceAlreadyExistsException ex, WebRequest request) {
        Map<String, Object> body = Map.of(
            "timestamp", LocalDateTime.now(),
            "status", HttpStatus.CONFLICT.value(),
            "error", "Conflict",
            "message", ex.getMessage(),
            "path", request.getDescription(false).replace("uri=", "")
        );
        return new ResponseEntity<>(body, HttpStatus.CONFLICT);
    }
    
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<?> handleValidationException(ValidationException ex, WebRequest request) {
        Map<String, Object> body = Map.of(
            "timestamp", LocalDateTime.now(),
            "status", HttpStatus.BAD_REQUEST.value(),
            "error", "Bad Request",
            "message", ex.getMessage(),
            "path", request.getDescription(false).replace("uri=", "")
        );
        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGlobalException(Exception ex, WebRequest request) {
        Map<String, Object> body = Map.of(
            "timestamp", LocalDateTime.now(),
            "status", HttpStatus.INTERNAL_SERVER_ERROR.value(),
            "error", "Internal Server Error",
            "message", "Произошла внутренняя ошибка сервера",
            "path", request.getDescription(false).replace("uri=", "")
        );
        return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

