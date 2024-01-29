export interface Projectile {
    entityID: string;
    xpos: number;
    ypos: number;
    damage?: number;
    direction?: {
        x:number,
        y:number,
    }
}