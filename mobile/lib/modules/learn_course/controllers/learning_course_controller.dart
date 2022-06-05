import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:video_player/video_player.dart';

class LearnCoursesController extends GetxController {

  late VideoPlayerController _controller;
  late TabController _tabIndexController;

  @override
  void onInit() {
    super.onInit();
    _controller = VideoPlayerController.network("");
  }
}