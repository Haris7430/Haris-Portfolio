import { Component, ElementRef, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-logo-showcase',
  standalone: true,
  imports: [],
  template: `
    <section class="logo-showcase-section" id="logo-showcase">
      <div class="container showcase-content">
        <!-- Text overlay that appears next to the 3D logo -->
        <div class="showcase-text gsap-reveal-logo">
          <div class="badge logo-badge">Core Identity</div>
          <h2 class="title">Engineering <br/><span class="text-accent-gradient">Digital Logic.</span></h2>
          <p class="subtitle">
            The intersection of perfect architecture and seamless user experience.
          </p>
        </div>
      </div>
    </section>
  `,
  styles: `
    .logo-showcase-section {
      min-height: 100vh;
      display: flex;
      align-items: center;
      position: relative;
      background: transparent;
      z-index: 10;
      pointer-events: none; /* Let clicks pass through to canvas if needed */
    }
    
    .showcase-content {
      width: 100%;
      display: flex;
      justify-content: flex-end; /* Push text to right, 3D logo will be on left */
      pointer-events: auto;
    }

    .showcase-text {
      width: 45%;
      padding: 3rem;
      background: rgba(15, 23, 42, 0.4);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 24px;
      opacity: 0;
      transform: translateX(50px);
    }

    .logo-badge {
      background: rgba(139, 92, 246, 0.1);
      border: 1px solid rgba(139, 92, 246, 0.2);
      color: var(--accent-secondary);
      margin-bottom: 1.5rem;
    }

    .title {
      font-size: clamp(2.5rem, 4vw, 3.5rem);
      line-height: 1.1;
      margin-bottom: 1.5rem;
    }

    .subtitle {
      font-size: 1.1rem;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    @media (max-width: 992px) {
      .showcase-content {
        justify-content: center;
        align-items: flex-end;
        padding-bottom: 10vh;
      }
      .showcase-text {
        width: 100%;
        margin-top: 50vh; /* Leave top half for 3D logo */
      }
    }
  `,
})
export class LogoShowcase implements AfterViewInit, OnDestroy {
  private ctx: gsap.Context | undefined;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
      this.ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: '.logo-showcase-section',
          start: 'top 60%',
          onEnter: () => {
            gsap.to('.gsap-reveal-logo', {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out'
            });
          }
        });
      }, this.el.nativeElement);
    }
  }

  ngOnDestroy() {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}
