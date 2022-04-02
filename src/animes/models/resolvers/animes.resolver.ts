import { Args, Int, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AnimesService } from 'src/animes/animes.service';
import { Animes } from '../animes.model';

@Resolver((of) => Animes)
export class AnimesResolver {
  constructor(private animesService: AnimesService) {}

  @Query((returns) => Animes)
  async animes(@Args('id', { type: () => Int }) id: number) {
    return this.animesService.temp();
  }
}
