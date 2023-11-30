import slug from "slug";
import uniqueSlug from "unique-slug";

export const createSlug = (str) => {
    return new Promise((resolve) => {
        let newSlug = `${slug(str)}-${uniqueSlug(str)}`;
        resolve(newSlug);
    });
};
