import { Component, AfterViewInit, ElementRef, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit, OnDestroy {
    private ctx: gsap.Context | undefined;

    constructor(
        private el: ElementRef,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.initAnimations();
        }
    }

    private initAnimations(): void {
        this.ctx = gsap.context(() => {

            // Entrance animation for entire section
            ScrollTrigger.create({
                trigger: '.about-section',
                start: 'top 80%',
                onEnter: () => {
                    gsap.fromTo('.about-badge',
                        { y: 20, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.6 }
                    );
                    gsap.fromTo('.section-title',
                        { y: 20, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.8, delay: 0.1 }
                    );
                    gsap.fromTo('.about-text',
                        { y: 20, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, delay: 0.2 }
                    );
                    gsap.fromTo('.stat-box',
                        { y: 20, opacity: 0, scale: 0.9 },
                        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, delay: 0.4 }
                    );
                }
            });

            // Staggered reveal for stack items
            ScrollTrigger.create({
                trigger: '.about-visual',
                start: 'top 75%',
                onEnter: () => {
                    gsap.fromTo('.about-visual',
                        { x: 30, opacity: 0 },
                        { x: 0, opacity: 1, duration: 1 }
                    );
                    gsap.fromTo('.stack-item',
                        { x: 20, opacity: 0 },
                        { x: 0, opacity: 1, duration: 0.5, stagger: 0.15, delay: 0.5 }
                    );
                }
            });

        }, this.el.nativeElement);
    }

    ngOnDestroy(): void {
        if (this.ctx) {
            this.ctx.revert();
        }
    }
}
