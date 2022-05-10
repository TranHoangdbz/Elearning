import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controllers/home_controller.dart';

class HomeScreen extends StatelessWidget {
  HomeScreen({Key? key}) : super(key: key);

  final _controller = Get.find<HomeController>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Obx(() => ListView.builder(
            itemCount: _controller.courses.length,
            itemBuilder: (context, index) {
              return Text(
                'Course: ${_controller.courses[index].name}',
                style: const TextStyle(color: Colors.black),
              );
            },
          )),
    );
  }
}
