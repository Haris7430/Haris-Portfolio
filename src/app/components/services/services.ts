import { Component, AfterViewInit, OnDestroy, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class ServicesComponent implements AfterViewInit, OnDestroy {
  private ctx: gsap.Context | undefined;
  private isBrowser: boolean;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      gsap.registerPlugin(ScrollTrigger);
      this.initAnimations();
    }
  }

  private initAnimations(): void {
    this.ctx = gsap.context(() => {
      gsap.set('.gsap-reveal', { opacity: 0, y: 30, visibility: 'visible' });

      ScrollTrigger.create({
        trigger: '.services-section',
        start: 'top 80%',
        onEnter: () => {
          gsap.to('.section-badge.gsap-reveal', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
          gsap.to('.section-header.gsap-reveal', { opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: 'power2.out' });
          gsap.to('.service-card.gsap-reveal', {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            delay: 0.2,
            ease: 'back.out(1.2)'
          });
        },
        once: true
      });
    }, this.el.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}
