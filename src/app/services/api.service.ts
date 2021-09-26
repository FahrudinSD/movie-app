import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrlShows: string = 'http://localhost:3000';
  private apiUrlMovies: string = 'http://localhost:3100';

  constructor(public httpClient: HttpClient) { }

  public getUrlShows(): string {
    let url = this.apiUrlShows;
    url = url.concat('/shows');
    return url;
  }

  public getUrlMovies(): string {
    let url = this.apiUrlMovies;
    url = url.concat('/movies');
    return url;
  }

  //movies apis
  public getMovies(data: {page?:number, limit?:number}) {
    let url = this.getUrlMovies();
    url = url.concat('?_limit=', data.limit !== undefined ? data.limit.toString() : '10', '&_page=', 
    data.page !== undefined ? data.page.toString(): '1');
    return this.httpClient.get(url);
  }

  public putMovie(id: number, body: any) {
    console.log('put')
    let url = this.getUrlMovies();
    url = url.concat('/');
    url = url.concat(id.toString())
    console.log(url)
    return this.httpClient.put(url, body);
  }

  public postMovie(body: any) {
    this.httpClient.post(this.getUrlMovies(), body);
  }

  public deleteMovie(id: string) {
    let url = this.getUrlMovies();
    url.concat('/');
    url.concat(id)
    this.httpClient.delete(this.getUrlMovies());
  }

  //shows apis
  public getShows(data: {page?: number, limit?: number}) {
    let url = this.getUrlShows();
    url = url.concat('?_limit=', data.limit !== undefined ? data.limit.toString() : '10', '&_page=', 
    data.page !== undefined ? data.page.toString(): '1');
    return this.httpClient.get(url);
  }

  public putShow(id: number, body: any) {
    let url = this.getUrlShows();
    url = url.concat('/');
    url = url.concat(id.toString())
    return this.httpClient.put(url, body);
  }

  public postShow(body: any) {
    this.httpClient.post(this.getUrlShows(), body);
  }

  public deleteShow(id: string) {
    let url = this.getUrlShows();
    url.concat('/');
    url.concat(id)
    this.httpClient.delete(this.getUrlShows());
  }
}
