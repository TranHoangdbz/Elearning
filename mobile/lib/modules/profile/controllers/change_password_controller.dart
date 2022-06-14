import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:uit_elearning/data/services/auth_service.dart';

class ChangePasswordController extends GetxController {
  late TextEditingController passwordTextController;
  late TextEditingController newPasswordTextController;
  late TextEditingController confirmNewPasswordTextController;
  Rxn<String> passwordErrorText = Rxn<String>();
  Rxn<String> newPasswordErrorText = Rxn<String>();
  Rxn<String> confirmNewPasswordErrorText = Rxn<String>();

  @override
  void onInit() {
    passwordTextController = TextEditingController();
    passwordErrorText.value = null;
    newPasswordTextController = TextEditingController();
    newPasswordErrorText.value = null;
    confirmNewPasswordTextController = TextEditingController();
    confirmNewPasswordErrorText.value = null;
    super.onInit();
  }

  void handleChangePassword() async {
    String password = passwordTextController.text;
    String newPassword = newPasswordTextController.text;
    String confirmNewPassword = confirmNewPasswordTextController.text;
    if (validateInput(
      password,
      newPassword,
      confirmNewPassword,
    )) {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      String token = prefs.getString('token') ?? '';
      AuthenticationService.instance
          .changePassword(token, password, newPassword);
    }
  }

  bool validateInput(
    String password,
    String newPassword,
    String confirmNewPassword,
  ) {
    bool isPasswordValid = RegExp(
            r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")
        .hasMatch(password);
    bool isNewPasswordValid = RegExp(
            r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")
        .hasMatch(newPassword);
    bool isConfirmNewPasswordValid = RegExp(
            r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")
        .hasMatch(confirmNewPassword);

    if (isPasswordValid) {
      passwordErrorText.value = null;
    } else {
      passwordErrorText.value =
          "Must a password have minimum 8 characters,\nat least one uppercase letter, one lowercase letter,\none number and one special character";
    }

    if (isNewPasswordValid) {
      newPasswordErrorText.value = null;
    } else {
      newPasswordErrorText.value =
          "Must a password have minimum 8 characters,\nat least one uppercase letter, one lowercase letter,\none number and one special character";
    }

    if (isConfirmNewPasswordValid) {
      confirmNewPasswordErrorText.value = null;
    } else {
      confirmNewPasswordErrorText.value =
          "Must a password have minimum 8 characters,\nat least one uppercase letter, one lowercase letter,\none number and one special character";
    }

    if (isConfirmNewPasswordValid) {
      if (newPassword.compareTo(confirmNewPassword) != 0) {
        isConfirmNewPasswordValid = false;
        confirmNewPasswordErrorText.value =
            'Confirm password and new password are not the same';
      } else {
        confirmNewPasswordErrorText.value = null;
        isConfirmNewPasswordValid = true;
      }
    }

    return (isPasswordValid && isNewPasswordValid && isConfirmNewPasswordValid);
  }
}
