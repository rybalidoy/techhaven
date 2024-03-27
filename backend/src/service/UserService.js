import validator from "validator";
import pkg from "validator";
const { isEmpty } = pkg;
import { jwt } from "jsonwebtoken";

export class UserService {

    

    static validateRegistration(data) {
        let errors = {}; // Json

        data.name.firstName = !isEmpty(data.name.firstName)
            ? data.name.firstName
            : "";
        data.namelastName = !isEmpty(data.name.lastName)
            ? data.name.lastName
            : "";
        data.emailAddress = !isEmpty(data.emailAddress)
            ? data.emailAddress
            : "";
        data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : "";
        data.password = !isEmpty(data.password) ? data.password : "";
        data.passwordRepeated = !isEmpty(data.passwordRepeated)
            ? data.passwordRepeated
            : "";

        // Validation checks
        if (validator.isEmpty(data.name.firstName)) {
            errors.firstName = "first name field is required";
        }

        if (validator.isEmpty(data.name.lastName)) {
            errors.lastName = "last name field is required";
        }

        if (validator.isEmpty(data.emailAddress)) {
            errors.emailAddress = "email address field is required";
        } else if (!validator.isEmail(data.emailAddress)) {
            errors.emailAddress = "email address is invalid";
        }

        if (validator.isLength(data.phoneNumber, { min: 10, max: 12 })) {
            // [+63 9667217920], [09667217920], [9667217920]
            errors.phoneNumber = {
                length: "must be 10 or 11",
                countryCode: "must be from Philippines",
            };
        }

        if (validator.isMobilePhone(data.phoneNumber)) {
            errors.phoneNumber = "phone number is invalid";
        }

        if (validator.isEmpty(data.password)) {
            errors.password = "password field is required";
        }

        if (validator.isEmpty(data.passwordRepeated)) {
            errors.passwordRepeated = "password confirmation is required";
        }

        if (validator.isLength(data.password, { min: 6, max: 30 })) {
            errors.password = "password must be at least 6 characters";
        }

        if (!validator.equals(data.password, data.passwordRepeated)) {
            errors.passwordRepeated = "passwords must match";
        }

        return {
            errors,
            isValid: isEmpty(errors),
        };
    }
}
