import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:flutter_facebook_auth/flutter_facebook_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:uit_elearning/constants/app_strings.dart';
import 'package:web_socket_channel/io.dart';

class AuthenticationProvider {
  signUp({
    required String email,
    required String password,
    required String confirmPassword,
    String? phoneNumber,
    String? fullName,
    String? profilePicture,
    List<Object>? takenCourses,
    List<Object>? currentCourses,
    required Function(Map<String, dynamic>) onResponse,
  }) async {
    bool isValid = RegExp(
            r"^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+")
        .hasMatch(email);
    if (isValid == true) {
      if (password == confirmPassword && password.length >= 8) {
        try {
          Map<String, dynamic> req = {
            'email': email,
            'password': password,
            'fullName': fullName,
            'phoneNumber': phoneNumber,
            'profilePicture': profilePicture,
            'takenCourses': [],
            'currentCourses': [],
          };
          final response = await Dio().post(
            '${AppStrings.connectString}/api/users/register',
            data: req,
          );
          Map<String, dynamic> data = {
            'error': false,
            'message':
                'Please check your email to complete the verification step.',
            'result': response.data,
          };
          onResponse(data);
        } on DioError catch (e) {
          try {
            Map<String, dynamic> data = {
              'error': true,
              'message': e.response!.data['msg'] ??
                  e.response!.data['message'] ??
                  e.response!.data['mes'],
              'result': null,
            };
            onResponse(data);
          } catch (e) {
            Map<String, dynamic> data = {
              'error': true,
              'message': 'Sign up failed with unknown error',
              'result': null,
            };
            onResponse(data);
          }
        }
      } else {
        Map<String, dynamic> data = {
          'error': true,
          'message': 'Password is invalid',
          'result': null,
        };
        onResponse(data);
      }
    } else {
      Map<String, dynamic> data = {
        'error': true,
        'message': 'Email is invalid',
        'result': null,
      };
      onResponse(data);
    }
  }

  login({
    required String email,
    required String password,
    required Function(Map<String, dynamic>) onResponse,
  }) async {
    if (email.isNotEmpty && password.isNotEmpty) {
      try {
        Map<String, dynamic> req = {
          'email': email,
          'password': password,
        };
        final response = await Dio().post(
          '${AppStrings.connectString}/api/users/login',
          data: req,
        );
        Map<String, dynamic> data = {
          'error': false,
          'message': 'Successfully authenticated',
          'result': response.data,
        };
        onResponse(data);
      } on DioError catch (e) {
        try {
          Map<String, dynamic> data = {
            'error': true,
            'message': e.response!.data['msg'] ??
                e.response!.data['message'] ??
                e.response!.data['mes'],
            'result': null,
          };
          onResponse(data);
        } catch (e) {
          Map<String, dynamic> data = {
            'error': true,
            'message': 'Login failed with unknown error',
            'result': null,
          };
          onResponse(data);
        }
      }
    } else {
      Map<String, dynamic> data = {
        'error': true,
        'message': 'Email or password is empty',
        'result': null,
      };
      onResponse(data);
    }
  }

  quickLogin({
    required String email,
    required String hash,
    required Function(Map<String, dynamic>) onResponse,
  }) async {
    if (email.isNotEmpty && hash.isNotEmpty) {
      try {
        await login(email: email, password: hash, onResponse: onResponse);
      } catch (e) {
        Map<String, dynamic> data = {
          'error': true,
          'message': 'Login failed with unkown error',
          'result': null,
        };
        onResponse(data);
      }
    } else {
      Map<String, dynamic> data = {
        'error': true,
        'message': 'Email or password is empty',
        'result': null,
      };
      onResponse(data);
    }
  }

  loginWithFacebook({
    required Function(Map<String, dynamic>) onResponse,
  }) async {
    final LoginResult result = await FacebookAuth.instance.login();
    if (result.status == LoginStatus.success) {
      final userData = await FacebookAuth.instance.getUserData();
      try {
        Map<String, dynamic> req = {
          'email': userData['email'],
          'password': userData['id'],
          'fullName': userData['name'],
          'phoneNumber': '0',
          'profilePicture': userData['picture']['data']['url'],
          'takenCourses': [],
          'currentCourses': [],
          'facebookId': userData['id'],
        };
        final response = await Dio().post(
          '${AppStrings.connectString}/api/users/register',
          data: req,
        );
        Map<String, dynamic> data = {
          'error': false,
          'message':
              'Please check your email to complete the verification step.',
          'result': response.data,
        };
        onResponse(data);
      } on DioError {
        login(
            email: userData['email'],
            password: userData['id'],
            onResponse: onResponse);
      } on Exception {
        Map<String, dynamic> data = {
          'error': true,
          'message': 'Login failed with unknown error',
          'result': null,
        };
        onResponse(data);
      }
    } else {
      Map<String, dynamic> data = {
        'error': true,
        'message': result.message,
        'result': null,
      };
      onResponse(data);
    }
  }

  loginWithGoogle({
    required Function(Map<String, dynamic>) onResponse,
  }) async {
    String authKey = AppStrings.authKey;

    GoogleSignIn googleSignIn = GoogleSignIn();

    await googleSignIn.signOut();

    GoogleSignInAccount? user = await googleSignIn.signIn();

    if (user != null) {
      try {
        Map<String, dynamic> req = {
          'email': user.email,
          'password': user.id,
          'fullName': user.displayName,
          'phoneNumber': '0',
          'profilePicture': user.photoUrl,
          'takenCourses': [],
          'currentCourses': [],
          'googleId': user.id,
        };
        final response = await Dio().post(
          '${AppStrings.connectString}/api/users/register',
          data: req,
        );
        Map<String, dynamic> data = {
          'error': false,
          'message':
              'Please check your email to complete the verification step.',
          'result': response.data,
        };
        onResponse(data);
      } on DioError {
        login(email: user.email, password: user.id, onResponse: onResponse);
      } on Exception {
        Map<String, dynamic> data = {
          'error': true,
          'message': 'Login failed with unknown error',
          'result': null,
        };
        onResponse(data);
      }
    } else {
      Map<String, dynamic> data = {
        'error': true,
        'message': 'Sign in failed',
        'result': null,
      };
      onResponse(data);
    }
  }

  resetPassword({
    required String dest,
    required Function(Map<String, dynamic>) onResponse,
  }) async {
    try {
      Map<String, dynamic> req = {
        'email': dest,
      };
      final response = await Dio().put(
        '${AppStrings.connectString}/api/users/get-new-password',
        data: req,
      );
      Map<String, dynamic> data = {
        'error': false,
        'message': 'Successfully reset password',
        'result': response.data,
      };
      onResponse(data);
    } on DioError catch (e) {
      try {
        Map<String, dynamic> data = {
          'error': true,
          'message': e.response!.data['msg'] ??
              e.response!.data['message'] ??
              e.response!.data['mes'],
          'result': null,
        };
        onResponse(data);
      } catch (e) {
        Map<String, dynamic> data = {
          'error': true,
          'message': 'Send reset password failed with unknown error',
          'result': null,
        };
        onResponse(data);
      }
    }
  }
}
