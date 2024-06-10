export function ProgressTracker(courses) {
    
    if (courses.length > 0) {
      const completedLessons = courses
        .flatMap((course) => course?.lessons)
        .filter((lesson) => lesson?.completed === true);
      const totalLessons = courses.reduce(
        (total, course) => total + course?.lessons?.length,
        0
      );
      const progress = Math.ceil(
        (completedLessons.length / totalLessons) * 100
      );

      localStorage.setItem("progress", progress);
    }
  }