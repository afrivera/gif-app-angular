import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'KDOebfO6yu5NpjrL0HUefKIjH1vqscvE';
  private _urlService: string = 'https://api.giphy.com/v1/gifs';
  private _history: string[] = [];


  public result: Gif[] = []

  get history(){
    return [...this._history];
  }

  constructor( private http: HttpClient){
    this._history = JSON.parse( localStorage.getItem('history')!) || [];
    this.result = JSON.parse( localStorage.getItem( 'result' )!) || [];
  }

  searchGifs( query: string = ''){
    
    query = query.trim().toLowerCase();
    
    if( !this._history.includes( query )){
      this._history.unshift( query );
      this._history = this._history.splice(0,10);

      localStorage.setItem('history', JSON.stringify(this._history));
    }

    const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('api_key', this.apiKey)
        .set('limit', '10')
        .set('q', query);
        
    this.http.get<SearchGifResponse>(`${this._urlService }/search`, { params } )
      .subscribe( (resp: SearchGifResponse )=> {
        // console.log(resp);
        this.result = resp.data;
        localStorage.setItem('result', JSON.stringify( this.result ));
      })

  }

  

}
