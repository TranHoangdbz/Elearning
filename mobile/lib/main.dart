import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:uit_elearning/routes/pages.dart';
import 'package:uit_elearning/routes/routes.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      initialRoute: Routes.home,
      getPages: Pages.pages,
      defaultTransition: Transition.cupertino,
    );
  }
}
