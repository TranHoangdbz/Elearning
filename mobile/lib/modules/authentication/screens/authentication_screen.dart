import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:uit_elearning/routes/routes.dart';

import '../../../constants/app_colors.dart';
import '../../../constants/text_styles.dart';
import '../../../global_widgets/custom_elevated_button.dart';
import '../../../global_widgets/custom_text_button.dart';
import '../../../global_widgets/logo_widget.dart';

class AuthenticationScreen extends StatelessWidget {
  const AuthenticationScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Material(
        color: AppColors.primaryColor,
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 64, horizontal: 24),
          child: Column(
            children: [
              const LogoWidget(),
              Expanded(
                child: Center(
                  child: Text(
                    'Welcome',
                    style: TextStyles.textStyleSecondaryLightColor36w800,
                  ),
                ),
              ),
              CustomElevatedButton(
                label: 'Login',
                onPressed: () {
                  Get.toNamed(Routes.login);
                },
              ),
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 8),
                child: CustomTextButton(
                  label: 'Forget password?',
                  onPressed: () {
                    Get.toNamed(Routes.forgetPassword);
                  },
                ),
              ),
              Text(
                'Or',
                style: TextStyles.textStyleOnPrimaryColor12w300,
              ),
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 8),
                child: CustomTextButton(
                  label: 'Sign up',
                  onPressed: () {
                    Get.toNamed(Routes.signUp);
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
