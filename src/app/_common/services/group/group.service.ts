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

  create(group: Group): Promise<Group> {
    return new Promise<Group>((resolve, reject) => {
      this.http.post<Group>(`${API_PATH.groups}`, group)
        .subscribe(
          newGroup => resolve(new Group(newGroup)),
          error => reject(error));
    });
  }

  addMember(groupId: number, userId: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {

    });
  }

  getById(groupId: number): Promise<Group> {
    return new Promise<Group>((resolve, reject) => {
      this.http.get<Group>(`${API_PATH.groups}/${groupId}`)
        .subscribe(
          group => resolve(new Group(group)),
          error => reject(error));
    });
  }

  getPaginationOfAll(pageNumber: number, pageSize: number): Promise<PaginatedList<Group>> {
    return new Promise<PaginatedList<Group>>((resolve, reject) => {
      this.http.get<PaginatedList<Group>>(`${API_PATH.groups}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
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
      this.http.get<PaginatedList<Group>>(`${API_PATH.users}/${userId}/groups?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .subscribe(
          pageGroups => {
            pageGroups.value = pageGroups.value.map((group) => new Group(group));
            resolve(new PaginatedList<Group>(pageGroups));
          },
          error => reject(error));
    });
  }
}
