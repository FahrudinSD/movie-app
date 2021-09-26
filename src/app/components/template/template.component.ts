import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  // Put bunch of inputs here, can be done better with one object
  @Input() id: any;
  @Input() name: any;
  @Input() description: any;
  @Input() imageUrl: any;
  @Input() cast: any;
  @Input() stars: any;
  // Used type to determine on which tab we are (show or movie). 
  // Also, can be done better with communication service to save and read from it
  @Input() type: any;

  public arrayOfUnStared: number[] = [1, 2, 3, 4, 5]
  public arrayOfStared: number[] = []

  constructor(public apiService: ApiService) {
    //no need for this
    // this.name = "";
    // this.description = ""
    // this.imageUrl = "";
   }

  ngOnInit(): void {
    // Lets load state of stars
    this.checkNumberOfStars();
  }

  /**
   * on hover we (just) show full star image 
   * @param $event event of called that contains target image
   */
  hoverStar($event:any) {
    // ././assets/star-icon-flat-full.png
    console.log($event)
    let htmlImg = $event.target as HTMLImageElement;
    if(htmlImg) {
      htmlImg.src = "././assets/star-icon-flat-full.png";
    }
  }

  // no need for hover effects on full-star
  hoverRatedStar() {

  }

  /**
   * on hover out we show again the white (empty) star
   * @param $event called with containing target image
   */
  hoverOutStar($event: any) {
    console.log($event)
    let htmlImg = $event.target as HTMLImageElement;
    if(htmlImg) {
      htmlImg.src = "././assets/white-star.jpg";
    }
  }

  // no need for hover effects on full-star
  hoverOutRatedStar() {

  }

  /**
   * on rate movie star clicked the src of img is permanently replaced and put api is called (in this case not but should TO DO)
   * @param $event used for cnanging src
   */
  rateMovie($event: any, index: number) {
    // this is for first logic when you can push and pop one by one star
    // but I left it and combine it with second logic
    this.arrayOfUnStared.pop();
    this.arrayOfStared.push(1);
    // this.arrayOfStared = [];
    for (let i= 1; i<=index; i++) {
      this.arrayOfStared.push(i);
      // if(i !== index)
        this.arrayOfUnStared.pop();
    }
    // Lets update state of stars
    this.putNumberOfStars();
    // here also should update (http.put) new movie rating
    // by simply sending in body rating: 5 stars for example
    // with link in url with id of movie, that should update (same on unratemovie function)
    // something that is not implemented because of lack of db (and/or apis)
  }

   /**
   * on unrate movie star clicked the src of img is permanently replaced and put api is called (in this case not but should TO DO)
   * @param $event used for changing src
   */
  unrateMovie($event: any, index: number) {
    // this is for first logic when you can push and pop one by one star
    // but I left it and combine it with second logic
    this.arrayOfStared.pop();
    this.arrayOfUnStared.push(1)

    for(let j= this.arrayOfStared.length; j>index+1; j--) {
      this.arrayOfStared.pop();
      this.arrayOfUnStared.push(j)
    }
    this.putNumberOfStars();
  }

  public putNumberOfStars() {
    if(this.type === 'movie') {
      this.apiService.putMovie(this.id, {name: this.name, description: this.description, imageUrl: this.imageUrl, cast: this.cast, 
        rating: this.arrayOfStared.length.toString() + ' stars' }).subscribe((data) => {
          console.log(data);
        }, (error) => {
          console.log(error);
        });
    } else {
      this.apiService.putShow(this.id, {name: this.name, description: this.description, imageUrl: this.imageUrl, cast: this.cast, 
        rating: this.arrayOfStared.length.toString() + ' stars' }).subscribe((data) => {
          console.log(data);
        }, (error) => {
          console.log(error);
        });
    }
    
  }

  public checkNumberOfStars() {
    if(this.stars.includes("1")) {
      this.arrayOfStared = [1];
      this.arrayOfUnStared = [1, 2, 3, 4];
    }
    else if(this.stars.includes("2")) {
      this.arrayOfStared = [1, 2];
      this.arrayOfUnStared = [1, 2, 3];
    }
    else if(this.stars.includes("3")) {
      this.arrayOfStared = [1, 2, 3];
      this.arrayOfUnStared = [1, 2];
    }
    else if(this.stars.includes("4")) {
      this.arrayOfStared = [1, 2, 3, 4];
      this.arrayOfUnStared = [1]
    }
    else if(this.stars.includes("5")) {
      this.arrayOfStared = [1, 2, 3, 4, 5];
      this.arrayOfUnStared = [];
    }
  }

}
