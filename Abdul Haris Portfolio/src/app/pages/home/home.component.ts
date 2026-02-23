import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { LogoShowcase } from '../../components/logo-showcase/logo-showcase';
// Force IDE re-parse - updated

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [HeroComponent, LogoShowcase, AboutComponent, ProjectsComponent, TestimonialsComponent, ContactComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent { }
