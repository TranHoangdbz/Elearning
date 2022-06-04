import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:uit_elearning/data/services/auth_service.dart';

class SignUpController extends GetxController {
  late TextEditingController emailTextController;
  late TextEditingController passwordTextController;
  late TextEditingController confirmPasswordTextController;
  late TextEditingController fullNameTextControler;
  late TextEditingController phoneNumberTextController;
  Rxn<String> emailErrorText = Rxn<String>();
  Rxn<String> passwordErrorText = Rxn<String>();
  Rxn<String> confirmPasswordErrorText = Rxn<String>();
  Rxn<String> fullNameErrorText = Rxn<String>();
  Rxn<String> phoneNumberErrorText = Rxn<String>();

  @override
  void onInit() {
    emailTextController = TextEditingController();
    passwordTextController = TextEditingController();
    confirmPasswordTextController = TextEditingController();
    fullNameTextControler = TextEditingController();
    phoneNumberTextController = TextEditingController();
    emailErrorText.value = null;
    passwordErrorText.value = null;
    confirmPasswordErrorText.value = null;
    fullNameErrorText.value = null;
    phoneNumberErrorText.value = null;
    super.onInit();
  }

  void handleSignUp() {
    String email = emailTextController.text;
    String password = passwordTextController.text;
    String confirmPassword = confirmPasswordTextController.text;
    String fullName = fullNameTextControler.text;
    String phoneNumber = phoneNumberTextController.text;
    if (validateInput(
        email, password, confirmPassword, fullName, phoneNumber)) {
      AuthenticationService.instance.signUp(
        email: emailTextController.text,
        password: passwordTextController.text,
        confirmPassword: confirmPasswordTextController.text,
        fullName: fullNameTextControler.text,
        phoneNumber: phoneNumberTextController.text,
      );
    }
  }

  bool validateInput(String email, String password, String confirmPassword,
      String fullName, String phoneNumber) {
    bool isEmailValid =
        RegExp(r"^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+")
                .hasMatch(email) &&
            email.isNotEmpty;
    bool isPasswordValid = password.length >= 8;
    bool isConfirmPasswordValid =
        confirmPassword.length >= 8 && confirmPassword.compareTo(password) == 0;

    if (isEmailValid) {
      emailErrorText.value = null;
    } else {
      emailErrorText.value = "Email is invalid";
    }

    if (isPasswordValid) {
      passwordErrorText.value = null;
    } else {
      passwordErrorText.value = "Password is invalid";
    }

    if (isConfirmPasswordValid) {
      confirmPasswordErrorText.value = null;
    } else {
      confirmPasswordErrorText.value = "Confirm password is invalid";
    }

    return (isEmailValid && isPasswordValid && isConfirmPasswordValid);
  }
}
