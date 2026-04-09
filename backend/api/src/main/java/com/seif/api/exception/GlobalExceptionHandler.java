package com.seif.api.exception;

import com.seif.api.response.ApiResponse;
import com.seif.api.response.ResponseUtil;

import jakarta.validation.ConstraintViolationException;

import org.springframework.http.*;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {




    // 🔴 DTO validation errors (invalid values or missing fields after deserialization)
   @ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<ApiResponse<?>> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {

    Map<String, String> errors = new HashMap<>();

    ex.getBindingResult().getFieldErrors().forEach(error -> {
        String field = error.getField();
        String message = error.getDefaultMessage();
        errors.put(field, message);
    });

    return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(ResponseUtil.error("Validation failed", errors));
}

    // 🔴 Method parameter validation errors (@RequestParam, @PathVariable)
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiResponse<?>> handleConstraintViolation(ConstraintViolationException ex) {

        Map<String, String> errors = new HashMap<>();
        ex.getConstraintViolations().forEach(cv ->
                errors.put(cv.getPropertyPath().toString(), cv.getMessage())
        );

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ResponseUtil.error("Validation failed", errors));
    }

    // 🔴 JSON missing fields / malformed JSON
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiResponse<?>> handleHttpMessageNotReadable(HttpMessageNotReadableException ex) {

        String missingFieldMessage = "Required fields are missing or JSON is malformed";

        // Try to extract field name from Jackson exception if possible
        if (ex.getCause() instanceof com.fasterxml.jackson.databind.exc.MismatchedInputException mie) {
            if (!mie.getPath().isEmpty()) {
                String fieldName = mie.getPath().get(0).getFieldName();
                missingFieldMessage = "Missing required field: " + fieldName;
            }
        }

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ResponseUtil.error(missingFieldMessage, null));
    }

    // 🔴 Business errors
    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ApiResponse<?>> handleApiException(ApiException ex) {
        return ResponseEntity
                .status(ex.getStatus())
                .body(ResponseUtil.error(ex.getMessage(), null));
    }

    // 🔴 Login errors
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiResponse<?>> handleBadCredentials() {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(ResponseUtil.error("Invalid email or password", null));
    }

    // 🔴 Fallback
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<?>> handleGeneralException(Exception ex) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ResponseUtil.error("Something went wrong", null));
    }
}