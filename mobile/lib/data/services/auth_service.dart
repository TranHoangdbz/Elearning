import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_sign_in/google_sign_in.dart';
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
    String? fullName,
    String? phoneNumber,
    String? profilePicture,
    List<Object>? takenCourses,
    List<Object>? currentCourses,
  }) {
    _authProvider.signUp(
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      fullName: fullName,
      phoneNumber: phoneNumber,
      profilePicture: profilePicture,
      takenCourses: takenCourses,
      currentCourses: currentCourses,
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

  loginWithGoogle() {
    _authProvider.loginWithGoogle(onResponse: authenticate);
  }

  signOut() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setBool('authenticated', false);

    GoogleSignIn googleSignIn = GoogleSignIn();

    if (await googleSignIn.isSignedIn()) {
      await googleSignIn.signOut();
    }

    Get.offNamed(Routes.auth);
  }

  resetPassword(String dest) {
    _authProvider.resetPassword(dest: dest, onResponse: sendResetPassowrd);
  }

  Future sendResetPassowrd(Map<String, dynamic> data) async {
    if (data["error"]) {
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
    } else {
      // const serviceId = 'service_kyd2w0r';
      // const templateId = 'template_pf3a7wd';
      // const userId = 'XAwu7ISgZJFzfLd0U';

      // const url = 'https://api.emailjs.com/api/v1.0/email/send';
      // final response = await Dio().post(url, data: {
      //   'service_id': serviceId,
      //   'template_id': templateId,
      //   'user_id': userId,
      //   'template_params': {
      //     'message': 'Alo',
      //     'to_name': 'Lam Truong',
      //     'to_email': 'lamtruoq@gmail.com',
      //   }
      // });

      // print(response);
      showDialog(
        context: Get.context!,
        builder: (context) {
          return const CustomDialog(
            content:
                "A new password has been sent to your email/phone number, please check",
            icon: Icon(
              Icons.check_circle_rounded,
              color: AppColors.greenColor,
              size: 48,
            ),
          );
        },
      );
    }
  }

  authenticate(Map<String, dynamic> data) async {
    if (!data["error"]) {
      currentUser = User.fromJson(data['result']);
      SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setBool('authenticated', true);
      await prefs.setString('userEmail', currentUser!.email);
      await prefs.setString('userHash', currentUser!.password);
      await prefs.setString('userFullName', currentUser!.fullName ?? '');
      await prefs.setString('userPhoneNumber', currentUser!.phoneNumber ?? '');
      await prefs.setString(
          'userProfilePicture', currentUser!.profilePicture ?? '');
      await prefs.setString(
          'userTakenCourses', currentUser!.takenCourses.toString());
      await prefs.setString(
          'userCurrentCourses', currentUser!.currentCourses.toString());
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
