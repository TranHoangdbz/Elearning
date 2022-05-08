import 'package:get/get.dart';
import 'package:uit_elearning/modules/home/screens/home_screen.dart';
import 'package:uit_elearning/routes/routes.dart';

abstract class Pages {
  static final List<GetPage> pages = [
    GetPage(
      name: Routes.home,
      page: () => HomeScreen(),
    ),
  ];
}
