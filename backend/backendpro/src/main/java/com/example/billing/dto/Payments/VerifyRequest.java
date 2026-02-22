package com.example.billing.dto.Payments;

public class VerifyRequest {
    private String paymentId;
    private String orderId;
    private String signature;

    // Getter and Setter for paymentId
    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    // Getter and Setter for orderId
    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    // Getter and Setter for signature
    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }
}
