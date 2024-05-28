export class CalificarResultado {
    calificaciones: Array<CalificarResultadoCampos> = []
}

export class CalificarResultadoCampos {
    index: string = '';
    document_id: string = '';
    puntaje: number = 0;
    tipo_puntaje: string = "puntaje_automatico";
}