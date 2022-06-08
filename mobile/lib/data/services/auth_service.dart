import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:uit_elearning/constants/app_colors.dart';
import 'package:uit_elearning/data/models/user.dart';
import 'package:uit_elearning/data/providers/auth_provider.dart';
import 'package:uit_elearning/global_widgets/custom_dialog.dart';
import 'package:uit_elearning/modules/profile/controllers/change_password_controller.dart';
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

  resetPassword(String dest) async {
    _authProvider.resetPassword(dest: dest, onResponse: sendResetPassowrd);
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setString('emailResetPassword', dest);
  }

  changePassword(
    String token,
    String password,
    String newPassword,
  ) {
    _authProvider.changePassword(
      token: token,
      password: password,
      newPassword: newPassword,
      onResponse: (data) async {
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
          SharedPreferences prefs = await SharedPreferences.getInstance();
          await prefs.setString('userHash', newPassword);
          final String? emailResetPassword =
              prefs.getString('emailResetPassword');
          if (emailResetPassword != null) {
            prefs.remove('emailResetPassword');
          }
          await showDialog(
            context: Get.context!,
            builder: (context) {
              return CustomDialog(
                content: data["message"],
                icon: const Icon(
                  Icons.check_circle_rounded,
                  color: AppColors.greenColor,
                  size: 48,
                ),
              );
            },
          );
          Get.back();
          Get.delete<ChangePasswordController>();
        }
      },
    );
  }

  Future sendResetPassowrd(Map<String, dynamic> data) async {
    if (data["error"]) {
      await showDialog(
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
      SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.remove('emailResetPassword');
    } else {
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
      currentUser = User.fromJson(data['result']['user']);
      if (currentUser!.verified) {
        SharedPreferences prefs = await SharedPreferences.getInstance();
        await prefs.setBool('authenticated', true);
        await prefs.setString('token', data['result']['token'] ?? '');
        await prefs.setString('userEmail', currentUser!.email);
        await prefs.setString('userFullName', currentUser!.fullName ?? '');
        await prefs.setString(
            'userPhoneNumber', currentUser!.phoneNumber ?? '');
        await prefs.setString(
            'userProfilePicture', currentUser!.profilePicture ?? '');
        await prefs.setString(
            'userTakenCourses', currentUser!.takenCourses.toString());
        await prefs.setString(
            'userCurrentCourses', currentUser!.currentCourses.toString());
        await prefs.setBool('verified', currentUser!.verified);
        Get.offAllNamed(Routes.home);
      } else {
        await showDialog(
          context: Get.context!,
          builder: (context) {
            return CustomDialog(
              content: data["message"],
              icon: const Icon(
                Icons.check_circle_rounded,
                color: AppColors.greenColor,
                size: 48,
              ),
            );
          },
        );
        Get.offAllNamed(Routes.auth);
      }
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
