import 'package:get/get.dart';
import '../../../routes/routes.dart';

class SplashController extends GetxController {
  @override
  void onInit() async {
    await Future.delayed(
      const Duration(seconds: 1),
    );
    Get.toNamed(Routes.auth);
    super.onInit();
  }
}
