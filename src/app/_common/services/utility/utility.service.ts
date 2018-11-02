import { Injectable } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  addQueryParams(router: Router, route: ActivatedRoute, additions: [[string, string]]) {
    const params: Params = Object.assign({}, route.snapshot.queryParams);
    for (let i = 0; i < additions.length; i++) {
      params[additions[i][0]] = additions[i][1];
    }
    router.navigate([], { queryParams: params });
  }

  deleteQueryParams(router: Router, route: ActivatedRoute, deletions: string[]) {
    const oldParams: Params = Object.assign({}, route.snapshot.queryParams);
    const newParams = {};
    for (const param in oldParams) {
      if (!deletions.includes(param)) {
        newParams[param] = oldParams[param];
      }
    }
    router.navigate([], { queryParams: newParams });
  }
}
