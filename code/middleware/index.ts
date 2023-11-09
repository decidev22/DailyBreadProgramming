import express from "express";
import { get, merge } from "lodash";

import { getUserBySessionToken } from "../api/user-api/getUserBySessionToken";
import { getBlogById } from "../api/blog-api/services/getBlogById";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies[process.env.CRYPTO_SECRET];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res.sendStatus(403);
    }

    merge(req, { identity: existingUser });
    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as string;

    if (!currentUserId) {
      return res.sendStatus(403);
    }
    if (currentUserId.toString() != id) {
      return res.sendStatus(403);
    }
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isBlogOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    // console.log("blogid:", id as string);
    const author_userId = (await getBlogById(id)).userId;
    // console.log("authorid:", author_userId);
    const sessionToken = req.cookies[process.env.CRYPTO_SECRET];
    const currentUserId = (
      await getUserBySessionToken(sessionToken)
    )._id.toString();
    // console.log("currentUserId:", currentUserId);
    if (currentUserId != author_userId) {
      return res.sendStatus(403);
    }
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// rate limiting on Express does same thing
export const isNotSpam = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    // get current user
    const sessionToken = req.cookies[process.env.CRYPTO_SECRET];
    if (!sessionToken) {
      return res.sendStatus(403);
    }
    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser || !existingUser.blogHistory) {
      console.log("User not found or blog history not initialised");
      return res.sendStatus(403);
    }

    const blogs = existingUser.blogHistory.blogids;
    if (!blogs || blogs.length === 0) {
      console.log("No blog history found");
      return next(); // or some other logic you want to implement when there is no blog history
    }

    // get last blog post time
    const lastPostedBlog = await getBlogById(blogs[blogs.length - 1]);
    const lastPostedTime = new Date(lastPostedBlog.date);
    const currentTime = new Date();

    const timeDifference = Math.abs(
      lastPostedTime.getTime() - currentTime.getTime()
    );

    if (timeDifference / (1000 * 60) < 2) {
      console.log(
        "Spam prevention. You can only post 2 minutes after your last post."
      );
      return res.sendStatus(400);
    }

    next();
    // the time gap between those two

    // if gap is less than 2 minutes user cannot create blog
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// isAdmin function

// user can be assigned an admin role...
// requires
// - userSchema to have role: member / premium / admin
//

export const isAdmin = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // get current user
  const sessionToken = req.cookies[process.env.CRYPTO_SECRET];
  if (!sessionToken) {
    return res.sendStatus(403);
  }
  const existingUser = await getUserBySessionToken(sessionToken);

  if (!existingUser || !existingUser.blogHistory) {
    console.log("User not found or blog history not initialised");
    return res.sendStatus(403);
  }
  if (existingUser.role != "Admin") {
    return res.status(400).send("User not Admin");
  }
  next();
};

export const isVerified = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // get current user
  const sessionToken = req.cookies[process.env.CRYPTO_SECRET];
  if (!sessionToken) {
    return res.sendStatus(403);
  }
  const existingUser = await getUserBySessionToken(sessionToken);
  const verificayionCode = req.params.code as string;
  const now = new Date().toISOString();

  if (verificayionCode == existingUser.verification.randomSeed) {
    console.log("Verification Successful");

    existingUser.verification.verified = true;
    // Successfully provided the code, hence, reset fail counter
    existingUser.verification.failCount = 0;
    // Reset the verification code
    existingUser.verification.randomSeed = Math.floor(
      Math.random() * (999999 - 100000) + 1
    ).toString();
    existingUser.verification.timestamp.push(
      "Successful Verification on: " + now
    );
    existingUser.save();

    next();
  } else {
    // if user gets code wrong 3 times, reset the fail count and recreate the code.
    if (existingUser.verification.failCount > 3) {
      existingUser.verification.randomSeed = Math.floor(
        Math.random() * (999999 - 100000) + 1
      ).toString();
      existingUser.verification.failCount = 0;
    } else {
      existingUser.verification.failCount += 1;
    }
    existingUser.verification.verified = false;
    existingUser.verification.timestamp.push(
      "Failed Verification attempt on: " + now
    );
    await existingUser.save();
    return res.status(400).send("Wrong verificaiton code entered.");
  }
};
