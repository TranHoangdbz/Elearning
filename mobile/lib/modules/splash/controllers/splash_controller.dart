import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../routes/routes.dart';

class SplashController extends GetxController {
  @override
  void onInit() async {
    Future.delayed(const Duration(milliseconds: 800));
    super.onInit();
  }

  @override
  void onReady() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    bool? loggedIn = prefs.getBool('authenticated');

    if (loggedIn == true) {
      Get.offNamed(Routes.home);
    } else {
      Get.offNamed(Routes.auth);
    }
    super.onReady();
  }
}
