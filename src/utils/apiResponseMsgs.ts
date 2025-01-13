const apiResponseMsgs = {
    200: "Successful",
    400: "Failed",
    500: "Internal server error",
    EMAIL_NOT_FOUND: "No account found with this email",

    TOKEN_EXPIRED: "JWT token has expired. Please log in again",
  TOKEN_NOT_PROVIDED: "No JWT token provided",
  TOKEN_REVOKED: "JWT token has been revoked",
  REFRESH_TOKEN_EXPIRED: "Refresh token has expired. Please log in again",
  REFRESH_TOKEN_INVALID: "Invalid refresh token",
  SESSION_EXPIRED: "Your session has expired. Please log in again",
}


export default apiResponseMsgs