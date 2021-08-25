import { Component, OnInit, ViewEncapsulation, ViewChild, Input } from '@angular/core';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {

  @Input() images: Array<string>;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor() {
    this.images = [];
    this.galleryOptions = Array<NgxGalleryOptions>();
    this.galleryImages = Array<NgxGalleryImage>();
  }

  ngOnInit() {
    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 5,
        thumbnailsArrows: true,
        imageArrows: true,
        previewCloseOnClick: true,
        previewCloseOnEsc: true,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 15,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,

      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = this.images.map(image => {
      return {
        small: image,
        medium: image,
        big: image
      };
    });
  }

  ngOnChanges() {
    this.galleryImages = this.images.map(image => {
      return {
        small: image,
        medium: image,
        big: image
      };
    });
  }
}
