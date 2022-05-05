import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UnauthorizedException, UseGuards } from "@nestjs/common";
import { CoursesService } from "../../../services/courses.service";
import { AuthorizationGuard } from "../../auth/authorization.guard";

import { Course } from "../models/course";
import { CreateCourseInput } from "../inputs/create-course-input";
import { AuthUser, CurrentUser } from "../../auth/current-user";
import { StudentsService } from "../../../services/students.service";
import { EnrollmentsService } from "../../../services/enrollments.service";


@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService
  ) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.coursesService.listAllCourses();
  }

  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  async course(
    @Args('id') id: string,
    @CurrentUser() user: AuthUser
  ) {
    const student = await this.studentsService.getStudentByAuthUserId(user.sub);

    if (!student) {
      throw new Error('Student not found');
    }

    const enrollment = await this.enrollmentsService.getByCourseAndStudentId({
      courseId: id,
      studentId: student.id
    })

    if (!enrollment) {
      throw new UnauthorizedException();
    }

    return this.coursesService.getCourseById(id);
  }

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  createCourse(@Args('data') data: CreateCourseInput) {
    return this.coursesService.createCourse(data);
  }
}