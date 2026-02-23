import { Component, AfterViewInit, ElementRef, OnDestroy, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss'
})
export class ContactComponent implements AfterViewInit, OnDestroy {
    contactForm: FormGroup;
    isSubmitting = false;
    submitSuccess = false;
    errorMessage: string | null = null;
    currentYear: number = new Date().getFullYear();
    private ctx: gsap.Context | undefined;

    constructor(
        private fb: FormBuilder,
        private el: ElementRef,
        @Inject(PLATFORM_ID) private platformId: Object,
        private ngZone: NgZone
    ) {
        this.contactForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.pattern('^[0-9+\\-()\\s]+$'), Validators.minLength(10)]],
            message: ['', [Validators.required, Validators.minLength(10)]]
        });
    }

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.initAnimations();
        }
    }

    private initAnimations(): void {
        this.ctx = gsap.context(() => {

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.contact-section',
                    start: 'top 80%',
                }
            });

            tl.fromTo('.contact-info > *',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 }
            )
                .fromTo('.contact-form-wrapper',
                    { x: 50, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.8 },
                    '-=0.6'
                );

        }, this.el.nativeElement);
    }

    onSubmit() {
        if (this.contactForm.valid) {
            this.isSubmitting = true;
            this.errorMessage = null;

            const scriptUrl = 'https://script.google.com/macros/s/AKfycbwt3bq2OWhczl-uZxrds4HV0QumfTU-XyxsU3g-VjWxOz59SFfiCjqajj5KXZJQObG3/exec';
            const formData = this.contactForm.value; // { name, email, phone, message }

            fetch(scriptUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                },
                body: JSON.stringify(formData),
            })
                .then(response => response.json())
                .then(data => {
                    this.ngZone.run(() => {
                        this.isSubmitting = false;
                        if (data.status === 'success' || data.result === 'success') {
                            this.submitSuccess = true;
                            this.contactForm.reset();

                            setTimeout(() => {
                                this.submitSuccess = false;
                            }, 5000);
                        } else {
                            console.error('Error from server:', data.message || data);
                            this.errorMessage = 'There was an issue sending your message. Please try again later.';
                            setTimeout(() => { this.errorMessage = null; }, 6000);
                        }
                    });
                })
                .catch(error => {
                    this.ngZone.run(() => {
                        this.isSubmitting = false;
                        console.error('Network Error:', error);
                        this.errorMessage = 'Network error. Please check your connection and try again.';
                        setTimeout(() => { this.errorMessage = null; }, 6000);
                    });
                });

        } else {
            // Mark all fields as touched to show validation errors
            Object.keys(this.contactForm.controls).forEach(key => {
                this.contactForm.get(key)?.markAsTouched();
            });
        }
    }

    restrictToNumbers(event: KeyboardEvent): boolean {
        const allowedRegex = /[0-9+\-()\s]/;
        const charCode = (event.which) ? event.which : event.keyCode;
        const charStr = String.fromCharCode(charCode);

        // Allow special keys like Backspace, Delete, Arrows to function normally
        if (event.ctrlKey || event.metaKey || charCode < 32) {
            return true;
        }

        if (!allowedRegex.test(charStr)) {
            event.preventDefault();
            return false;
        }
        return true;
    }

    ngOnDestroy(): void {
        if (this.ctx) {
            this.ctx.revert();
        }
    }
}
