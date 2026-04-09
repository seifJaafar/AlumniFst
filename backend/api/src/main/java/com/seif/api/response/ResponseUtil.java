package com.seif.api.response;

public class ResponseUtil {

    public static <T> ApiResponse<T> success(T data, String message) {
        return ApiResponse.<T>builder()
                .success(true)
                .message(message)
                .data(data)
                .errors(null)
                .build();
    }

    public static ApiResponse<?> error(String message, Object errors) {
        return ApiResponse.builder()
                .success(false)
                .message(message)
                .data(null)
                .errors(errors)
                .build();
    }
}