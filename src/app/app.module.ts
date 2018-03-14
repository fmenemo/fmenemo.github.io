import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClarityModule } from "@clr/angular";
import { RouterModule, Routes } from '@angular/router';

// Import the timeline library
import { VerticalTimelineModule } from 'angular-vertical-timeline';
import { MatIconRegistry, MatIconModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownToHtmlModule } from 'ng2-markdown-to-html';


import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { PostsComponent } from './posts/posts.component';
import { AcademicQualificationComponent } from './academic-qualification/academic-qualification.component';
import { AwardsComponent } from './awards/awards.component';
import { ToolsComponent } from './tools/tools.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IndividualPostComponent } from './individual-post/individual-post.component';
import { ReversePipe } from './reverse.pipe';
import { ProjectsComponent } from './projects/projects.component';
import { IndividualProjectComponent } from './individual-project/individual-project.component';

const appRoutes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'posts/:id', component: IndividualPostComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/:id', component: IndividualProjectComponent },
  { path: 'trajectory', component: AcademicQualificationComponent },
  { path: 'awards', component: AwardsComponent },
  { path: 'tools', component: ToolsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    PostsComponent,
    AcademicQualificationComponent,
    AwardsComponent,
    ToolsComponent,
    PageNotFoundComponent,
    IndividualPostComponent,
    ReversePipe,
    ProjectsComponent,
    IndividualProjectComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    VerticalTimelineModule,
    HttpClientModule,
    MatIconModule,
    MarkdownToHtmlModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('/assets/mdi.svg')); // Or whatever path you placed mdi.svg at
  }
}
