import {
  createClient,
  type MicroCMSContentId,
  type MicroCMSDate,
  type MicroCMSImage,
  type MicroCMSQueries,
} from "microcms-js-sdk";

export type Blog = {
  title?: string;
  description?: string;
  content?: string;
  thumbnail?: MicroCMSImage;
} & MicroCMSContentId &
  MicroCMSDate;

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

if (!serviceDomain) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!apiKey) {
  throw new Error("MICROCMS_API_KEY is required");
}

const client = createClient({
  serviceDomain,
  apiKey,
});

export function getBlogList(queries?: MicroCMSQueries) {
  return client.getList<Blog>({
    endpoint: "blog",
    queries,
  });
}

export function getBlogDetail(
  contentId: string,
  queries?: MicroCMSQueries,
) {
  return client.getListDetail<Blog>({
    endpoint: "blog",
    contentId,
    queries,
  });
}
