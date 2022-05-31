import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:uit_elearning/global_widgets/custom_elevated_button.dart';
import 'package:uit_elearning/global_widgets/custom_icon_button.dart';
import 'package:uit_elearning/global_widgets/custom_text_field.dart';
import 'package:uit_elearning/modules/authentication/controllers/sign_up_controller.dart';

import '../../../constants/app_colors.dart';
import '../../../global_widgets/logo_widget.dart';

class SignUpScreen extends StatelessWidget {
  SignUpScreen({Key? key}) : super(key: key);

  final _controller = Get.find<SignUpController>();

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
                                  label: 'EMAIL',
                                  hintText: 'Enter your email',
                                  keyboardType: TextInputType.emailAddress,
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
                                  label: 'FULL NAME',
                                  hintText: 'Enter your name',
                                  keyboardType: TextInputType.name,
                                  textController:
                                      _controller.fullNameTextControler,
                                  errorText:
                                      _controller.fullNameErrorText.value,
                                );
                              }),
                              const SizedBox(
                                height: 24,
                              ),
                              Obx(() {
                                return CustomTextField(
                                  label: 'PHONE NUMBER',
                                  hintText: 'Enter your phone number',
                                  keyboardType: TextInputType.phone,
                                  textController:
                                      _controller.phoneNumberTextController,
                                  errorText:
                                      _controller.phoneNumberErrorText.value,
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
                              Obx(() {
                                return CustomTextField(
                                  label: 'CONFIRM PASSWORD',
                                  hintText: 'Enter password again',
                                  keyboardType: TextInputType.visiblePassword,
                                  password: true,
                                  textController:
                                      _controller.confirmPasswordTextController,
                                  errorText: _controller
                                      .confirmPasswordErrorText.value,
                                );
                              }),
                              const SizedBox(
                                height: 24,
                              ),
                              CustomElevatedButton(
                                onPressed: () {
                                  _controller.handleSignUp();
                                },
                                primary: AppColors.primaryColor,
                                onPrimary: AppColors.onPrimaryColor,
                                label: 'Sign up and login',
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
