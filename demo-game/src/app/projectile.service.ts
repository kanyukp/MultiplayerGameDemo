import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from "rxjs";
import { Projectile } from "./projectile"
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ProjectileService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getProjectiles(): Observable<Projectile[]> {
        return this.http.get<Projectile[]>(`${this.apiServerUrl}/projectile/all`);
    }
    public addProjectile(projectile: Projectile): Observable<Projectile> {
        return this.http.post<Projectile>(`${this.apiServerUrl}/projectile/add`, projectile);
    }
    public updateProjectile(projectile: Projectile): Observable<Projectile> {
        return this.http.put<Projectile>(`${this.apiServerUrl}/projectile/update`, projectile);
    }
    public deleteProjectile(entityID: string): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/projectile/delete/${entityID}`);
    }
    public getProjectileByEntityID(entityID:string): Observable<Projectile> {
        return this.http.get<Projectile>(`${this.apiServerUrl}/projectile/find/${entityID}`)
    }
}