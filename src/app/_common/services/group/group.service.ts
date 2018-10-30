import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_PATH } from 'src/app/_common/constants/paths';
import { PaginatedList } from 'src/app/_common/models/paginated-list';
import { Group } from 'src/app/_common/models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private http: HttpClient
  ) { }

  getById(groupId: number): Promise<Group> {
    return new Promise<Group>((resolve, reject) => {
      this.http.get<Group>(`${API_PATH.groupsBaseUrl}/${groupId}`)
        .subscribe(
          group => resolve(new Group(group)),
          error => reject(error));
    });
  }

  getPaginationOfAll(pageNumber: number, pageSize: number): Promise<PaginatedList<Group>> {
    return new Promise<PaginatedList<Group>>((resolve, reject) => {
      this.http.get<PaginatedList<Group>>(`${API_PATH.groupsBaseUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .subscribe(
          pageGroups => {
            pageGroups.value = pageGroups.value.map((group) => new Group(group));
            resolve(new PaginatedList<Group>(pageGroups));
          },
          error => reject(error));
    });
  }

  getPaginationOfAllByUserId(userId: number, pageNumber: number, pageSize: number): Promise<PaginatedList<Group>> {
    return new Promise<PaginatedList<Group>>((resolve, reject) => {
      this.http.get<PaginatedList<Group>>(`${API_PATH.usersBaseUrl}/${userId}/groups?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .subscribe(
          pageGroups => {
            pageGroups.value = pageGroups.value.map((group) => new Group(group));
            resolve(new PaginatedList<Group>(pageGroups));
          },
          error => reject(error));
    });
  }
}