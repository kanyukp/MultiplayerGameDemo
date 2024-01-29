import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from "rxjs";
import {Player} from "./player"
import {User} from "./user"
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public addUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.apiServerUrl}/user/add`, user);
    }
    public updateUser(user: User): Observable<User> {
        return this.http.put<User>(`${this.apiServerUrl}/user/update`, user);
    }
    public deleteUser(userId: string): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/user/delete/${userId}`);
    }
    // public getUserByUsername(user:string): Observable<Player> {
    //     return this.http.get<Player>(`${this.apiServerUrl}/user/find/${user}`)
    // }
    public getUserByNameAndPass(username: string, password:string): Observable<Player> {
        let qparams = new HttpParams();
        qparams = qparams.append('username', username);
        qparams = qparams.append('password', password)
        return this.http.get<Player>(`${this.apiServerUrl}/user/find/`, {params: qparams});
    }

}