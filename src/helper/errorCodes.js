const errorCodes = {
    40001: {
      reason: "ValidationInvalidField",
      message: "Invalid parameter(s)",
    },
    40002: {
      reason: "ValidationExpired",
      message: "secretCode is invalid/expired",
    },
    40003: {
      reason: "InvalidTeacherOrSection",
      message: "Invalid section or teacher credentials provided."
    },
    40005: {
      reason: "ValidationError",
      message: "Email is already in use",
    },
    40006: {
      reason: "ValidationError",
      message: "Phone is already in use",
    },
    40007: {
      reason: "ValidationInvalidField",
      message: "Email format is not valid",
    },
    40008: {
      reason: "ValidationInvalidField",
      message: "Phone format is not valid",
    },
    40009: {
      reason: "ValidationError",
      message: "Phone number is not valid",
    },
    40010: {
      reason: "InvalidYearFormat",
      message: "Invalid year format provided."
    },
    40012: {
      reason: "ValidationError",
      message: "Requested planId is not subscribed",
    },
    40013: {
      reason: "ValidationError",
      message: "planId does not belongs to the partner",
    },
    40014: {
      reason: "ValidationError",
      message: "upgradePlanId does not belongs to the partner",
    },
    40015: {
      reason: "ValidationError",
      message: "Requested plan is not accepted without payment.",
    },
    40016: {
      reason: "PasswordValidationError",
      message: "You are using old password. Please use different password. ",
    },
    40017: {
      reason: "ValidationError",
      message: "Owner NID is already associated with an existing account.",
    },
    40018: {
      reason: "ValidationError",
      message: "Phone already associated with an existing account.",
    },
    40019: {
      reason: "ValidationError",
      message: "This category name already Exit.",
    },
    40021:{
      reason: "PaginationError",
      message: "Invalid pagination parameters. 'page' and 'limit' must be positive integers.",
    },
    40054: {
      reason: "ValidationError",
      message: "Account is inactive.",
    },
    400101: {
      reason: "ValidationError",
      message: "Invalid invoice status for payment",
    },
    400102: {
      reason: "ValidationError",
      message: "Invoice has been expired",
    },
    400103: {
      reason: "TransactionFailed",
      message: "Transaction adapter has failed",
    },
    400104: {
      reason: "ValidationError",
      message: "Currency is not supported for this partner",
    },
    40020: {
      reason: "ValidationError",
      message: "Validation error: Missing required fields",
    },
    40101: {
      reason: "NoUser",
      message: "Invalid phone number or password",
    },
    40102: {
      reason: "InvalidPassword",
      message: "Invalid password. Please try again.",
    },
    40103: {
      reason: "Blocked",
      message: "Your account is blocked. Please contact to customer support.",
    },
    40104: {
      reason: "NewUser",
      message: "New user must complete subscription",
    },
    40105: {
      reason: "UserUnverified",
      message: "User must verify email address",
    },
    40106: {
      reason: "UserUnverified",
      message: "User must verify phone number",
    },
    40107: {
      reason: "UserUnverified",
      message: "Old password does not matched",
    },
    // ================== Authorizer error codes ==================
    40110: {
      reason: "TokenExpired",
      message: "Authentication failed: Token has expired'",
    },
    40111: {
      reason: "InvalidToken",
      message: "Token validation fail",
    },
    40112: {
      reason: "InvalidToken",
      message: "Token verification fail",
    },
    40113: {
      reason: "NoTokenProvided",
      message: "Authentication failed: No token provided",
    },
    40114: {
      reason: "InsufficientPrivileges",
      message: "Access denied. Admin privileges required.",
    },
    40125: {
      reason: "PasswordValidationError",
      message: "Wrong password.",
    },
    40401: {
      reason: "NotFound",
      message: "User not found",
    },
    40404: {
      reason: "NotFound",
      message: "Section not found",
    },
    40405: {
      reason: "NotFound",
      message: "Teacher not found ",
    },
    40406: {
      reason: "NotFound",
      message: "Course not found",
    },
    40415: {
      reason: "SubscriptionNotFound",
      message: "Subscription not found for this shop.",
    },
    40901: {
      reason: "ConflictAdminUser",
      message: "User is already exists",
    },
    40902: {
      reason: "DuplicateCourseCode",
      message: "Course code already exists in this section."
    },
    40903: {
      reason: "Validation Error",
      message: "Invalid request field. Please check your input.",
    },
    40301:{
     reason: "Forbidden",
     message:"You do not have the required role",
    },
    50001: {
      reason: "UnknownError",
      message: "An unknown error occurred.",
    },
  };
  
  module.exports = { errorCodes };