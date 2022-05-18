import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:uit_elearning/constants/app_colors.dart';
import 'package:uit_elearning/data/models/user.dart';
import 'package:uit_elearning/data/providers/auth_provider.dart';
import 'package:uit_elearning/global_widgets/custom_dialog.dart';
import 'package:uit_elearning/routes/routes.dart';

class AuthenticationService {
  AuthenticationService._();
  static final AuthenticationService instance = AuthenticationService._();

  final AuthenticationProvider _authProvider = AuthenticationProvider();

  User? currentUser;

  signUp({
    required String email,
    required String password,
    required String confirmPassword,
    String fullName = '',
    String phoneNumber = '',
  }) {
    _authProvider.signUp(
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      fullName: fullName,
      phoneNumber: phoneNumber,
      onResponse: authenticate,
    );
  }

  login({
    required String email,
    required String password,
  }) {
    _authProvider.login(
      email: email,
      password: password,
      onResponse: authenticate,
    );
  }

  quickLogin({
    required String email,
    required String hash,
  }) {
    _authProvider.quickLogin(
      email: email,
      hash: hash,
      onResponse: authenticate,
    );
  }

  loginWithFacebook() {
    _authProvider.loginWithFacebook(onResponse: authenticate);
  }

  signOut() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setBool('authenticated', false);
    Get.offNamed(Routes.auth);
  }

  authenticate(Map<String, dynamic> data) async {
    if (!data["error"]) {
      currentUser = User.fromJson(data['result']);
      SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setBool('authenticated', true);
      await prefs.setString('userEmail', currentUser!.email);
      await prefs.setString('userHash', currentUser!.password);
      await prefs.setString('userFullName', currentUser!.fullName);
      await prefs.setString('userPhoneNumber', currentUser!.phoneNumber);
      Get.offAllNamed(Routes.home);
    } else {
      currentUser = null;
      SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setBool('authenticated', false);
      showDialog(
        context: Get.context!,
        builder: (context) {
          return CustomDialog(
            content: data["message"],
            icon: const Icon(
              Icons.error,
              color: AppColors.redColor,
              size: 48,
            ),
          );
        },
      );
    }
  }
}
