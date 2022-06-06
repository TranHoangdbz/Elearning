import 'package:get/get.dart';
import 'disscusion_controller.dart';


class DisscussionCoursesBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut(() => DisscussionController());
  }
}