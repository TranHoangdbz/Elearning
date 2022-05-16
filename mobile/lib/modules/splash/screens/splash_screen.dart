import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:uit_elearning/modules/splash/controllers/splash_controller.dart';
import '../../../constants/app_colors.dart';
import '../../../global_widgets/logo_widget.dart';

class SplashScreen extends StatelessWidget {
  SplashScreen({Key? key}) : super(key: key);
  final _controller = Get.find<SplashController>();

  @override
  Widget build(BuildContext context) {
    return const SafeArea(
      child: Material(
        color: AppColors.primaryColor,
        child: Center(
          child: LogoWidget(),
        ),
      ),
    );
  }
}
