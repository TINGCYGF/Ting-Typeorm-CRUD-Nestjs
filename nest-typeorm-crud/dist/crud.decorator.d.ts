import { Repository } from "typeorm";
export declare class CrudPlaceholderDto {
    fake?: string;
    [key: string]: any;
}
export declare class CrudService {
    private readonly Repository;
    constructor(Repository: Repository<any>);
    find(json?: CrudPlaceholderDto): Promise<any>;
    add(json: CrudPlaceholderDto): Promise<any>;
    update(json1: CrudPlaceholderDto, json2: CrudPlaceholderDto): Promise<any>;
    delete(json: CrudPlaceholderDto): Promise<any>;
    getModel(): Repository<any>;
}
export declare class CrudController {
    private readonly service;
    constructor(service: CrudService);
    success(res: any, data?: any, msg?: string, code?: number): Promise<void>;
    error(res: any, msg?: string | object, data?: any, code?: number): Promise<void>;
    index(res: any): Promise<void>;
    add(body: CrudPlaceholderDto, res: any): Promise<void>;
    read(id: number, res: any): Promise<void>;
    edit(id: number, body: CrudPlaceholderDto, res: any): Promise<void>;
    delete(id: number, res: any): Promise<void>;
}
export declare const Crud: (options: {
    model: any;
    dto: any;
}) => ClassDecorator;
