import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { StudentsService } from "../../../services/students.service";
import { AuthorizationGuard } from "../../auth/authorization.guard";
import { Student } from "../models/student";
import { EnrollmentsService } from "../../../services/enrollments.service";
import { AuthUser, CurrentUser } from "../../auth/current-user";

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService
  ) {}

  @Query(() => Student)
  @UseGuards(AuthorizationGuard)
  me(@CurrentUser() user: AuthUser) {
    return this.studentsService.getStudentByAuthUserId(user.sub);
  }

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentsService.listAllStudents();
  }

  @ResolveField()
  enrollments(@Parent() student: Student) {
    return this.enrollmentsService.listEnrollmentsByStudent(student.id);
  }

  
}