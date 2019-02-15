import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterLinkActive } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LayoutComponent } from './layout/layout.component';
import { ProfileComponent } from './profile/profile.component';
import { CoursesComponent } from './allCourses/courses/courses.component';
import { CourseDetailsComponent } from './allCourses/course-details/course-details.component';
import { AuthGuard } from './auth.guard';
import { TopicComponent } from './topic/topic.component';
import { UsersComponent } from './admin/users/users.component';
import { AuthAdminGuard } from './auth-admin.guard';
import { AdminCoursesComponent } from './admin/admin-courses/admin-courses.component';
import { AdminLessonsComponent } from './admin/admin-lessons/admin-lessons.component';
import { UserCoursesComponent } from './user-courses/user-courses.component';
import { AnswersComponent } from './admin/answers/answers.component';
import { NotFoundComponent } from './not-found/not-found.component';

const AppRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [AuthAdminGuard],
    children: [
      { path: '', component: ProfileComponent },
      { path: 'users', component: UsersComponent },
      { path: 'answers', component: AnswersComponent },
      { path: 'courses', component: AdminCoursesComponent },
      { path: 'courses/:id/topics', component: AdminLessonsComponent }
    ]
  },
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ProfileComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'my-courses', component: UserCoursesComponent },
      { path: 'courses/:id/topic/:topicID', component: TopicComponent },
      { path: 'courses/:id', component: CourseDetailsComponent }
    ]
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];
@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
