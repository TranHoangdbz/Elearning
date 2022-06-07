import 'package:get/get.dart';
import 'package:uit_elearning/modules/View_Course/controller/view_course_binding.dart';
import 'package:uit_elearning/modules/View_Course/screens/view_course_screen.dart';
import 'package:uit_elearning/modules/authentication/controllers/authentication_binding.dart';
import 'package:uit_elearning/modules/authentication/controllers/forget_password_binding.dart';
import 'package:uit_elearning/modules/authentication/controllers/login_binding.dart';
import 'package:uit_elearning/modules/authentication/controllers/sign_up_binding.dart';
import 'package:uit_elearning/modules/authentication/screens/authentication_screen.dart';
import 'package:uit_elearning/modules/authentication/screens/forget_password_screen.dart';
import 'package:uit_elearning/modules/authentication/screens/login_screen.dart';
import 'package:uit_elearning/modules/authentication/screens/sign_up_screen.dart';
import 'package:uit_elearning/modules/do_quizz/controllers/quizz_binding.dart';
import 'package:uit_elearning/modules/do_quizz/screens/quizz_screen.dart';
import 'package:uit_elearning/modules/home/controllers/home_binding.dart';
import 'package:uit_elearning/modules/learn_course/controllers/learn_course_binding.dart';
import 'package:uit_elearning/modules/learn_course/screens/learn_course_screen.dart';
import 'package:uit_elearning/modules/profile/screens/profile_detail_screen.dart';
import 'package:uit_elearning/modules/splash/controllers/splash_binding.dart';
import 'package:uit_elearning/modules/splash/screens/splash_screen.dart';

import '../modules/home/screens/home_screen.dart';
import '../routes/routes.dart';

abstract class Pages {
  static final List<GetPage> pages = [
    GetPage(
      name: Routes.splash,
      page: () => SplashScreen(),
      binding: SplashBinding(),
    ),
    GetPage(
      name: Routes.home,
      page: () => HomeScreen(),
      binding: HomeBinding(),
    ),

    GetPage(
      name: Routes.auth,
      page: () => AuthenticationScreen(),
      binding: AuthenticationBinding(),
    ),
    GetPage(
      name: Routes.login,
      page: () => LoginScreen(),
      binding: LoginBinding(),
    ),
    GetPage(
      name: Routes.signUp,
      page: () => SignUpScreen(),
      binding: SignUpBinding(),
    ),
    GetPage(
      name: Routes.forgetPassword,
      page: () => ForgetPassword(),
      binding: ForgetPasswordBinding(),
    ),
    GetPage(
      name: Routes.profileDetail,
      page: () => const ProfileDetailScreen(),
    ),
    GetPage(
      name: Routes.quizz,
      page: () => const QuizzScreen(),
      binding: QuizzBinding(),
    ),
  ];
}
