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
              'message': e.response!.data['msg'],
              'result': null,
            };
            onResponse(data);
          } catch (e) {
            Map<String, dynamic> data = {
              'error': true,
              'message': 'Sign un failed with unknown error',
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
            'message': e.response!.data['message'],
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
    //String authKey = AppStrings.authKey;
    if (email.isNotEmpty && hash.isNotEmpty) {
      // IOWebSocketChannel channel;
      try {
        //   // Create connection.
        //   channel = IOWebSocketChannel.connect(
        //       '${AppStrings.protocol}://${AppStrings.host}:${AppStrings.port}/login$email');

        //   // Data that will be sended to Node.js
        //   String login =
        //       "{'auth':'$authKey','cmd':'quickLogin','email':'$email','hash':'$hash'}";
        //   channel.sink.add(login);
        //   channel.stream.listen((event) async {
        //     var data = json.decode(event);
        //     channel.sink.close();
        //     return onResponse(data);
        //   });
      } catch (e) {
        Map<String, dynamic> data = {
          'error': true,
          'message': 'Sign in failed',
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
    String authKey = AppStrings.authKey;
    final LoginResult result = await FacebookAuth.instance.login();
    if (result.status == LoginStatus.success) {
      final userData = await FacebookAuth.instance.getUserData();

      IOWebSocketChannel channel;
      try {
        channel = IOWebSocketChannel.connect(
            '${AppStrings.protocol}://${AppStrings.host}:${AppStrings.port}/login${userData['email']}');
        String login =
            "{'auth':'$authKey','cmd':'signInWithFacebook','email':'${userData['email']}','token':'${result.accessToken!.token}','fullName':'${userData['name']}'}";
        channel.sink.add(login);
        channel.stream.listen((event) async {
          var data = json.decode(event);
          channel.sink.close();
          return onResponse(data);
        });
      } catch (e) {
        Map<String, dynamic> data = {
          'error': true,
          'message': 'Sign in failed',
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
      GoogleSignInAuthentication auth = await user.authentication;

      IOWebSocketChannel channel;
      try {
        channel = IOWebSocketChannel.connect(
            '${AppStrings.protocol}://${AppStrings.host}:${AppStrings.port}/login${user.email}');
        String login =
            "{'auth':'$authKey','cmd':'signInWithGoogle','email':'${user.email}','token':'${auth.accessToken}','fullName':'${user.displayName}'}";
        channel.sink.add(login);
        channel.stream.listen((event) async {
          var data = json.decode(event);
          channel.sink.close();
          return onResponse(data);
        });
      } catch (e) {
        Map<String, dynamic> data = {
          'error': true,
          'message': 'Sign in failed',
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
          'message': e.response!.data['message'],
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
