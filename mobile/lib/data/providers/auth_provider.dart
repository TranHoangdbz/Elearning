import 'dart:convert';
import 'package:uit_elearning/constants/app_strings.dart';
import 'package:web_socket_channel/io.dart';

class AuthenticationProvider {
  signUp({
    required String email,
    required String password,
    required String confirmPassword,
    String phoneNumber = '',
    String fullName = '',
    required Function(Map<String, dynamic>) onResponse,
  }) async {
    // Check if email is valid.
    bool isValid = RegExp(
            r"^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+")
        .hasMatch(email);
    String authKey = AppStrings.authKey;
    // Check if email is valid
    if (isValid == true) {
      if (password == confirmPassword && password.length >= 8) {
        IOWebSocketChannel channel;
        try {
          // Create connection.
          channel =
              IOWebSocketChannel.connect('ws://172.30.158.35:32/signup$email');

          // Data that will be sended to Node.js
          String signUpData =
              "{'auth':'$authKey','cmd': 'signup','email': '$email','hash': '$confirmPassword','fullName': '$fullName','phoneNumber': '$phoneNumber'}";
          // Send data to Node.js
          channel.sink.add(signUpData);
          // listen for data from the server
          channel.stream.listen((event) async {
            dynamic data = json.decode(event);
            channel.sink.close();
            return onResponse(data);
          });
        } catch (e) {
          print("Error on connecting to websocket: " + e.toString());
        }
      } else {
        print("Password is invalid");
      }
    } else {
      print("Email is invalid");
    }
  }

  login({
    required String email,
    required String password,
    required Function(Map<String, dynamic>) onResponse,
  }) async {
    String authKey = AppStrings.authKey;
    if (email.isNotEmpty && password.isNotEmpty) {
      IOWebSocketChannel channel;
      try {
        // Create connection.
        channel =
            IOWebSocketChannel.connect('ws://172.30.158.35:32/login$email');

        // Data that will be sended to Node.js
        String login =
            "{'auth':'$authKey','cmd':'login','email':'$email','hash':'$password'}";
        channel.sink.add(login);
        channel.stream.listen((event) async {
          var data = json.decode(event);
          channel.sink.close();
          return onResponse(data);
        });
      } catch (e) {
        print("Error on connecting to websocket: " + e.toString());
      }
    } else {
      print("Email or password is empty");
    }
  }

  quickLogin({
    required String email,
    required String hash,
    required Function(Map<String, dynamic>) onResponse,
  }) async {
    String authKey = AppStrings.authKey;
    if (email.isNotEmpty && hash.isNotEmpty) {
      IOWebSocketChannel channel;
      try {
        // Create connection.
        channel =
            IOWebSocketChannel.connect('ws://172.30.158.35:32/login$email');

        // Data that will be sended to Node.js
        String login =
            "{'auth':'$authKey','cmd':'quickLogin','email':'$email','hash':'$hash'}";
        channel.sink.add(login);
        channel.stream.listen((event) async {
          var data = json.decode(event);
          channel.sink.close();
          return onResponse(data);
        });
      } catch (e) {
        print("Error on connecting to websocket: " + e.toString());
      }
    } else {
      print("Email or password is empty");
    }
  }
}
