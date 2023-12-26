import { supabase } from "./supabaseClient";

export const fetchAllArticles = async () => {
  try {
    let { data, error, status } = await supabase.from("articles").select(`
        id,
        user_id,
        title,
        content,
        image_urls,
        created_at,
        updated_at,
        game,
        region
      `);

    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error fetching articles:", error.message);
    return null;
  }
};

export const searchArticles = async (query) => {
  try {
    let { data, error, status } = await supabase
      .from("articles")
      .select("id, title, game, region")
      .or(
        `title.ilike.%${query}%,game.ilike.%${query}%,region.ilike.%${query}%`
      );

    if (error && status !== 406) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error searching articles:", error.message);
    return [];
  }
};
