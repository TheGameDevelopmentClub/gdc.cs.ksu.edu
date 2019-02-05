import { Injectable } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  addQueryParams(additions: [[string, string]]) {
    const params: Params = Object.assign({}, this.route.snapshot.queryParams);
    for (let i = 0; i < additions.length; i++) {
      params[additions[i][0]] = additions[i][1];
    }
    this.router.navigate([], { queryParams: params });
  }

  deleteQueryParams(deletions: string[]) {
    const oldParams: Params = Object.assign({}, this.route.snapshot.queryParams);
    const newParams = {};
    for (const param in oldParams) {
      if (!deletions.includes(param)) {
        newParams[param] = oldParams[param];
      }
    }
    this.router.navigate([], { queryParams: newParams });
  }
}
