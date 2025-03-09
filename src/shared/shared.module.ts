import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class SharedModule {
  static forRoot(): DynamicModule {
    return {
      module: SharedModule,
      imports: [],
      providers: [],
      exports: [],
    };
  }
}
