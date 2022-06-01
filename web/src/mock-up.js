const images = [
  "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
  "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
  "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
  "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
  "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
  "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
  "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
  "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
  "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
  "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
  "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
  "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
  "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
];

// Courses
function CreateCoursesData(
  id,
  courseName,
  courseImage,
  description,
  discussion,
  lessons,
  teacher,
  rating
) {
  return {
    id: id,
    courseName: courseName,
    courseImage: courseImage,
    description: description,
    discussion: discussion,
    lessons: lessons,
    teacher: teacher,
    rating: rating,
  };
}

function CreateLesson(video, lessonVolume) {
  return {
    id: video,
    name: "LESSON No.",
    description: "Write something",
    video: video,
    lessonVolume: lessonVolume,
    quizz: [],
  };
}

const courseData = [
  CreateCoursesData(
    "COURSE001",
    "Khóa học TOEIC 500 No.1",
    images[0],
    "No.1",
    [],
    [
      CreateLesson(images[0], 1),
      CreateLesson(images[0], 2),
      CreateLesson(images[0], 3),
      CreateLesson(images[0], 4),
      CreateLesson(images[0], 5),
      CreateLesson(images[0], 6),
      CreateLesson(images[0], 7),
    ],
    "Te.1",
    [5, 4, 4]
  ),
  CreateCoursesData(
    "COURSE002",
    "Khóa học TOEIC 500 No.2",
    images[1],
    "No.2",
    [],
    [
      CreateLesson(images[1], 1),
      CreateLesson(images[1], 2),
      CreateLesson(images[1], 3),
      CreateLesson(images[1], 4),
      CreateLesson(images[1], 5),
      CreateLesson(images[1], 6),
      CreateLesson(images[1], 7),
    ],
    "Te.2",
    [5, 4, 4]
  ),
  CreateCoursesData(
    "COURSE003",
    "Khóa học TOEIC 500 No.3",
    images[2],
    "No.3",
    [],
    [
      CreateLesson(images[2], 1),
      CreateLesson(images[2], 2),
      CreateLesson(images[2], 3),
      CreateLesson(images[2], 4),
      CreateLesson(images[2], 5),
      CreateLesson(images[2], 6),
      CreateLesson(images[2], 7),
    ],
    "Te.3",
    [5, 4, 4]
  ),
  CreateCoursesData(
    "COURSE004",
    "Khóa học TOEIC 500 No.4",
    images[3],
    "No.4",
    [],
    [
      CreateLesson(images[3], 1),
      CreateLesson(images[3], 2),
      CreateLesson(images[3], 3),
      CreateLesson(images[3], 4),
      CreateLesson(images[3], 5),
      CreateLesson(images[3], 6),
      CreateLesson(images[3], 7),
    ],
    "Te.4",
    [5, 4, 4]
  ),
  CreateCoursesData(
    "COURSE005",
    "Khóa học TOEIC 500 No.5",
    images[4],
    "No.5",
    [],
    [
      CreateLesson(images[4], 1),
      CreateLesson(images[4], 2),
      CreateLesson(images[4], 3),
      CreateLesson(images[4], 4),
      CreateLesson(images[4], 5),
      CreateLesson(images[4], 6),
      CreateLesson(images[4], 7),
    ],
    "Te.5",
    [5, 4, 4]
  ),
  CreateCoursesData(
    "COURSE006",
    "Khóa học TOEIC 500 No.6",
    images[5],
    "No.6",
    [],
    [
      CreateLesson(images[5], 1),
      CreateLesson(images[5], 2),
      CreateLesson(images[5], 3),
      CreateLesson(images[5], 4),
      CreateLesson(images[5], 5),
      CreateLesson(images[5], 6),
      CreateLesson(images[5], 7),
    ],
    "Te.6",
    [5, 4, 4]
  ),
  CreateCoursesData(
    "COURSE007",
    "Khóa học TOEIC 500 No.7",
    images[6],
    "No.7",
    [],
    [
      CreateLesson(images[6], 1),
      CreateLesson(images[6], 2),
      CreateLesson(images[6], 3),
      CreateLesson(images[6], 4),
      CreateLesson(images[6], 5),
      CreateLesson(images[6], 6),
      CreateLesson(images[6], 7),
    ],
    "Te.7",
    [5, 4, 4]
  ),
  CreateCoursesData(
    "COURSE009",
    "Khóa học TOEIC 500 No.9",
    images[7],
    "No.9",
    [],
    [
      CreateLesson(images[7], 1),
      CreateLesson(images[7], 2),
      CreateLesson(images[7], 3),
      CreateLesson(images[7], 4),
      CreateLesson(images[7], 5),
      CreateLesson(images[7], 6),
      CreateLesson(images[7], 7),
    ],
    "Te.9",
    [5, 4, 4]
  ),
  CreateCoursesData(
    "COURSE010",
    "Khóa học TOEIC 500 No.10",
    images[8],
    "No.10",
    [],
    [
      CreateLesson(images[8], 1),
      CreateLesson(images[8], 2),
      CreateLesson(images[8], 3),
      CreateLesson(images[8], 4),
      CreateLesson(images[8], 5),
      CreateLesson(images[8], 6),
      CreateLesson(images[8], 7),
    ],
    "Te.10",
    [5, 4, 4]
  ),
  CreateCoursesData(
    "COURSE011",
    "Khóa học TOEIC 500 No.11",
    images[9],
    "No.11",
    [],
    [
      CreateLesson(images[9], 1),
      CreateLesson(images[9], 2),
      CreateLesson(images[9], 3),
      CreateLesson(images[9], 4),
      CreateLesson(images[9], 5),
      CreateLesson(images[9], 6),
      CreateLesson(images[9], 7),
    ],
    "Te.11",
    [5, 4, 4]
  ),
  CreateCoursesData(
    "COURSE012",
    "Khóa học TOEIC 500 No.12",
    images[10],
    "No.12",
    [],
    [
      CreateLesson(images[10], 1),
      CreateLesson(images[10], 2),
      CreateLesson(images[10], 3),
      CreateLesson(images[10], 4),
      CreateLesson(images[10], 5),
      CreateLesson(images[10], 6),
      CreateLesson(images[10], 7),
    ],
    "Te.12",
    [5, 4, 4]
  ),
  CreateCoursesData(
    "COURSE013",
    "Khóa học TOEIC 500 No.13",
    images[11],
    "No.13",
    [],
    [
      CreateLesson(images[11], 1),
      CreateLesson(images[11], 2),
      CreateLesson(images[11], 3),
      CreateLesson(images[11], 4),
      CreateLesson(images[11], 5),
      CreateLesson(images[11], 6),
      CreateLesson(images[11], 7),
    ],
    "Te.13",
    [5, 4, 4]
  ),
  CreateCoursesData(
    "COURSE014",
    "Khóa học TOEIC 500 No.14",
    images[12],
    "No.14",
    [],
    [
      CreateLesson(images[12], 1),
      CreateLesson(images[12], 2),
      CreateLesson(images[12], 3),
      CreateLesson(images[12], 4),
      CreateLesson(images[12], 5),
      CreateLesson(images[12], 6),
      CreateLesson(images[12], 7),
    ],
    "Te.14",
    [5, 4, 4]
  ),
];

export let fetchAllCourses = () =>
  new Promise((resolve) => resolve(courseData));