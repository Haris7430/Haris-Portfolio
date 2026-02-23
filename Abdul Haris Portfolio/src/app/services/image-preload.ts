import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ImagePreload {
  private loadedImages: Set<string> = new Set();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  preloadImages(urls: string[]): void {
    if (!isPlatformBrowser(this.platformId)) return;

    urls.forEach(url => {
      if (!this.loadedImages.has(url)) {
        const img = new Image();
        img.src = url;
        this.loadedImages.add(url);
      }
    });
  }
}
