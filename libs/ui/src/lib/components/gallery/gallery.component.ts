import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html'
})
export class GalleryComponent implements OnInit {

  selectedImageUrl = 'https://www.slpa.lk/application_resources/images/default.png';

  @Input() images: string[] = [];

  get hasImages(): boolean {
    return this.images?.length > 0;
  }

  ngOnInit(): void {
    if (this.hasImages) {
      this.selectedImageUrl = this.images[0];
    }
  }

  changeSelectedImage(imageUrl: string) {
    this.selectedImageUrl = imageUrl;
  }
}
