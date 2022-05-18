import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:uit_elearning/constants/app_colors.dart';
import 'package:uit_elearning/data/services/auth_service.dart';
import 'package:uit_elearning/global_widgets/custom_elevated_button.dart';

import '../controllers/home_controller.dart';

class HomeScreen extends StatelessWidget {
  HomeScreen({Key? key}) : super(key: key);

  final _controller = Get.find<HomeController>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: CustomElevatedButton(
          label: 'Sign out',
          primary: AppColors.primaryColor,
          onPrimary: AppColors.onPrimaryColor,
          onPressed: () {
            AuthenticationService.instance.signOut();
          },
        ),
      ),
    );
  }
}
