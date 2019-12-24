import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
  }

  public apiCall(query: string) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer BQD-AAT1qFWzwRAPb7_4BmyKe5fbVQ0T1oPkCWMgEpL5oGzExYtQYITdEJNSIHcy0V4qpvfr8ZCmTdaFWDc',
    });
    const URL = 'https://api.spotify.com/v1/' + query;
    return this.http.get(URL, {headers});
  }

  public getNewReleases() {
    return this.apiCall('browse/new-releases')
      .pipe(map((data: any) => {
        return data.albums.items;
      }));
  }

  public search(term: string, filter: number, quantity: number) {
    console.log('-----> ',quantity)
    const searchType = ['artist', 'track', 'album', 'playlist'];
    const result = searchType[filter] + 's';
    const query = 'search?q=' + term + '&type=' + searchType[filter] + '&limit=' + quantity;
    return this.apiCall(query)
      .pipe(map((data: any) => {
        return data[result].items;
      }));
  }
}
