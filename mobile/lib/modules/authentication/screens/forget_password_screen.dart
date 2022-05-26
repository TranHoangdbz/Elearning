import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:uit_elearning/global_widgets/custom_elevated_button.dart';
import 'package:uit_elearning/global_widgets/custom_icon_button.dart';
import 'package:uit_elearning/global_widgets/custom_text_field.dart';
import 'package:uit_elearning/modules/authentication/controllers/forget_password_controller.dart';

import '../../../constants/app_colors.dart';
import '../../../global_widgets/logo_widget.dart';

class ForgetPassword extends StatelessWidget {
  ForgetPassword({Key? key}) : super(key: key);

  final _controller = Get.find<ForgetPasswordController>();

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
                          child: Obx(() {
                            return ListView(
                              physics: const BouncingScrollPhysics(),
                              controller: scrollController,
                              children: [
                                const SizedBox(
                                  height: 24,
                                ),
                                CustomTextField(
                                  label: 'EMAIL/PHONE NUMBER',
                                  hintText: 'Enter your email/phone number',
                                  textController:
                                      _controller.emailTextController,
                                  errorText: _controller.emailErrorText.value,
                                ),
                                const SizedBox(
                                  height: 24,
                                ),
                                if (_controller.limitSendAction.value)
                                  CustomElevatedButton(
                                    onPressed: null,
                                    primary: AppColors.disabledColor,
                                    onPrimary: AppColors.onDisabledColor,
                                    label:
                                        'Please wait for ${_controller.countDown.value}s',
                                  ),
                                if (!_controller.limitSendAction.value)
                                  CustomElevatedButton(
                                    onPressed: () {
                                      _controller.handleResetPassword();
                                    },
                                    primary: AppColors.primaryColor,
                                    onPrimary: AppColors.onPrimaryColor,
                                    label: 'Send reset password',
                                  ),
                                const SizedBox(
                                  height: 24,
                                ),
                              ],
                            );
                          }),
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
