import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from "rxjs";
import {Player} from "./player"
import {User} from "./user"
import { environment } from "src/environments/environment";
import { UpdateInput } from "./update";
import { GameData } from "./gamedata";

@Injectable({
    providedIn: 'root'
})
export class UpdateService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getUpdates(updates:UpdateInput): Observable<GameData> {
        return this.http.post<GameData>(`${this.apiServerUrl}/updateInput`, updates);
    }

}