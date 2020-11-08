import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BannerDataService } from '../banner-data.service';

@Component({
  selector: 'app-banner-details',
  templateUrl: './banner-details.component.html',
  styleUrls: ['./banner-details.component.css']
})
export class BannerDetailsComponent implements OnInit {

  banner: any;

  constructor(private activatedRoute: ActivatedRoute, private bannerDataService: BannerDataService) { }

  get endpoint() {
    return this.bannerDataService.endpoint;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.banner = this.bannerDataService.getBannerById(+params.id)
        .subscribe((res) => {
          this.banner = res;
        });
      }
    });
  }

}
