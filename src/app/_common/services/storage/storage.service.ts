import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // *Local Storage*
  setLocalStorageItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getLocalStorageItem(key: string): string {
    const value = localStorage.getItem(key);
    return value;
  }

  removeLocalStorageItem(key: string): string {
    const value = this.getLocalStorageItem(key);
    localStorage.removeItem(key);
    return value;
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }

  // *Session Storage*
  setSessionStorageItem(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  getSessionStorageItem(key: string): string {
    const value = sessionStorage.getItem(key);
    return value;
  }

  removeSessionStorageItem(key: string): string {
    const value = this.getSessionStorageItem(key);
    sessionStorage.removeItem(key);
    return value;
  }

  clearSessionStorage(): void {
    sessionStorage.clear();
  }
}
