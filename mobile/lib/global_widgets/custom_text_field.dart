import 'package:flutter/material.dart';
import 'package:uit_elearning/constants/app_colors.dart';
import 'package:uit_elearning/constants/text_styles.dart';
import 'package:uit_elearning/global_widgets/custom_icon_button.dart';

class CustomTextField extends StatefulWidget {
  final double strokeWidth;
  final String hintText;
  final String label;
  final String? errorText;
  final TextEditingController? textController;
  final bool password;
  final TextInputType? keyboardType;

  const CustomTextField({
    Key? key,
    this.strokeWidth = 2.5,
    this.hintText = 'Hint text',
    this.label = 'LABEL',
    this.errorText,
    this.textController,
    this.password = false,
    this.keyboardType,
  }) : super(key: key);

  @override
  State<CustomTextField> createState() => _CustomTextFieldState();
}

class _CustomTextFieldState extends State<CustomTextField> {
  late bool _visible;

  @override
  void initState() {
    super.initState();
    _visible = widget.password ? false : true;
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          widget.label,
          style: TextStyles.textStyleOnBackgroundColor14w700,
        ),
        const SizedBox(
          height: 8,
        ),
        TextField(
          obscureText: !_visible,
          enableSuggestions: false,
          autocorrect: false,
          keyboardType: widget.keyboardType,
          controller: widget.textController,
          style: TextStyles.textStyleOnBackgroundColor14w500,
          decoration: InputDecoration(
            suffixIcon: !widget.password
                ? null
                : CustomIconButton(
                    onTap: () {
                      setState(() {
                        _visible = !_visible;
                      });
                    },
                    icon: Icon(
                        !_visible
                            ? Icons.visibility_rounded
                            : Icons.visibility_off_rounded,
                        color: AppColors.primaryColor),
                  ),
            focusedBorder: OutlineInputBorder(
              borderRadius: const BorderRadius.all(Radius.circular(10)),
              borderSide: BorderSide(
                  color: AppColors.primaryColor, width: widget.strokeWidth),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: const BorderRadius.all(Radius.circular(10)),
              borderSide: BorderSide(
                  color: AppColors.primaryColor.withOpacity(0.25),
                  width: widget.strokeWidth),
            ),
            errorBorder: OutlineInputBorder(
              borderRadius: const BorderRadius.all(Radius.circular(10)),
              borderSide: BorderSide(
                  color: AppColors.redColor, width: widget.strokeWidth),
            ),
            focusedErrorBorder: OutlineInputBorder(
              borderRadius: const BorderRadius.all(Radius.circular(10)),
              borderSide: BorderSide(
                  color: AppColors.redColor, width: widget.strokeWidth),
            ),
            errorText: widget.errorText,
            errorStyle: TextStyles.textStyleRedColor12w600,
            hintText: widget.hintText,
          ),
        ),
      ],
    );
  }
}
