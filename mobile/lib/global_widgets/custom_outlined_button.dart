import 'package:flutter/material.dart';
import 'package:uit_elearning/constants/app_colors.dart';
import 'package:uit_elearning/constants/text_styles.dart';

class CustomOutlinedButton extends StatelessWidget {
  final Function()? onPressed;
  final String label;
  final TextStyle? textStyle;
  final Color? onBackground;
  final Color? background;
  final Color? primary;
  final double strokeWidth;
  final Widget? icon;
  const CustomOutlinedButton(
      {Key? key,
      required this.onPressed,
      this.label = 'New button',
      this.textStyle,
      this.strokeWidth = 2,
      this.onBackground,
      this.primary,
      this.background,
      this.icon})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: OutlinedButton(
        onPressed: onPressed,
        child: Row(
          children: [
            if (icon != null) icon!,
            Expanded(
              child: Text(
                label,
                textAlign: TextAlign.center,
              ),
            ),
            if (icon != null)
              Visibility(
                maintainSize: true,
                maintainState: true,
                maintainAnimation: true,
                visible: false,
                child: icon!,
              ),
          ],
        ),
        style: OutlinedButton.styleFrom(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
          side: BorderSide(
            color: primary ?? AppColors.primaryColor,
            width: strokeWidth,
          ),
          padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 16),
          primary: onBackground ?? AppColors.onBackgroundColor,
          backgroundColor: background ?? AppColors.backgroundColor,
          textStyle: textStyle ?? TextStyles.textStylePrimaryColor14w600,
        ),
      ),
    );
  }
}
