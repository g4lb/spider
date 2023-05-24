import { Body, Controller, Post } from '@nestjs/common';
import { CrawlerService } from './crawler.service';

@Controller('crawler')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Post()
  async crawl(
    @Body('startUrl') startUrl: string,
    @Body('maxLinks') maxLinks: number,
    @Body('crawlDepth') crawlDepth: number,
  ): Promise<string[]> {
    return this.crawlerService.crawl(startUrl, maxLinks, crawlDepth);
  }
}
