import 'package:get/get.dart';
import 'package:uit_elearning/modules/do_quizz/controllers/quizz_controllers.dart';

class QuizzBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut(() => QuizzController());
  }
}
