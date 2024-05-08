// const arr = [
//   "http://localhost:5000",
//   "http://localhost:5000/admin",
//   "http://localhost:5000/payment",
// ];
// const arr = ["https://wandeo.website", "https://wandeo.website/admin", "https://wandeo.website/payment"]

let userBaseUrl, adminBaseUrl, paymentBaseUrl;

if (import.meta.env.VITE_MODE === "development") {
  userBaseUrl = "http://localhost:5000";
  adminBaseUrl = "http://localhost:5000/admin";
  paymentBaseUrl = "http://localhost:5000/payment";
} else {
  userBaseUrl = "https://wandeo.website";
  adminBaseUrl = "https://wandeo.website/admin";
  paymentBaseUrl = "https://wandeo.website/payment";
}

export const UserBaseUrl = userBaseUrl;

export const AdminBaseUrl = adminBaseUrl;

export const PaymentBaseUrl = paymentBaseUrl;
