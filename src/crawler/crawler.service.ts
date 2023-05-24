import { Injectable } from '@nestjs/common';
import { CrawledDataDocument, CrawledDataModel } from './crawled-data.model';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class CrawlerService {

  async crawl(startUrl: string, maxLinks: number, crawlDepth: number): Promise<string[]> {
    const visitedLinks = new Set<string>();
    const queue: [string, number][] = [[startUrl, 0]];
    const result: string[] = [];

    // Maximum number of concurrent requests
    const maxConcurrency = 10;

    while (queue.length > 0) {
      const requests: Promise<void>[] = [];

      // Process multiple requests concurrently
      for (let i = 0; i < maxConcurrency && queue.length > 0; i++) {
        const [currentUrl, depth] = queue.shift();

        if (visitedLinks.has(currentUrl) || depth > crawlDepth) {
          continue;
        }

        const requestPromise = this.processCrawlRequest(
          currentUrl,
          depth,
          visitedLinks,
          result,
          queue,
          maxLinks,
        );
        requests.push(requestPromise);
      }

      // Wait for all concurrent requests to complete
      await Promise.all(requests);
    }

    return result;
  }

  private extractLinks(html: string): string[] {
    const $ = cheerio.load(html);
    const links: string[] = [];

    $('a').each((_index, element) => {
      const href = $(element).attr('href');
      if (href) {
        links.push(href);
      }
    });

    return links;
  }

  private async processCrawlRequest(
    currentUrl: string,
    depth: number,
    visitedLinks: Set<string>,
    result: string[],
    queue: [string, number][],
    maxLinks: number,
  ): Promise<void> {
    try {
      const response = await axios.get(currentUrl);
      const links = this.extractLinks(response.data);

      visitedLinks.add(currentUrl);
      result.push(currentUrl);

      for (const link of links) {
        if (visitedLinks.size >= maxLinks) {
          break;
        }

        queue.push([link, depth + 1]);
      }

      // Store crawled URL in the database
      await this.saveCrawledData(currentUrl);
    } catch (error) {
      console.error(`Failed to crawl URL: ${currentUrl}`);
      console.error(error);
    }
  }

  private async saveCrawledData(url: string): Promise<CrawledDataDocument> {
    const crawledData = new CrawledDataModel({ url });
    return crawledData.save();
  }
}
