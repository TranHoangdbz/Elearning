import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import '../constants/app_colors.dart';

class TextStyles {
  TextStyles._();
  static final TextStyle textStyleBase = GoogleFonts.montserrat();
  static final TextStyle textStyleOnPrimaryColor36w900 = textStyleBase.copyWith(
    color: AppColors.onPrimaryColor,
    fontSize: 36.sp,
    fontWeight: FontWeight.w900,
  );
  static final TextStyle textStyleOnPrimaryColor16w600 = textStyleBase.copyWith(
    color: AppColors.onPrimaryColor,
    fontSize: 16.sp,
    fontWeight: FontWeight.w600,
  );
  static final TextStyle textStyleSecondaryLightColor36w800 =
      textStyleBase.copyWith(
    color: AppColors.secondaryColorLight,
    fontSize: 36.sp,
    fontWeight: FontWeight.w800,
  );
  static final TextStyle textStylePrimaryColor14w600 = textStyleBase.copyWith(
    color: AppColors.primaryColor,
    fontSize: 14.sp,
    fontWeight: FontWeight.w600,
  );
  static final TextStyle textStyleOnPrimaryColor16w900 = textStyleBase.copyWith(
    color: AppColors.onPrimaryColor,
    fontSize: 16.sp,
    fontWeight: FontWeight.w900,
  );
  static final TextStyle textStyleOnPrimaryColor12w300 = textStyleBase.copyWith(
    color: AppColors.onPrimaryColor,
    fontSize: 12.sp,
    fontWeight: FontWeight.w300,
  );
  static final TextStyle textStyleOnBackgroundColor14w500 =
      textStyleBase.copyWith(
    color: AppColors.onBackgroundColor,
    fontSize: 14.sp,
    fontWeight: FontWeight.w500,
  );
  static final TextStyle textStyleOnBackgroundColor14w700 =
      textStyleBase.copyWith(
    color: AppColors.onBackgroundColor,
    fontSize: 14.sp,
    fontWeight: FontWeight.w700,
  );
  static final TextStyle textStyleRedColor12w600 = textStyleBase.copyWith(
    color: AppColors.redColor,
    fontSize: 12.sp,
    fontWeight: FontWeight.w600,
  );
  static final TextStyle textStyleOnBackgroundColor13w700 =
      textStyleBase.copyWith(
    color: AppColors.onBackgroundColor,
    fontSize: 13.sp,
    fontWeight: FontWeight.w700,
  );
  static final TextStyle textStylePrimaryColor12w600 = textStyleBase.copyWith(
    color: AppColors.primaryColor,
    fontSize: 12.sp,
    fontWeight: FontWeight.w600,
  );
  static final TextStyle textStylePrimaryColor12w300 = textStyleBase.copyWith(
    color: AppColors.primaryColor,
    fontSize: 12.sp,
    fontWeight: FontWeight.w300,
  );
  static final TextStyle textStylePrimaryColor24w700 = textStyleBase.copyWith(
    color: AppColors.primaryColor,
    fontSize: 24.sp,
    fontWeight: FontWeight.w700,
  );
  static final TextStyle textStylePrimaryColor22w800 = textStyleBase.copyWith(
    color: AppColors.primaryColor,
    fontSize: 22.sp,
    fontWeight: FontWeight.w800,
  );
  static final TextStyle textStyleBackkgroundColor12w600 =
      textStyleBase.copyWith(
    color: AppColors.backgroundColor,
    fontSize: 12.sp,
    fontWeight: FontWeight.w600,
  );
}
