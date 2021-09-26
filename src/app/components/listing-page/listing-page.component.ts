import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/interfaces/movie.interface';
import { Show } from 'src/app/interfaces/show.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.scss']
})
export class ListingPageComponent implements OnInit {
  public movies: Movie[];
  public shows: Show[];
  public first10Movies: Movie[] = [];
  public first10Shows: Show[] = [];
  public subs: Subscription = new Subscription();
  public tabs = {
    "10shows": true,
    "10movies": false
  }
  public searchFormGroup: FormGroup;
  public inputSearch: FormControl = new FormControl('');
  public page = 1;

  constructor(public apiService: ApiService,
    public formBuilder: FormBuilder) { 
    this.movies = [];
    this.shows = [];
    this.searchFormGroup = this.formBuilder.group({
      inputSearch: new FormControl('')
    });
    this.searchFormGroup.valueChanges.subscribe((data) => {
      if(data['inputSearch'].length >= 2) {
        if(this.tabs['10movies']) {
          this.shows = this.shows.filter(x => x.name.toLowerCase().includes(data['inputSearch'].toLowerCase()) || x.description.toLowerCase().includes(data['inputSearch'].toLowerCase())
          || x.cast[0].toLowerCase().includes(data['inputSearch'].toLowerCase()) || x.rating.toLowerCase().includes(data['inputSearch'].toLowerCase()));
          this.sortShows();
        } else {
          this.movies = this.movies.filter(x => x.name.toLowerCase().includes(data['inputSearch'].toLowerCase()) || x.description.toLowerCase().includes(data['inputSearch'].toLowerCase())
          || x.cast[0].toLowerCase().includes(data['inputSearch'].toLowerCase()) || x.rating.toLowerCase().includes(data['inputSearch'].toLowerCase()));
          this.sortMovies();
        }
      } else {
        this.tabs['10movies'] ?
          this.get10Shows(1, 10, 'search')
        :
          this.get10Movies(1, 10, 'search');
      }
    })
  }

  ngOnInit(): void {
    if(this.tabs['10movies']) {
      this.get10Shows()
    } else {
      this.get10Movies();
    }
  }

  /**
   * Firstly used to get all movies and then rendered only 10 on frontend
   */
  public getMovies(): void {
    this.subs.add(
      this.apiService.getMovies({}).subscribe((data) => {
        this.movies = (data as Movie[]);
        this.loadFirstTenM();
      }, (error: any) => {
        console.log(error);
      }
    ))
  }

  /**
   * get random number of results (in this case 10) and show it on page 1 
   * assumed they are sort on backend by rating (orderBy)
   */
  public get10Movies(page?:number, limit?:number, from?:string): void {
    this.subs.add(
      this.apiService.getMovies({page, limit}).subscribe((data) => {
        !from ? this.movies = this.movies.concat(this.movies, (data as Movie[])) : this.movies = (data as Movie[]) ;
        this.sortMovies();
      }, (error: any) => {
        console.log(error);
      }
    ))
  }

  /**
   * Firstly used to get all shows and then rendered only 10 on frontend
   */
  public getShows(): void {
    this.subs.add(
      this.apiService.getShows({}).subscribe((data) => {
        this.shows = (data as Show[]);
        this.loadFirstTenS();
      }, (error: any) => {
        console.log(error);
      }
    ))
  }

  public get10Shows(page?:number, limit?:number, from?:string): void {
    this.subs.add(
      this.apiService.getShows({page, limit}).subscribe((data) => {
        !from ? this.shows = this.shows.concat(this.shows, (data as Show[])) : this.shows = (data as Show[]);
        this.sortShows();
      }, (error: any) => {
        console.log(error);
      }
    ))
  }

  /**
   * Firstly used without paginated data
   */
  public loadFirstTenM() {
    this.first10Movies = this.movies.slice(0, 10);
  }
  public loadFirstTenS() {
    this.first10Shows = this.shows.slice(0, 10);
  }

  public reload() {
    if(this.tabs['10movies']) {
      this.get10Shows(1, 10, 'reload');
    } else {
      this.get10Movies(1, 10, 'reload');
    }
  }

  public showMore() {
    if(this.tabs['10movies']) {
      this.get10Shows(++this.page, 10);
    } else {
      this.get10Movies(++this.page, 10);
    }
  }

  public sortShows() {
    this.shows = this.shows.sort((a, b) => {
      return a.rating > b.rating ? 0 : 1;
    })
  }

  public sortMovies() {
    this.movies = this.movies.sort((a, b) => {
      return a.rating > b.rating ? 0 : 1;
    })
  }
}
