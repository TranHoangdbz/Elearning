import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../../constants/app_colors.dart';
import '../../../global_widgets/logo_widget.dart';
import '../controllers/search_controller.dart';

class SearchScreen extends GetView<SearchController> {
  const SearchScreen({Key? key}) : super(key: key);
  // final _controller = Get.find<SearchController>();

  @override
  Widget build(BuildContext context) {
    return const Center(child: (Text('Search')));
  }
}
