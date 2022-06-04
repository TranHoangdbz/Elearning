import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:uit_elearning/constants/app_colors.dart';
import 'package:uit_elearning/constants/asset_strings.dart';
import 'package:uit_elearning/constants/text_styles.dart';
import 'package:uit_elearning/data/services/auth_service.dart';
import 'package:uit_elearning/global_widgets/custom_elevated_button.dart';
import 'package:uit_elearning/global_widgets/custom_icon_button.dart';
import 'package:uit_elearning/global_widgets/custom_outlined_button.dart';
import 'package:uit_elearning/modules/profile/widgets/change_password_dialog.dart';

class ProfileDetailScreen extends StatelessWidget {
  const ProfileDetailScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    double bodyHeight = MediaQuery.of(context).size.height -
        MediaQuery.of(context).padding.top -
        kToolbarHeight;
    return Scaffold(
      backgroundColor: AppColors.primaryColor,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        leading: const BackButton(),
      ),
      body: ListView(
        physics: const BouncingScrollPhysics(
          parent: AlwaysScrollableScrollPhysics(),
        ),
        children: [
          Column(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              ConstrainedBox(
                constraints: BoxConstraints(minHeight: bodyHeight * 0.25),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Container(
                      decoration: const BoxDecoration(
                        shape: BoxShape.circle,
                      ),
                      child: SvgPicture.asset(SVGAssetString.logo),
                    ),
                    Text(
                      'Nguyen Van A',
                      style: TextStyles.textStyleOnPrimaryColor18w600,
                    ),
                    Text(
                      '3 Courses Completed',
                      style: TextStyles.textStyleOnPrimaryColor14w400,
                    ),
                  ],
                ),
              ),
              ConstrainedBox(
                constraints: BoxConstraints(minHeight: bodyHeight * 0.75),
                child: Container(
                  width: double.maxFinite,
                  padding: const EdgeInsets.fromLTRB(24, 36, 24, 24),
                  decoration: const BoxDecoration(
                    color: AppColors.backgroundColor,
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(15),
                      topRight: Radius.circular(15),
                    ),
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        children: [
                          Text(
                            'Email',
                            style: TextStyles.textStyleOnBackgroundColor18w600,
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text(
                                'avannguyen@gmail.com',
                                style:
                                    TextStyles.textStyleOnBackgroundColor18w400,
                              ),
                              const SizedBox(
                                width: 4,
                              ),
                              CustomIconButton(
                                icon: const Icon(Icons.edit),
                                onTap: () {},
                              ),
                            ],
                          ),
                          const SizedBox(
                            height: 16,
                          ),
                          Text(
                            'Phone number',
                            style: TextStyles.textStyleOnBackgroundColor18w600,
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text(
                                '090123123',
                                style:
                                    TextStyles.textStyleOnBackgroundColor18w400,
                              ),
                              const SizedBox(
                                width: 4,
                              ),
                              CustomIconButton(
                                icon: const Icon(Icons.edit),
                                onTap: () {},
                              ),
                            ],
                          ),
                        ],
                      ),
                      Column(
                        children: [
                          CustomOutlinedButton(
                            onPressed: () {
                              AuthenticationService.instance.signOut();
                            },
                            label: 'Sign out',
                            primary: AppColors.primaryColor,
                            onBackground: AppColors.primaryColor,
                          ),
                          const SizedBox(
                            height: 16,
                          ),
                          CustomElevatedButton(
                            onPressed: () {
                              showDialog(
                                  context: context,
                                  builder: (context) {
                                    return const ChangePasswordDialog();
                                  });
                            },
                            label: 'Change password',
                            primary: AppColors.primaryColor,
                            onPrimary: AppColors.onPrimaryColor,
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
