import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [],
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.scss'
})
export class HeroComponent implements AfterViewInit, OnDestroy {
    private ctx: gsap.Context | undefined;

    constructor(
        private el: ElementRef,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            gsap.registerPlugin(ScrollTrigger);
            this.initAnimations();
        }
    }

    private initAnimations(): void {
        this.ctx = gsap.context(() => {
            // Set initial state for hero content to be hidden
            gsap.set(['.badge.gsap-reveal', '.line.gsap-reveal', '.hero-subtitle.gsap-reveal', '.hero-cta.gsap-reveal', '.tech-stack-reveal', '.tech-stack-preview.gsap-reveal'], { opacity: 0, visibility: 'visible' });

            // Create a timeline that pins the hero section and scrubs the animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.hero-section',
                    start: 'top top',
                    end: '+=150%', // Pin for 1.5x the viewport height
                    pin: true,
                    scrub: 1, // Smooth scrubbing
                },
                defaults: { ease: 'power2.out' }
            });

            // 1. Initial empty space (user sees only 3D background for a bit of scrolling)
            // Explicitly set scroll indicator to be visible at 0 progress and fade out early
            tl.fromTo('.scroll-indicator', { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -20, duration: 0.1 }, 0);
            tl.to({}, { duration: 0.5 }, 0);

            // 2. Animate the badge and first elements
            tl.fromTo('.badge.gsap-reveal',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5 }
            );

            // 3. Stagger animate the title lines
            tl.fromTo('.line.gsap-reveal',
                { y: 50, opacity: 0, scale: 0.95, rotation: 2 },
                { y: 0, opacity: 1, scale: 1, rotation: 0, duration: 1, stagger: 0.2 },
                '-=0.2'
            );

            // 4. Animate subtitle
            tl.fromTo('.hero-subtitle.gsap-reveal',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6 },
                '-=0.5'
            );

            // 5. Animate CTAs
            tl.fromTo('.hero-cta.gsap-reveal',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5 },
                '-=0.3'
            );

            // 6. Animate tech stack 
            tl.fromTo('.tech-stack-preview.gsap-reveal',
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.5 },
                '-=0.2'
            );

            // Constantly animate the background orbs slightly (independent of scroll)
            gsap.to('.orb-1', {
                y: -30,
                x: 20,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });

            gsap.to('.orb-2', {
                y: 40,
                x: -30,
                duration: 5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: 1
            });

        }, this.el.nativeElement);
    }

    ngOnDestroy(): void {
        if (this.ctx) {
            this.ctx.revert();
        }
    }
}
