import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { CoursesComponent } from './allCourses/courses/courses.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './sharedComponents/header/header.component';
import { SidebarComponent } from './sharedComponents/sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';
import { CourseDetailsComponent } from './allCourses/course-details/course-details.component';
import { AppRoutingModule } from './app-routing.module';
import { TopicComponent } from './topic/topic.component';
import { BreadcrumbComponent } from './sharedComponents/breadcrumb/breadcrumb.component';
import { UsersComponent } from './admin/users/users.component';
import { AuthAdminGuard } from './auth-admin.guard';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
} from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AdminCoursesComponent } from './admin/admin-courses/admin-courses.component';
import { AdminTableComponent } from './sharedComponents/admin-table/admin-table.component';
import { ModalComponent } from './sharedComponents/modal/modal.component';
import { AdminLessonsComponent } from './admin/admin-lessons/admin-lessons.component';
import { MatchValidator } from './shared/match.directive';
import { UserCoursesComponent } from './user-courses/user-courses.component';
import { AnswersComponent } from './admin/answers/answers.component';
import { CardComponent } from './sharedComponents/card/card.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownModule } from 'angular2-markdown';

import { Sort } from './pipes/sort';

@NgModule({
  declarations: [
    Sort,
    AppComponent,
    RegisterComponent,
    LoginComponent,
    CoursesComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    ProfileComponent,
    CourseDetailsComponent,
    TopicComponent,
    BreadcrumbComponent,
    UsersComponent,
    DashboardComponent,
    AdminCoursesComponent,
    AdminTableComponent,
    ModalComponent,
    AdminLessonsComponent,
    MatchValidator,
    UserCoursesComponent,
    AnswersComponent,
    CardComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatSortModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MarkdownModule.forRoot()
  ],
  providers: [AuthGuard, AuthService, AuthAdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
