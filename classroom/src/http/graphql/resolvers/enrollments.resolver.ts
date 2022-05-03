import { Resolver, Query, ResolveField, Parent } from "@nestjs/graphql";

import { CoursesService } from "../../../services/courses.service";
import { EnrollmentsService } from "../../../services/enrollments.service";
import { StudentsService } from "../../../services/students.service";
import { Enrollment } from "../models/enrollment";


@Resolver(() => Enrollment)
export class EnrollmentsResolver {

  constructor(
    private enrollmentsService: EnrollmentsService,
    private coursesService: CoursesService,
    private studentService: StudentsService
  ) {}

  @Query(() => [Enrollment])
  // @UseGuards(AuthorizationGuard)
  enrollments() {
    return this.enrollmentsService.listAllEnrollments();
  }

  @ResolveField()
  student(@Parent() enrollment: Enrollment) {
    return this.studentService.getStudentById(enrollment.studentId);
  }

  @ResolveField()
  course(@Parent() enrollment: Enrollment) {
    return this.coursesService.getCourseById(enrollment.courseId);
  }
}