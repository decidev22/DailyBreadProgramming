import express from "express";

import { getUserById } from "../../api/user-api/getUserById";
import { updatePopularAuthor } from "../../api/hotload-api/updatePopularAuthor";

export const insertPopularAuthors = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;

  console.log("Here");
  if (!id) {
    console.log("Error: Author detail not provided.");
    return res.sendStatus(400);
  }

  try {
    const author = await getUserById(id);
    const blogName = author.profileTitle;
    const authorName = author.username;
    const newPopularAuthor = await updatePopularAuthor({
      popularAuthor: [
        {
          name: authorName,
          blogName: blogName,
          authorid: id,
        },
      ],
    });

    return res.status(200).json(newPopularAuthor).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
