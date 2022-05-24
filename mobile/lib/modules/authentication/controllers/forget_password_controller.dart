import 'dart:async';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:uit_elearning/data/services/auth_service.dart';

class ForgetPasswordController extends GetxController {
  late TextEditingController emailTextController;
  Rxn<String> emailErrorText = Rxn<String>();

  late Timer timer;
  Rx<int> countDown = 30.obs;

  Rx<bool> limitSendAction = false.obs;

  @override
  void onInit() {
    emailTextController = TextEditingController();
    emailErrorText.value = null;
    super.onInit();
  }

  void handleResetPassword() async {
    String email = emailTextController.text;
    if (validateInput(email)) {
      await AuthenticationService.instance.resetPassword(email);
      limitSendAction.value = true;

      timer = Timer.periodic(
        const Duration(seconds: 1),
        (Timer timer) {
          if (countDown.value == 0) {
            timer.cancel();
            limitSendAction.value = false;
            countDown.value = 30;
          } else {
            countDown.value--;
          }
        },
      );
    }
  }

  bool validateInput(String email) {
    bool isEmailValid =
        RegExp(r"^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+")
                .hasMatch(email) &&
            email.isNotEmpty;

    if (isEmailValid) {
      emailErrorText.value = null;
    } else {
      emailErrorText.value = "Email is invalid";
    }

    return (isEmailValid);
  }
}
