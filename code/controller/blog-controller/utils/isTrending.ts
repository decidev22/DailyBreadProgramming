import { getBlogTrendById } from "../../../api/trending-api/getBlogTrendById";
import { getUserById } from "../../../api/user-api/getUserById";
import { newBlogTrend } from "../../../api/trending-api/newBlogTrend";

export const isTrending = async (blogs: any, id: string) => {
  // From Rosette
  // Utils/const.ts      make this file
  // // const.ts and inside...
  // const ACCESS_TOKEN_TIME = 10; have constants

  const now = new Date();
  const date = now.toISOString();
  if (blogs.recentAccess && blogs.recentAccess.length < 10) {
    //const file in utils
    blogs.recentAccess.push(`${date}`);
  }
  // removes 'first in' - oldest time entry by shift()
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

  if (hourDifference < 24) {
    // console.log(hourDifference);
    // console.log("This blog is fire");
    blogs.lastTrendingTime = now;
    const author = await getUserById(blogs.userId);
    if (!author.popularBlogsWritten.blogids.includes(id)) {
      author.popularBlogsWritten.blogids.push(id);
      author.save();
    }
    try {
      const blogTrend = await getBlogTrendById(id);
      // check if the blog is already recorded, or if the search returns an empty array.
      if (!blogTrend || blogTrend.length === 0) {
        await newBlogTrend({ blogId: id, time: now });
      } else {
        //check if the last trend date was more than 1 week ago.
        const now = new Date().getTime();
        // console.log("Blog Trend", blogTrend[0].time);
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
          console.log("The dates are less than one week apart");
        }
      }
    } catch (error) {
      console.log(error);
      // don't halt the service.
    }
  }
};
