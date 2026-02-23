import { Component, ElementRef, OnInit, OnDestroy, ViewChild, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

interface FloatingObject {
    mesh: THREE.Mesh;
    baseY: number;
    speed: number;
    phase: number;
}

@Component({
    selector: 'app-canvas-scene',
    standalone: true,
    templateUrl: './canvas-scene.component.html',
    styleUrl: './canvas-scene.component.scss'
})
export class CanvasSceneComponent implements OnInit, OnDestroy {
    @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;

    private scene!: THREE.Scene;
    private camera!: THREE.PerspectiveCamera;
    private renderer!: THREE.WebGLRenderer;
    private animationId: number | null = null;
    private isBrowser: boolean;

    // 3D Objects
    private particlesMesh!: THREE.Points;
    private floatingObjects: FloatingObject[] = [];
    private torusKnot!: THREE.Mesh;
    private codeCubes: THREE.Object3D[] = [];
    private logoGroup!: THREE.Group;

    // Pointer interaction
    private mouseX = 0;
    private mouseY = 0;
    private pointerMoveHandler: ((event: PointerEvent) => void) | null = null;

    constructor(private ngZone: NgZone, @Inject(PLATFORM_ID) platformId: Object) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    ngOnInit() {
        if (this.isBrowser) {
            gsap.registerPlugin(ScrollTrigger);
            this.initThreeJs();
            this.animate();
        }
    }

    initThreeJs() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Scene setup
        this.scene = new THREE.Scene();

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.camera.position.z = 5;
        this.scene.add(this.camera); // Add camera to scene to attach HUD objects

        // Renderer setup - enhanced for smooth visuals
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

        // Lights - enhanced for web dev aesthetic
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x3b82f6, 2.5, 50);
        pointLight.position.set(3, 4, 5);
        this.scene.add(pointLight);

        const pointLight2 = new THREE.PointLight(0x8b5cf6, 2, 50);
        pointLight2.position.set(-3, -2, 4);
        this.scene.add(pointLight2);

        const pointLight3 = new THREE.PointLight(0x06b6d4, 1, 40);
        pointLight3.position.set(0, 5, -5);
        this.scene.add(pointLight3);

        // 1. Enhanced Particles - denser, more atmospheric
        const particlesGeo = new THREE.BufferGeometry();
        const particlesCount = 2500;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i += 3) {
            posArray[i] = (Math.random() - 0.5) * 25;
            posArray[i + 1] = (Math.random() - 0.5) * 35;
            posArray[i + 2] = (Math.random() - 0.5) * 15 - 3;
        }
        particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.025,
            color: 0x8ab4f8,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });
        this.particlesMesh = new THREE.Points(particlesGeo, particlesMaterial);
        this.scene.add(this.particlesMesh);

        // 2. Torus Knot - represents infinite loops / code flow (web dev symbol)
        const torusGeometry = new THREE.TorusKnotGeometry(0.6, 0.15, 64, 8);
        const torusMaterial = new THREE.MeshStandardMaterial({
            color: 0x3b82f6,
            wireframe: true,
            transparent: true,
            opacity: 0.4,
            emissive: 0x3b82f6,
            emissiveIntensity: 0.3
        });
        this.torusKnot = new THREE.Mesh(torusGeometry, torusMaterial);
        this.torusKnot.position.set(-4, 2, -2);
        this.torusKnot.scale.set(0.8, 0.8, 0.8);
        this.scene.add(this.torusKnot);

        // 3. Code Cubes - floating cubes representing code blocks
        const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const cubeWireframe = new THREE.EdgesGeometry(cubeGeometry);
        const cubeLineMaterial = new THREE.LineBasicMaterial({
            color: 0x3b82f6,
            transparent: true,
            opacity: 0.5
        });

        for (let i = 0; i < 6; i++) {
            const cube = new THREE.LineSegments(cubeWireframe.clone(), cubeLineMaterial.clone());
            cube.position.x = (Math.random() - 0.5) * 12;
            cube.position.y = (Math.random() - 0.5) * 28;
            cube.position.z = (Math.random() - 0.5) * 6 - 2;
            cube.scale.setScalar(0.4 + Math.random() * 0.6);
            this.scene.add(cube);
            this.codeCubes.push(cube);
        }

        // 4. Icosahedrons - tech nodes (enhanced)
        const nodeGeometry = new THREE.IcosahedronGeometry(0.8, 0);
        const wireframeMaterial = new THREE.MeshStandardMaterial({
            color: 0x3b82f6,
            wireframe: true,
            transparent: true,
            opacity: 0.35,
            emissive: 0x1e3a8a,
            emissiveIntensity: 0.2
        });
        const solidMaterial = new THREE.MeshStandardMaterial({
            color: 0x1e293b,
            roughness: 0.15,
            metalness: 0.9,
            emissive: 0x0f172a
        });

        for (let i = 0; i < 10; i++) {
            const isWireframe = i % 2 === 0;
            const mesh = new THREE.Mesh(nodeGeometry, isWireframe ? wireframeMaterial : solidMaterial.clone());

            mesh.position.x = (Math.random() - 0.5) * 12;
            mesh.position.y = (Math.random() - 0.5) * 32;
            mesh.position.z = (Math.random() - 0.5) * 6 - 2;

            const scale = Math.random() * 0.5 + 0.25;
            mesh.scale.set(scale, scale, scale);

            this.scene.add(mesh);
            this.floatingObjects.push({
                mesh,
                baseY: mesh.position.y,
                speed: 0.002 + Math.random() * 0.003,
                phase: Math.random() * Math.PI * 2
            });
        }

        // 5. Dodecahedron - another code/geometry symbol
        const dodecaGeo = new THREE.DodecahedronGeometry(0.5, 0);
        const dodecaMat = new THREE.MeshStandardMaterial({
            color: 0x8b5cf6,
            wireframe: true,
            transparent: true,
            opacity: 0.25
        });
        const dodeca = new THREE.Mesh(dodecaGeo, dodecaMat);
        dodeca.position.set(5, -5, -1);
        this.scene.add(dodeca);
        this.floatingObjects.push({ mesh: dodeca, baseY: -5, speed: 0.002, phase: 1 });

        // --- 6. 3D "aH Logic" Custom Logo ---
        this.logoGroup = new THREE.Group();

        // Hexagon Ring
        const ringGeo = new THREE.TorusGeometry(3.6, 0.3, 16, 6);
        const ringMat = new THREE.MeshStandardMaterial({
            color: 0x3b82f6, metalness: 0.8, roughness: 0.2,
            emissive: 0x1d4ed8, emissiveIntensity: 0.4
        });
        const hexRing = new THREE.Mesh(ringGeo, ringMat);
        hexRing.rotation.z = Math.PI / 6;
        this.logoGroup.add(hexRing);

        // Letters Material
        const letterMat = new THREE.MeshStandardMaterial({
            color: 0xf1f5f9, metalness: 1.0, roughness: 0.1
        });

        // Middle Stem (shared)
        const stemGeo = new THREE.BoxGeometry(0.6, 3.8, 0.6);
        const midStem = new THREE.Mesh(stemGeo, letterMat);
        midStem.position.set(0.5, 0, 0);
        this.logoGroup.add(midStem);

        // H Right Stem
        const rightStem = new THREE.Mesh(stemGeo, letterMat);
        rightStem.position.set(2.5, 0, 0);
        this.logoGroup.add(rightStem);

        // H Crossbar
        const crossGeo = new THREE.BoxGeometry(1.4, 0.6, 0.6);
        const crossH = new THREE.Mesh(crossGeo, letterMat);
        crossH.position.set(1.5, 0, 0);
        this.logoGroup.add(crossH);

        // 'a' Bottom Loop
        const aLoopGeo = new THREE.TorusGeometry(1.0, 0.3, 16, 32);
        const aLoop = new THREE.Mesh(aLoopGeo, letterMat);
        aLoop.position.set(-0.5, -0.9, 0);
        this.logoGroup.add(aLoop);

        // 'a' Top Hook
        const hookGeo = new THREE.BoxGeometry(1.4, 0.6, 0.6);
        const hook = new THREE.Mesh(hookGeo, letterMat);
        hook.position.set(-0.5, 1.6, 0);
        this.logoGroup.add(hook);

        const hookDropGeo = new THREE.BoxGeometry(0.6, 0.9, 0.6);
        const hookDrop = new THREE.Mesh(hookDropGeo, letterMat);
        hookDrop.position.set(-0.9, 0.85, 0);
        this.logoGroup.add(hookDrop);

        // Initial setup for the logo attached to the camera (so it scrolls with viewport)
        this.logoGroup.position.set(-20, 0, -10);
        this.logoGroup.scale.setScalar(0.01);
        this.camera.add(this.logoGroup);

        // Connect to GSAP ScrollTrigger
        this.setupScrollAnimation();

        // Handle resize
        window.addEventListener('resize', this.onWindowResize.bind(this));

        // Pointer move interaction for parallax camera/scene motion
        this.pointerMoveHandler = (event: PointerEvent) => {
            const x = (event.clientX / window.innerWidth - 0.5) * 2;
            const y = (event.clientY / window.innerHeight - 0.5) * 2;
            this.mouseX = x;
            this.mouseY = y;
        };
        window.addEventListener('pointermove', this.pointerMoveHandler);
    }

    private setupScrollAnimation() {
        ScrollTrigger.create({
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: (self) => {
                gsap.to(this.camera.position, {
                    y: -self.progress * 18,
                    duration: 0.5,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });

                gsap.to(this.scene.rotation, {
                    y: self.progress * Math.PI * 0.8,
                    duration: 1,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });
            }
        });

        // Set up specific ScrollTrigger for the new 3D logo using a short timeout to ensure DOM is ready
        setTimeout(() => {
            gsap.to(this.logoGroup.position, {
                x: -3.5, // Move to left side of screen
                y: 0,
                z: -10, // Distance from camera
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '#logo-showcase',
                    start: 'top bottom',
                    end: 'center center',
                    scrub: 1
                }
            });

            gsap.to(this.logoGroup.scale, {
                x: 1, y: 1, z: 1,
                ease: 'back.out(1.5)',
                scrollTrigger: {
                    trigger: '#logo-showcase',
                    start: 'top 80%',
                    end: 'center center',
                    scrub: 1
                }
            });

            gsap.to(this.logoGroup.rotation, {
                x: Math.PI * 0.05,
                y: Math.PI * 2 + Math.PI / 12, // Spin in and settle slightly angled
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '#logo-showcase',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        }, 500);
    }

    private onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    private animate() {
        this.ngZone.runOutsideAngular(() => {
            const render = () => {
                this.animationId = requestAnimationFrame(render);
                const time = Date.now() * 0.001;

                // Particles - smooth rotation
                this.particlesMesh.rotation.y = time * 0.08;
                this.particlesMesh.rotation.x = time * 0.04;

                // Torus knot - elegant spin
                this.torusKnot.rotation.x = time * 0.3;
                this.torusKnot.rotation.y = time * 0.5;

                // Code cubes - rotate and float
                this.codeCubes.forEach((cube, i) => {
                    cube.rotation.x += 0.004 * (i % 2 === 0 ? 1 : -1);
                    cube.rotation.y += 0.006;
                    cube.position.y += Math.sin(time + i * 1.5) * 0.003;
                });

                // Floating objects - smooth hover
                this.floatingObjects.forEach((obj) => {
                    obj.mesh.rotation.x += 0.002 * (obj.phase > Math.PI ? 1 : -1);
                    obj.mesh.rotation.y += 0.003;
                    obj.mesh.position.y = obj.baseY + Math.sin(time + obj.phase) * 0.15;
                });

                // Idle hover for the logo group
                if (this.logoGroup) {
                    this.logoGroup.position.y += Math.sin(time * 2) * 0.002;
                    // Note: We avoid continuously modifying rotation.y here because scrubbed GSAP conflicts.
                    // Instead just subtle z-axis wobble
                    this.logoGroup.rotation.z = Math.sin(time) * 0.05;
                }

                // Subtle camera parallax based on pointer
                const targetCamX = this.mouseX * 1.2;
                const targetCamZ = 5 + this.mouseY * 0.6;
                this.camera.position.x += (targetCamX - this.camera.position.x) * 0.05;
                this.camera.position.z += (targetCamZ - this.camera.position.z) * 0.05;
                this.camera.lookAt(0, 0, 0);

                this.renderer.render(this.scene, this.camera);
            };
            render();
        });
    }

    ngOnDestroy() {
        if (!this.isBrowser) return;

        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        window.removeEventListener('resize', this.onWindowResize.bind(this));

        this.renderer.dispose();
        this.scene.traverse((object) => {
            if (object instanceof THREE.Mesh) {
                object.geometry.dispose();
                if (object.material instanceof Array) {
                    object.material.forEach((m) => m.dispose());
                } else {
                    object.material.dispose();
                }
            }
            if (object instanceof THREE.LineSegments) {
                object.geometry.dispose();
                (object.material as THREE.Material).dispose();
            }
        });

        ScrollTrigger.getAll().forEach((t) => t.kill());
    }
}
