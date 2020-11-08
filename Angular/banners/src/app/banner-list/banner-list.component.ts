import { Component, OnInit } from '@angular/core';
import { BannerDataService } from '../banner-data.service';

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.css']
})
export class BannerListComponent implements OnInit {

  formData = new FormData();
  ReqJson: any = {};
  banners = [];

  name: string;
  location: number;
  description: string;
  url: string;
  file: any;


  constructor(private bannerDataService: BannerDataService) { }

  get locations() {
    return this.bannerDataService.locations;
  }

  ngOnInit(): void {
    this.updateLocations(1);
  }

  updateLocations(locId: number) {
    this.location = locId;
    this.bannerDataService.getBannerByLocation(locId)
    .subscribe((res) => {
      this.banners = (res) ? res : [];
    });
  }

  requestUpload() {
    this.formData = new FormData();
    this.formData.append('name', this.name);
    this.formData.append('description', this.description);
    this.formData.append('url', this.url);
    this.formData.append('location', this.location.toString());
    this.formData.append('avatar', this.file, this.file.name);
    this.bannerDataService.createBanner(this.formData)
    .subscribe((res) => {
      this.banners = res[0].createbanner;
    });
}

}
