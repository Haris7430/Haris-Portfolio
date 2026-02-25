import { Component, OnInit, signal, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LenisService } from './services/lenis.service';
import { CanvasSceneComponent } from './components/canvas-scene/canvas-scene.component';
import { NavbarComponent } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CanvasSceneComponent, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('abdul-haris-portfolio');
  showScrollTop = false;

  constructor(private lenisService: LenisService) { }

  ngOnInit() {
    this.lenisService.init();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollTop = window.scrollY > 400; // show after 400px of scrolling
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
