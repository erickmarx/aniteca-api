import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class JikanService {
  constructor(private httpService: HttpService) {}

  async jikan<T>(URI?: string): Promise<T> {
    try {
      console.log('Connection on:', URI);
      const response = await this.httpService.axiosRef.get<T>(
        `https://api.jikan.moe/v4/${URI}`,
      );

      if (response?.data) {
        return response.data;
      }
    } catch (error) {
      if (
        error.isAxiosError &&
        error.response.status !== HttpStatus.INTERNAL_SERVER_ERROR
      ) {
        return undefined;
      }
    }
  }
}
