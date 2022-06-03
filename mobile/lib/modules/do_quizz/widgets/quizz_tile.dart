import 'package:flutter/material.dart';
import 'package:uit_elearning/constants/app_colors.dart';
import 'package:uit_elearning/constants/text_styles.dart';

class QuizzTile extends StatelessWidget {
  final String title;
  final String description;
  final bool isLocked;
  final bool isSelected;
  final Function()? onTap;
  const QuizzTile({
    Key? key,
    this.title = 'Title',
    this.description = 'Description',
    this.isLocked = true,
    this.isSelected = false,
    this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    TextStyle textStyle = isSelected
        ? TextStyles.textStyleOnPrimaryColor12w500
        : TextStyles.textStyleOnBackgroundColorLight12w500;
    Color color =
        isSelected ? AppColors.primaryColor : AppColors.backgroundColorLight;

    return Material(
      color: color,
      child: InkWell(
        onTap: isLocked && !isSelected ? null : onTap,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(24, 16, 16, 16),
          child: Stack(
            alignment: Alignment.center,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    title,
                    style: textStyle,
                  ),
                  Text(
                    description,
                    style: textStyle,
                  ),
                ],
              ),
              if (isLocked && !isSelected)
                const Icon(Icons.lock, color: AppColors.lockIconColor),
            ],
          ),
        ),
      ),
    );
  }
}
