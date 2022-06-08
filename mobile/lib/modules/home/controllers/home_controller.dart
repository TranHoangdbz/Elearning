import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:uit_elearning/constants/app_colors.dart';
import 'package:uit_elearning/data/services/auth_service.dart';
import 'package:uit_elearning/global_widgets/custom_dialog.dart';
import 'package:uit_elearning/modules/profile/widgets/change_password_dialog.dart';

class HomeController extends GetxController {
  int tabIndex = 0;

  void changeTabIndex(int index) {
    tabIndex = index;
    // print('tabIndex = $tabIndex');
    update();
  }

  @override
  void onInit() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? emailResetPassword = prefs.getString('emailResetPassword');

    if (emailResetPassword != null &&
        AuthenticationService.instance.currentUser != null) {
      if (emailResetPassword
              .compareTo(AuthenticationService.instance.currentUser!.email) ==
          0) {
        final String result = await showDialog(
          context: Get.context!,
          builder: (context) {
            return const CustomDialog(
              content:
                  'You have reset your password recently, please change your password for safety!',
              icon: Icon(
                Icons.info_rounded,
                color: AppColors.blueColor,
                size: 48,
              ),
              showConfirmButton: true,
              confirmButtonLabel: 'Change',
            );
          },
        );

        if (result.compareTo('confirm') == 0) {
          showDialog(
            context: Get.context!,
            builder: (context) {
              return const ChangePasswordDialog();
            },
          );
        }
      }
    }

    super.onInit();
  }
  //
  // @override
  // void onReady() {
  //   super.onReady();
  // }

  @override
  void onClose() {}
}
