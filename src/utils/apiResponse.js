class JoiErrors{};
class ServerError{};
class ServerSuccess{};


JoiErrors.error={
    "username": 'Username must be a string.',
    "nameRequired":"Name is required",
    "usernameRequired":"UserName is required",
    "email":"Invalid email format",
    "emailRequired":"Email is required",
    "password":"Password must be at least 6 characters long",
    "passwordRequired":"Password is required",
    "confirmPassword":"Passwords do not match",
    "confirmPasswordRequired":"Confirm password is required",
    "otpRequired" : "Please provide valid otp."
};

ServerError.error={
    "emailAlreadyExists":"User already exists",
    "internalServerError":"Internal Server Error",
    "invalidPassword":"Invalid password",
    "invalidEmail":"Invalid email / User does not exist",
    "sessionNotSet":"Error setting session",
    "sessionNotFound":"Session not found ",
    "sessionNotRemoved":"Failed to remove session",
    "tokenNotFound":"Token not found",
    "invalidToken":"Invalid token",
    "invalidEmailOrPassword":"Invalid Email or Password",
    "sessionExpired":"Session expired",
    "databaseError":"Failed to retrive Templates",
    "userNotExist": "User not exist",
    "otpDoesNtMatch" : "Otp not matching."

};

ServerSuccess.success={
  "companyAddedSuccess":"Company added successfully",
  "userAddedSuccess":"Account created successfully",
  "userLoginSuccess":"User Logged in successfully",
  "adminLoginSuccess":"Admin Logged in successfully",
  "userLogoutSuccess":"Logged out successfully",
  "certificateCreateSuccess":"Certificate created successfully",
  "templateRetrived":"Templates retrived successfully",
  "successfullyForgot" : "Password forgot successfully. Check your mail.",
  "otpSent"  : "Otp sent on registered mail."
};
const successResponse = async (status, status_code, bodyData) => {
    try {
        const successResponseObject = {
            status: status,
            statusCode: status_code,
            body: bodyData
        };
        return successResponseObject;
    } catch (err) {
        throw err;
    }
}
module.exports={JoiErrors,ServerError,ServerSuccess,successResponse};
