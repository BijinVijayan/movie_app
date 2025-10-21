import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const SAVED_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRITE_SAVED_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);
    // console.log("Appwrite search count result:", result);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        title: movie.title,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error("Error updating search count:", error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(8),
      Query.orderDesc("count"),
    ]);

    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

// save movies

// Save a movie
export const saveMovie = async (userId: string, movie: Movie) => {
  try {
    // Avoid duplicates — check if already saved
    const existing = await database.listDocuments(
      DATABASE_ID,
      SAVED_COLLECTION_ID,
      [Query.equal("user_id", userId), Query.equal("movie_id", movie.id)]
    );

    if (existing.documents.length > 0) {
      // console.log("Movie already saved");
      return existing.documents[0];
    }

    const result = await database.createDocument(
      DATABASE_ID,
      SAVED_COLLECTION_ID,
      ID.unique(),
      {
        user_id: userId,
        movie_id: movie.id,
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        created_at: new Date().toISOString(),
      }
    );
    // console.log("Saved movie:", result);
    return result;
  } catch (error) {
    // console.error("Error saving movie:", error);
    throw error;
  }
};

// Fetch all saved movies for a user
export const getSavedMovies = async (userId: string): Promise<SavedMovie[]> => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      SAVED_COLLECTION_ID,
      [Query.equal("user_id", userId), Query.orderDesc("created_at")]
    );
    return result.documents as unknown as SavedMovie[];
  } catch (error) {
    console.error("Error fetching saved movies:", error);
    return [];
  }
};

// Remove a saved movie
export const removeSavedMovie = async (userId: string, movie: Movie) => {
  try {
    // Step 1: Find the saved movie document
    const res = await database.listDocuments(DATABASE_ID, SAVED_COLLECTION_ID, [
      Query.equal("user_id", userId),
      Query.equal("movie_id", movie.id),
    ]);

    if (res.total === 0) {
      console.warn("No saved movie found to remove");
      return false;
    }

    // Step 2: Delete the document using its ID
    const docId = res.documents[0].$id;
    await database.deleteDocument(DATABASE_ID, SAVED_COLLECTION_ID, docId);

    // console.log("Removed saved movie");
    return true;
  } catch (error) {
    console.error("Error removing saved movie:", error);
    throw error;
  }
};

export const isMovieSaved = async (movieId: number, userId: string) => {
  try {
    const res = await database.listDocuments(DATABASE_ID, SAVED_COLLECTION_ID, [
      Query.equal("user_id", userId),
      Query.equal("movie_id", movieId),
    ]);
    return res.total > 0;
  } catch (err) {
    console.log("Error checking saved movie:", err);
    return false;
  }
};
