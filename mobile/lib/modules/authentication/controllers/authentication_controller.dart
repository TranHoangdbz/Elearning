import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:uit_elearning/data/services/auth_service.dart';

class AuthenticationController extends GetxController {
  RxString normalLoginTitle = 'Login'.obs;
  Rxn<String> quickLoginTitle = Rxn<String>();
  RxBool quickAuthenticated = false.obs;

  @override
  void onInit() async {
    Future.delayed(const Duration(milliseconds: 800));

    super.onInit();
  }

  @override
  void onReady() {
    initComponents();
    super.onReady();
  }

  initComponents() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();

    String? userEmail = prefs.getString('userEmail');

    if (userEmail != null) {
      quickAuthenticated.value = true;

      String? userFullName = prefs.getString('userFullName');
      if (userFullName != null && userFullName.isNotEmpty) {
        quickLoginTitle.value = 'Login as $userFullName';
      } else {
        quickLoginTitle.value = 'Login as $userEmail';
      }

      normalLoginTitle.value = 'Login with a different account';
    } else {
      quickAuthenticated.value = false;
      quickLoginTitle.value = null;
      normalLoginTitle.value = 'Login';
    }
  }

  quickLogin() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();

    String? userEmail = prefs.getString('userEmail');
    String? userHash = prefs.getString('userHash');
    try {
      AuthenticationService.instance
          .quickLogin(email: userEmail!, hash: userHash!);
    } catch (e) {
      rethrow;
    }
  }
}
