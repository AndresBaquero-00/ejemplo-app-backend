
export class Usuario {
    
    public codigo: number;
    public nombre: string;
    public apellido: string;
    public email: string;

    public constructor(codigo: number, nombre: string, apellido: string, email: string) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
    }

}