import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Search }    from '../_models/search';
 
@Injectable()
export class SyncComService {
 
  // Observable string sources
  search = new Subject<Search>();
  //private missionConfirmedSource = new Subject<string>();
 
  // Observable string streams
  //missionAnnounced$ = this.search.asObservable();
  //missionConfirmed$ = this.missionConfirmedSource.asObservable();
 
  // Service message commands
  syncSearch(search: Search) {
    this.search.next(search);
  }
 
}