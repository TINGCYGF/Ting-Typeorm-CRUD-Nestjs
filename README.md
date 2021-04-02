## 背景

在用Nestjs开发项目一段时间后发现Nestjs+typeORM虽然很有条理，让项目思路清晰，但是步骤繁琐而且重复非常多

如定义entity实例->定义tdo->定义service->定义controller

那么我只需要把重复的抽离出来，封装为npm包，那么nest开发效率开发效率大大提升





**目前以提交初版，会持续优化更新**（At present, the first version is submitted and will continue to be optimized and updated）

**支持（**apply**）nodejs+typeorm+mysql**

**自动生成swagger文档（**Automatically generate swagger documentation**）**

```
/*我的版本*/
"@nestjs/common": "^7.6.13",
"@nestjs/swagger": "^4.7.15",
"@nestjs/typeorm": "^7.1.5",
"mysql2": "^2.2.5",
"swagger-ui-express": "^4.1.6",
"typeorm": "^0.2.31"
```

npm包：[nestjs-tyoeorm-crud](https://www.npmjs.com/package/nestjs-tyoeorm-crud)



## 安装（install）

```
npm i nestjs-tyoeorm-crud
```



### 使用例子（example）

定义entity和tdo后，由typeorm注册后导入testService（After defining entity and tdo, import testService after registration by typeorm）

```
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TestEntity } from "@libs/db/models/materials/test/test.entity";
import { CrudService } from 'nestjs-tyoeorm-crud'

@Injectable()
export class TestService extends CrudService{
  constructor(
    @InjectRepository(TestEntity)
    private readonly testRepository: Repository<TestEntity>,
  ) {
    super(testRepository)
  }
}
```

定义testController

```
import { Controller } from "@nestjs/common";
import { TestService } from "@libs/db/models/materials/test/test.service";
import { TestDto } from "@libs/db/models/materials/test/test.dto";
import { ApiTags } from "@nestjs/swagger";
import { CrudController, Crud } from 'nestjs-tyoeorm-crud'

@Controller('test')
@Crud({model: TestService, dto:TestDto})
@ApiTags("测试CRUD")
export class TestController extends CrudController{
  constructor(
    private readonly testService: TestService
  ) {
    super(testService);
  }
}
```



### 测试接口inspect

这样就快速生成CRUD接口了，测试接口是否有效（inspect）

运行nestjs后进入（Enter after running nestjs）http://localhost:3000/api-docs/#/

自动生成swagger文档（Automatically generate swagger documentation）

![](https://gitee.com/TINGCYGF/pic-go/raw/master/img/Snipaste_2021-04-02_15-37-51.png)

test

![](https://gitee.com/TINGCYGF/pic-go/raw/master/img/Snipaste_2021-04-02_15-37-34.png)