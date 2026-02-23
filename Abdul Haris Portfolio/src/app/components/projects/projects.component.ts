import { Component, AfterViewInit, ElementRef, OnDestroy, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ImagePreload } from '../../services/image-preload';

gsap.registerPlugin(ScrollTrigger);

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
    private ctx: gsap.Context | undefined;
    private timerIntervals: any[] = [];

    // Arrays of image paths for each project
    public projectImages: string[][] = [
        [
            'images/project/healaria-1.webp',
            'images/project/healaria-3-01.webp',
            'images/project/healria-4.webp',
            'images/project/healria-5.webp',
            'images/project/healria-6.webp',
            'images/project/healria-7.webp',
            'images/project/healria-8.webp',
            'images/project/healria-9.webp',
            'images/project/healria-10.webp',
            'images/project/healria-11.webp',
            'images/project/healria-12.webp',
            'images/project/healria-13.webp',
            'images/project/healria-14.webp'
        ],
        [
            'images/project/The integrated interior ecosystem-Vettro traders.webp'
        ]
    ];

    // State to track which image is currently selected for each project
    public activeImageIndices: number[] = [0, 0];
    public imageOrientation: string[] = ['horizontal', 'horizontal'];

    constructor(
        private el: ElementRef,
        @Inject(PLATFORM_ID) private platformId: Object,
        private ngZone: NgZone,
        private imagePreload: ImagePreload
    ) { }

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            // Flatten the nested arrays and preload all project images
            const allUrls = this.projectImages.flat();
            this.imagePreload.preloadImages(allUrls);

            this.initAnimations();
            this.startAutoPlay();
            this.checkImageOrientation(0, this.projectImages[0][0]);
            this.checkImageOrientation(1, this.projectImages[1][0]);
        }
    }

    // Determine if the current image is portrait or landscape
    private checkImageOrientation(projectIndex: number, imageSrc: string) {
        if (!isPlatformBrowser(this.platformId)) return;

        const img = new Image();
        img.onload = () => {
            this.ngZone.run(() => {
                if (img.width > img.height * 1.2) { // Allow slight squares to be wide
                    this.imageOrientation[projectIndex] = 'horizontal';
                } else {
                    this.imageOrientation[projectIndex] = 'vertical';
                }
            });
        };
        img.src = imageSrc;
    }

    public nextImage(projectIndex: number): void {
        const images = this.projectImages[projectIndex];
        if (images.length <= 1) return;

        this.activeImageIndices[projectIndex] = (this.activeImageIndices[projectIndex] + 1) % images.length;
        this.checkImageOrientation(projectIndex, images[this.activeImageIndices[projectIndex]]);
    }

    public selectImage(projectIndex: number, imageIndex: number): void {
        this.activeImageIndices[projectIndex] = imageIndex;
        this.checkImageOrientation(projectIndex, this.projectImages[projectIndex][imageIndex]);
    }

    private startAutoPlay(): void {
        this.ngZone.runOutsideAngular(() => {
            // Only auto-play projects with more than 1 image
            if (this.projectImages[0].length > 1) {
                const interval = setInterval(() => {
                    this.ngZone.run(() => {
                        this.nextImage(0);
                    });
                }, 4000); // cycle every 4 seconds
                this.timerIntervals.push(interval);
            }
        });
    }

    private initAnimations(): void {
        this.ctx = gsap.context(() => {
            // Header animation
            ScrollTrigger.create({
                trigger: '.projects-header',
                start: 'top 85%',
                onEnter: () => {
                    gsap.fromTo('.projects-header > *',
                        { y: 30, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 }
                    );
                }
            });

            // Individual Project Cards Animation
            const projects = gsap.utils.toArray('.project-card');
            projects.forEach((project: any, i) => {
                const imgWrap = project.querySelector('.project-image-wrapper');

                // Entry animation - smooth reveal with stagger
                gsap.fromTo(project,
                    { y: 80, opacity: 0, scale: 0.98 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: project,
                            start: 'top 85%',
                        }
                    }
                );

                // Instead of purely scrubbing Y which causes overflow jumping with sliders,
                // animate the inner container
                if (imgWrap) {
                    gsap.to(imgWrap, {
                        yPercent: 5, // reduce translation to keep images inside box
                        ease: 'none',
                        scrollTrigger: {
                            trigger: project,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 1.5
                        }
                    });
                }
            });
        }, this.el.nativeElement);
    }

    ngOnDestroy(): void {
        if (this.ctx) {
            this.ctx.revert();
        }
        this.timerIntervals.forEach(interval => clearInterval(interval));
    }
}
