import { Module } from '@nestjs/common';
import { CrawlerService } from './crawler/crawler.service';
import { CrawlerController } from './crawler/crawler.controller';

@Module({
  imports: [],
  controllers: [CrawlerController],
  providers: [CrawlerService],
})
export class AppModule {}
