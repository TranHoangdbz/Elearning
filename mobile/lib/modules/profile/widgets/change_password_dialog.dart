import 'package:flutter/material.dart';
import 'package:uit_elearning/constants/app_colors.dart';
import 'package:uit_elearning/constants/text_styles.dart';
import 'package:uit_elearning/global_widgets/custom_elevated_button.dart';
import 'package:uit_elearning/global_widgets/custom_outlined_button.dart';
import 'package:uit_elearning/global_widgets/custom_text_field.dart';

class ChangePasswordDialog extends StatelessWidget {
  const ChangePasswordDialog({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
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
              const CustomTextField(
                label: 'Enter current password',
                hintText: 'Enter current password',
              ),
              const SizedBox(
                height: 24,
              ),
              const CustomTextField(
                label: 'Enter new password',
                hintText: 'Enter new password',
              ),
              const SizedBox(
                height: 24,
              ),
              const CustomTextField(
                label: 'Confirm new password',
                hintText: 'Confirm new password',
              ),
              const SizedBox(
                height: 36,
              ),
              Row(
                children: [
                  Expanded(
                    child: CustomOutlinedButton(
                      onPressed: () {
                        Navigator.of(context).pop();
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
                        Navigator.of(context).pop();
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
