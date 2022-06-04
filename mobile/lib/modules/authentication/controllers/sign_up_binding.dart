import 'package:get/get.dart';
import 'package:uit_elearning/modules/authentication/controllers/sign_up_controller.dart';

class SignUpBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut(() => SignUpController());
  }
}
