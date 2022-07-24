import { Test, TestingModule } from '@nestjs/testing';
import { ServicoAutenticacao } from './auth.service';

describe('ServicoAutenticacao', () => {
  let service: ServicoAutenticacao;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicoAutenticacao],
    }).compile();

    service = module.get<ServicoAutenticacao>(ServicoAutenticacao);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
