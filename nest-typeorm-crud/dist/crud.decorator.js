"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crud = exports.CrudController = exports.CrudService = exports.CrudPlaceholderDto = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const lodash_1 = require("lodash");
class CrudPlaceholderDto {
}
exports.CrudPlaceholderDto = CrudPlaceholderDto;
class CrudService {
    constructor(Repository) {
        this.Repository = Repository;
    }
    async find(json = {}) {
        try {
            return await this.Repository.find(json);
        }
        catch (err) {
            return err;
        }
    }
    async add(json) {
        try {
            return await this.Repository.save(json);
        }
        catch (error) {
            return error;
        }
    }
    async update(json1, json2) {
        try {
            return await this.Repository.update(json1, json2);
        }
        catch (error) {
            return error;
        }
    }
    async delete(json) {
        try {
            return await this.Repository.delete(json);
        }
        catch (error) {
            return error;
        }
    }
    getModel() {
        return this.Repository;
    }
}
exports.CrudService = CrudService;
class CrudController {
    constructor(service) {
        this.service = service;
    }
    async success(res, data = {}, msg = "success", code = 200) {
        res.status(200);
        res.send({
            code,
            data,
            msg
        });
    }
    async error(res, msg = "error", data = {}, code = 400) {
        res.status(400);
        res.send({
            code,
            data,
            msg
        });
    }
    async index(res) {
        try {
            const data = await this.service.find();
            await this.success(res, data);
        }
        catch (error) {
            throw new common_1.BadRequestException({ code: 400, msg: "查询错误" });
        }
    }
    async add(body, res) {
        try {
            await this.service.add(body);
            await this.success(res);
        }
        catch (error) {
            throw new common_1.BadRequestException({ code: 400, msg: "添加角色错误" });
        }
    }
    async read(id, res) {
        try {
            const data = await this.service.find({ id: id });
            await this.success(res, data);
        }
        catch (err) {
            await this.error(res);
        }
    }
    async edit(id, body, res) {
        try {
            await this.service.update({ "id": id }, Object.assign({}, body));
            await this.success(res);
        }
        catch (err) {
            await this.error(res, "修改角色错误，请重新修改", err);
        }
    }
    async delete(id, res) {
        try {
            await this.service.delete({ "id": id });
            await this.success(res);
        }
        catch (err) {
            await this.error(res);
        }
    }
}
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ summary: "find all records / 查询所有记录" }),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrudController.prototype, "index", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ summary: "add a record / 增加一条记录" }),
    __param(0, common_1.Body()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CrudPlaceholderDto, Object]),
    __metadata("design:returntype", Promise)
], CrudController.prototype, "add", null);
__decorate([
    common_1.Get(":id"),
    swagger_1.ApiOperation({ summary: "find a record by id / 根据id 查找记录" }),
    __param(0, common_1.Param("id")), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CrudController.prototype, "read", null);
__decorate([
    common_1.Put(":id"),
    swagger_1.ApiOperation({ summary: "update a record by id / 根据id修改记录" }),
    __param(0, common_1.Param("id")), __param(1, common_1.Body()), __param(2, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, CrudPlaceholderDto, Object]),
    __metadata("design:returntype", Promise)
], CrudController.prototype, "edit", null);
__decorate([
    common_1.Delete(":id"),
    swagger_1.ApiOperation({ summary: "delete a record by id / 根据id删除记录" }),
    __param(0, common_1.Param("id")), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CrudController.prototype, "delete", null);
exports.CrudController = CrudController;
const methods = [
    "index",
    "add",
    "read",
    "edit",
    "delete"
];
function cloneDecorators(from, to) {
    Reflect.getMetadataKeys(from).forEach(key => {
        const value = Reflect.getMetadata(key, from);
        Reflect.defineMetadata(key, value, to);
    });
}
function clonePropDecorators(from, to, name) {
    Reflect.getMetadataKeys(from, name).forEach(key => {
        const value = Reflect.getMetadata(key, from, name);
        Reflect.defineMetadata(key, value, to, name);
    });
}
const Crud = (options) => {
    return (target) => {
        const controller = target.prototype;
        const crudController = new CrudController(options.model);
        methods.forEach(method => {
            controller[method] = (...args) => {
                return crudController[method].apply(this, args);
            };
            Object.defineProperty(controller[method], "name", {
                value: method
            });
            // clone instance decorators
            cloneDecorators(crudController, controller);
            cloneDecorators(crudController[method], controller[method]);
            // clone instance method decorators
            clonePropDecorators(crudController, controller, method);
            // clone class "method" decorators
            clonePropDecorators(CrudController, target, method);
            // get exists param types
            const types = Reflect.getMetadata("design:paramtypes", controller, method);
            Reflect.decorate([
                // replace fake dto to real dto
                Reflect.metadata("design:paramtypes", types.map((v) => {
                    if (lodash_1.get(v, "name") === CrudPlaceholderDto.name) {
                        return lodash_1.get(options, `routes.${method}.dto`, options.dto);
                    }
                    return v;
                })),
                ...lodash_1.get(options, `routes.${method}.decorators`, [])
            ], controller, method, Object.getOwnPropertyDescriptor(controller, method));
        });
        controller.index = crudController.index;
        controller.add = crudController.add;
        controller.read = crudController.read;
        controller.edit = crudController.edit;
        controller.delete = crudController.delete;
    };
};
exports.Crud = Crud;
