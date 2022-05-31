import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:uit_elearning/constants/app_colors.dart';
import 'package:uit_elearning/data/services/auth_service.dart';
import 'package:uit_elearning/global_widgets/custom_elevated_button.dart';

import '../../../constants/app_colors.dart';
import '../controllers/home_controller.dart';
import '../../my_courses/screens/my_courses_screen.dart';
import '../../recommended/screens/recommended_screen.dart';
import '../../search/screens/search_screen.dart';

class HomeScreen extends StatelessWidget {
  HomeScreen({Key? key}) : super(key: key);

  final controller = Get.find<HomeController>();

  @override
  Widget build(BuildContext context) {
    return GetBuilder<HomeController>(
      builder: (controller) {
        return SafeArea(
          child: Scaffold(
            body: SafeArea(
              child: IndexedStack(
                index: controller.tabIndex,
                children: const [
                  RecommendedScreen(),
                  SearchScreen(),
                  MyCoursesScreen(),
                ],
              ),
            ),
            bottomNavigationBar: Container(
              decoration: const BoxDecoration(
                borderRadius: BorderRadius.only(
                    topRight: Radius.circular(30),
                    topLeft: Radius.circular(30)),
                boxShadow: [
                  BoxShadow(
                      color: Colors.black38, spreadRadius: 0, blurRadius: 10),
                ],
              ),
              child: ClipRRect(
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(30.0),
                  topRight: Radius.circular(30.0),
                ),
                child: BottomNavigationBar(
                  elevation: 50,
                  iconSize: 32,
                  selectedItemColor: AppColors.primaryColor,
                  items: const <BottomNavigationBarItem>[
                    BottomNavigationBarItem(
                      icon: Padding(
                        padding: EdgeInsets.only(
                            left: 16, right: 16, top: 8, bottom: 8),
                        child: Icon(Icons.star),
                      ),
                      label: 'Courses',
                    ),
                    BottomNavigationBarItem(
                      icon: Padding(
                        padding: EdgeInsets.only(
                            left: 16, right: 16, top: 8, bottom: 8),
                        child: Icon(Icons.search),
                      ),
                      label: 'Search',
                    ),
                    BottomNavigationBarItem(
                      icon: Padding(
                        padding: EdgeInsets.only(
                            left: 16, right: 16, top: 8, bottom: 8),
                        child: Icon(Icons.collections_bookmark),
                      ),
                      label: 'My Courses',
                    ),
                  ],
                  onTap: controller.changeTabIndex,
                  currentIndex: controller.tabIndex,
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}
