import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from "rxjs";
import {Player} from "./player"
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class PlayerService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getPlayers(): Observable<Player[]> {
        return this.http.get<Player[]>(`${this.apiServerUrl}/player/all`);
    }
    public addPlayer(player: Player): Observable<Player> {
        return this.http.post<Player>(`${this.apiServerUrl}/player/add`, player);
    }
    public updatePlayer(player: Player): Observable<Player> {
        return this.http.put<Player>(`${this.apiServerUrl}/player/update`, player);
    }
    public deletePlayer(userId: string): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/user/delete/${userId}`);
    }
    public getPlayerByUsername(user:string): Observable<Player> {
        return this.http.get<Player>(`${this.apiServerUrl}/player/find/${user}`)
    }
    public getPlayerByNameAndPass(username: string, password:string): Observable<Player> {
        let qparams = new HttpParams();
        qparams = qparams.append('username', username);
        qparams = qparams.append('password', password)
        return this.http.get<Player>(`${this.apiServerUrl}/player/find/`, {params: qparams});
    }

}