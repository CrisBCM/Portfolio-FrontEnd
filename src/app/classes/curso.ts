export class Curso {
    nombre:string;
    descripcion:string;
    lenguajesAprendidos:string[];
    img:string;

    constructor(nombre:string, descripcion:string, lenguajesAprendidos:string[], img:string){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.lenguajesAprendidos = lenguajesAprendidos;
        this.img = img;
    }
    
}
