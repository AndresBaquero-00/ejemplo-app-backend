
export class APIResponse<T = any> {

    // Códigos de estado http.
    public static readonly OK = 200;
    public static readonly INTERNAL_SERVER_ERROR = 500;

    /**
     * Estado que tendrá la respuesta http realizada.
     */
    public state: boolean;
    /**
     * Código de estado que tendrá la respuesta http realizada.
     */
    public status: number;
    /**
     * Mensaje informativo sobre la petición http realizada.
     */
    public message: string;
    /**
     * La data que va a ser resultado de la petición http realizada.
     */
    public data: T | undefined;

    public constructor() {
        this.state = false;
        this.status = APIResponse.INTERNAL_SERVER_ERROR;
        this.message = '';
    }

    public setSuccessOperation(data?: T, message?: string): void {
        this.state = true;
        this.status = APIResponse.OK;
        this.message = message ? message:'Operación exitosa.';
        this.data = data;
    }

    public setFailService(message?: string): void {
        this.state = true;
        this.status = APIResponse.INTERNAL_SERVER_ERROR;
        this.message = message ? message:'Fallo en el servidor.';
    }

}