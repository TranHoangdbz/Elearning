import 'package:get/get.dart';

import '../modules/home/screens/home_screen.dart';
import '../routes/routes.dart';

abstract class Pages {
  static final List<GetPage> pages = [
    GetPage(
      name: Routes.home,
      page: () => HomeScreen(),
      binding: HomeBinding(),
    ),
  ];
}
