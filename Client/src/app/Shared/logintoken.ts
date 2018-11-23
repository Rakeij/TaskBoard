import { Injectable } from '@angular/core';

@Injectable()
export class LoginToken {
  get IsValid(): boolean {
    return true;

    if (this.Username == "admin" && this.Password == "admin")
      return true;

    return false;
}
  public Url: string;
  public Username: string;
  public Password: string;
  public ValidationToken = "1992";
}
