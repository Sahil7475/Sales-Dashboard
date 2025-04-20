export const API_TAGS = {
    USER: "User",
    PRODUCTS: "Products",
    CUSTOMERS: "Customers",
    TRANSACTIONS: "Transactions",
    GEOGRAPHY: "Geography",
    SALES: "Sales",
    ADMINS: "Admins",
    PERFORMANCE: "Performance",
    DASHBOARD: "Dashboard"
};

export const API_PATHS = {
    USER: (id) => `general/user/${id}`,
    PRODUCTS: "client/products",
    CUSTOMERS: "client/customers",
    TRANSACTIONS: "client/transactions",
    GEOGRAPHY: "client/geography",
    SALES: "sales/sales",
    ADMINS: "management/admins",
    PERFORMANCE: (id) => `management/performance/${id}`,
    DASHBOARD: "general/dashboard"
}; 