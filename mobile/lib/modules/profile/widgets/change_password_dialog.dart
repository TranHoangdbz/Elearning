import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:uit_elearning/constants/app_colors.dart';
import 'package:uit_elearning/constants/text_styles.dart';
import 'package:uit_elearning/global_widgets/custom_elevated_button.dart';
import 'package:uit_elearning/global_widgets/custom_outlined_button.dart';
import 'package:uit_elearning/global_widgets/custom_text_field.dart';
import 'package:uit_elearning/modules/profile/controllers/change_password_controller.dart';

class ChangePasswordDialog extends StatelessWidget {
  const ChangePasswordDialog({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Get.put(ChangePasswordController());
    final _controller = Get.find<ChangePasswordController>();

    return Dialog(
      backgroundColor: Colors.transparent,
      child: Container(
        padding: const EdgeInsets.fromLTRB(36, 24, 36, 24),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(15),
          color: AppColors.backgroundColor,
        ),
        child: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                'Change password',
                style: TextStyles.textStyleOnBackgroundColor18w600,
              ),
              const SizedBox(
                height: 24,
              ),
              CustomTextField(
                label: 'Enter current password',
                hintText: 'Enter current password',
                keyboardType: TextInputType.visiblePassword,
                password: true,
                textController: _controller.passwordTextController,
                errorText: _controller.passwordErrorText.value,
              ),
              const SizedBox(
                height: 24,
              ),
              CustomTextField(
                label: 'Enter new password',
                hintText: 'Enter new password',
                keyboardType: TextInputType.visiblePassword,
                password: true,
                textController: _controller.newPasswordTextController,
                errorText: _controller.newPasswordErrorText.value,
              ),
              const SizedBox(
                height: 24,
              ),
              CustomTextField(
                label: 'Confirm new password',
                hintText: 'Confirm new password',
                keyboardType: TextInputType.visiblePassword,
                password: true,
                textController: _controller.confirmNewPasswordTextController,
                errorText: _controller.confirmNewPasswordErrorText.value,
              ),
              const SizedBox(
                height: 36,
              ),
              Row(
                children: [
                  Expanded(
                    child: CustomOutlinedButton(
                      onPressed: () {
                        Get.back();
                        Get.delete<ChangePasswordController>();
                      },
                      label: 'Cancel',
                      primary: AppColors.primaryColor,
                      onBackground: AppColors.primaryColor,
                    ),
                  ),
                  const SizedBox(
                    width: 36,
                  ),
                  Expanded(
                    child: CustomElevatedButton(
                      onPressed: () {
                        _controller.handleChangePassword();
                      },
                      label: 'Confirm',
                      primary: AppColors.primaryColor,
                      onPrimary: AppColors.onPrimaryColor,
                    ),
                  ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
