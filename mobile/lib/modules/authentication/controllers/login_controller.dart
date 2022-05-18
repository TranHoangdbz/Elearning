import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:uit_elearning/data/services/auth_service.dart';

class LoginController extends GetxController {
  late TextEditingController emailTextController;
  late TextEditingController passwordTextController;
  Rxn<String> emailErrorText = Rxn<String>();
  Rxn<String> passwordErrorText = Rxn<String>();

  @override
  void onInit() {
    emailTextController = TextEditingController();
    passwordTextController = TextEditingController();
    emailErrorText.value = null;
    passwordErrorText.value = null;
    super.onInit();
  }

  void handleLogin() async {
    String email = emailTextController.text;
    String password = passwordTextController.text;
    if (validateInput(email, password)) {
      await AuthenticationService.instance.login(
        email: email,
        password: password,
      );
    }
  }

  bool validateInput(String email, String password) {
    bool isEmailValid =
        RegExp(r"^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+")
                .hasMatch(email) &&
            email.isNotEmpty;
    bool isPasswordValid = password.length >= 8;

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

    return (isEmailValid && isPasswordValid);
  }
}
