import { Component, OnInit, signal } from '@angular/core';
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

  constructor(private lenisService: LenisService) { }

  ngOnInit() {
    this.lenisService.init();
  }
}
