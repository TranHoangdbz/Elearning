import 'package:flutter/material.dart';
import 'package:flutter_facebook_auth/flutter_facebook_auth.dart';
import 'package:get/get.dart';
import 'package:uit_elearning/constants/asset_strings.dart';
import 'package:uit_elearning/constants/text_styles.dart';
import 'package:uit_elearning/global_widgets/custom_dialog.dart';
import 'package:uit_elearning/global_widgets/custom_elevated_button.dart';
import 'package:uit_elearning/global_widgets/custom_icon_button.dart';
import 'package:uit_elearning/global_widgets/custom_outlined_button.dart';
import 'package:uit_elearning/global_widgets/custom_text_field.dart';
import 'package:uit_elearning/modules/authentication/controllers/login_controller.dart';

import '../../../constants/app_colors.dart';
import '../../../global_widgets/logo_widget.dart';

class LoginScreen extends StatelessWidget {
  LoginScreen({Key? key}) : super(key: key);
  final _controller = Get.find<LoginController>();

  @override
  Widget build(BuildContext context) {
    double screenHeight = MediaQuery.of(context).size.height -
        MediaQuery.of(context).viewPadding.top;

    return SafeArea(
      child: GestureDetector(
        onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
        child: Material(
          color: AppColors.primaryColor,
          child: Stack(
            children: [
              Container(
                alignment: Alignment.center,
                height: screenHeight * 0.25,
                child: const LogoWidget(
                  showLabel: false,
                ),
              ),
              DraggableScrollableSheet(
                  initialChildSize: 0.75,
                  minChildSize: 0.75,
                  maxChildSize: 1,
                  builder: (context, scrollController) {
                    return Container(
                      decoration: const BoxDecoration(
                        color: AppColors.backgroundColor,
                        borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(20),
                          topRight: Radius.circular(20),
                        ),
                      ),
                      child: Scaffold(
                        extendBodyBehindAppBar: true,
                        backgroundColor: Colors.transparent,
                        appBar: AppBar(
                          backgroundColor: Colors.transparent,
                          elevation: 0,
                          leading: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: CustomIconButton(
                              onTap: () {
                                Get.back();
                              },
                              icon: const Icon(
                                Icons.arrow_back_ios_new_rounded,
                                color: AppColors.onBackgroundColor,
                              ),
                            ),
                          ),
                        ),
                        body: Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 36),
                          child: ListView(
                            physics: const BouncingScrollPhysics(),
                            controller: scrollController,
                            children: [
                              const SizedBox(
                                height: 24,
                              ),
                              Obx(() {
                                return CustomTextField(
                                  label: 'EMAIL/PHONE NUMBER',
                                  hintText: 'Enter your email/phone number',
                                  textController:
                                      _controller.emailTextController,
                                  errorText: _controller.emailErrorText.value,
                                );
                              }),
                              const SizedBox(
                                height: 24,
                              ),
                              Obx(() {
                                return CustomTextField(
                                  label: 'PASSWORD',
                                  hintText: 'Enter password',
                                  keyboardType: TextInputType.visiblePassword,
                                  password: true,
                                  textController:
                                      _controller.passwordTextController,
                                  errorText:
                                      _controller.passwordErrorText.value,
                                );
                              }),
                              const SizedBox(
                                height: 24,
                              ),
                              CustomElevatedButton(
                                onPressed: () {
                                  _controller.handleLogin();
                                },
                                primary: AppColors.primaryColor,
                                onPrimary: AppColors.onPrimaryColor,
                                label: 'Login',
                              ),
                              const SizedBox(
                                height: 24,
                              ),
                              Row(
                                children: [
                                  Expanded(
                                    child: Divider(
                                      color: AppColors.onBackgroundColor
                                          .withOpacity(0.37),
                                      thickness: 1,
                                    ),
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 8),
                                    child: Text(
                                      'OR',
                                      style: TextStyles
                                          .textStyleOnBackgroundColor13w700,
                                    ),
                                  ),
                                  Expanded(
                                    child: Divider(
                                      color: AppColors.onBackgroundColor
                                          .withOpacity(0.37),
                                      thickness: 1,
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(
                                height: 24,
                              ),
                              CustomOutlinedButton(
                                label: 'Continue with Facebook',
                                icon: Image.asset(PNGAssetString.facebook),
                                onPressed: () {
                                  _controller.handleLoginWithFacebook();
                                },
                              ),
                              const SizedBox(
                                height: 12,
                              ),
                              CustomOutlinedButton(
                                label: 'Continue with Google',
                                icon: Image.asset(PNGAssetString.google),
                                onPressed: () {
                                  _controller.handleLoginWithGoogle();
                                },
                              ),
                              const SizedBox(
                                height: 24,
                              ),
                            ],
                          ),
                        ),
                      ),
                    );
                  }),
            ],
          ),
        ),
      ),
    );
  }
}
