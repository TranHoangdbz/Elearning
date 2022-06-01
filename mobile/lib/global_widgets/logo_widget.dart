import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';

import '../constants/asset_strings.dart';
import '../constants/text_styles.dart';

class LogoWidget extends StatelessWidget {
  final bool showLabel;
  const LogoWidget({Key? key, this.showLabel = true}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Hero(
          tag: 'logo icon',
          child: SvgPicture.asset(SVGAssetString.logo),
        ),
        if (showLabel)
          const SizedBox(
            width: 16,
          ),
        if (showLabel)
          Hero(
            tag: 'logo label',
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'ProCourse',
                  style: TextStyles.textStyleOnPrimaryColor36w900,
                ),
                Text(
                  'Curiosity is the key',
                  style: TextStyles.textStyleOnPrimaryColor16w600,
                ),
              ],
            ),
          ),
      ],
    );
  }
}
