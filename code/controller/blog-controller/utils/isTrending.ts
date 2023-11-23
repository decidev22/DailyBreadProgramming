import { getBlogTrendById } from "../../../api/trending-api/getBlogTrendById";
import { getUserById } from "../../../api/user-api/getUserById";
import { newBlogTrend } from "../../../api/trending-api/newBlogTrend";

type BlogType = {
  title: string;
  content: string;
  hashTag: string[];
  category: string[];
  recentAccess: string[];
  date?: Date;
  username?: string;
  bid?: string;
  userId?: string;
  viewCount?: number;
  lastTrendingTime?: Date;
};

export const isTrending = async (blogs: BlogType, id: string) => {
  const now = new Date();
  const date = now.toISOString();
  const content = blogs.content;
  const title = blogs.title;

  // clean the access record if there are any empty date
  for (let item in blogs.recentAccess) {
    if (item == " ") {
      const indexOfEmptyItem = blogs.recentAccess.indexOf(item);
      // console.log(indexOfEmptyItem);
      if (indexOfEmptyItem !== -1) {
        blogs.recentAccess.splice(indexOfEmptyItem, 1);
      }
    }
  }

  if (blogs.recentAccess && blogs.recentAccess.length < 10) {
    //const file in utils
    blogs.recentAccess.push(`${date}`);
  }
  // removes 'first in' - which is the oldest time entry - by shift()
  if (blogs.recentAccess && blogs.recentAccess.length === 10) {
    blogs.recentAccess.shift();
    blogs.recentAccess.push(`${date}`);
  }
  if (!blogs.recentAccess) {
    blogs.recentAccess = [`${date}`];
  }

  // gets how far the latest access of the blog is to the oldest in the array
  const latestAccess = new Date(blogs.recentAccess[9]);
  const oldestAccess = new Date(blogs.recentAccess[0]);
  const hourDifference =
    (latestAccess.getTime() - oldestAccess.getTime()) /
    (1000 * 60 * 60);

  // if the difference by hours is within a day (24 hrs)
  if (hourDifference < 24) {
    // add recod to blog.lastTrendingTime
    blogs.lastTrendingTime = now;
    // add record to author's user detail
    const author = await getUserById(blogs.userId);
    if (!author.popularBlogsWritten.blogids.includes(id)) {
      author.popularBlogsWritten.blogids.push(id);
      author.save();
    }
    try {
      const blogTrend = await getBlogTrendById(id);
      // check if the blog is already recorded, or if the search returns an empty array.
      if (!blogTrend || blogTrend.length === 0) {
        await newBlogTrend({
          blogId: id,
          time: now,
          title: title,
          content: content,
        });
      } else {
        //check if the last trend date was more than 1 week ago.
        const now = new Date().getTime();
        const lastTrendedingTime = new Date(
          blogTrend[0].time
        ).getTime();
        const oneWeek = 7 * 24 * 60 * 60 * 1000; // 7 days x 24 hours x 60 minutes x 60 seconds x 1000 milliseconds
        const timeDifference = Math.abs(now - lastTrendedingTime);

        if (timeDifference >= oneWeek) {
          console.log("Second Wind! Blog back on Trending!");
          blogTrend[0].time = new Date();
          if (blogTrend[0].repeat) {
            blogTrend[0].repeat += 1;
          } else {
            blogTrend[0].repeat = 1;
          }
        } else {
          // no action taken
          console.log("The view dates are less than one week apart");
        }
      }
    } catch (error) {
      console.log(error);
      // don't halt the service.
    }
  }
};
