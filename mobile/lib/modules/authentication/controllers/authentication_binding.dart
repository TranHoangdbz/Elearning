import 'package:get/get.dart';
import 'package:uit_elearning/modules/authentication/controllers/authentication_controller.dart';

class AuthenticationBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut(() => AuthenticationController());
  }
}
