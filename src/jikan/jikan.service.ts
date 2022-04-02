import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class JikanService {
  constructor(private httpService: HttpService) {}

  async jikan<T>(URI?: string): Promise<T> {
    try {
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
        return { ...error.response.data, host: 'Jikan' };
      }
      console.error(error);

      throw new HttpException(
        'Failed to connect to jikan service',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
