import java.util.*;

/**
 * This Class is the collection of movie objects.
 * this class can add new movie, search movie, delete movie and edit movie.
 * This class can also list the movies with favor rating
 * 
 * @author Siyang Feng 
 * @version 1.0 (May 16, 2017)
 */
public class MovieCollection //extends ArrayList<Movie>
{
    private ArrayList<Movie> movieList;
    
    /**
     * Constructor for objects of class MovieCollection
     */ 
    public MovieCollection()
    {
        movieList = new ArrayList<>();
    } 
    
    /**
     * set the collection of movies
     * 
     * @param   movies the collection of movie
     */
    public void setMovieList(ArrayList<Movie> movies)
    {
        movieList = movies;
    }
    
    /**
     * get the movie list
     * 
     * @return movieList
     */
    public ArrayList<Movie> getMovieList()
    {
        return movieList;
    }
    
    /**
     * get on movie
     * 
     * @param   i, the sequence of movie
     */
    public Movie getOneMovie(int i)
    {
        return movieList.get(i);
    }
    
    /**
     * get the size of movie collection
     * 
     * @return  collection size
     */
    public Integer movieListSize()
    {
        return movieList.size();
    }
    
    /**
     * clear arraylist of movie
     */
    public void clearMovie()
    {
        movieList.clear();
    }
    
    
    /**
     * add new Movie into movieList
     * 
     * @param   newMovie
     */
    public void addMovie(Movie newMovie)
    {
        movieList.add(newMovie);
    }
    
    
    /**
     * Search movie by part title.
     * 
     * @param   partString, string to search for
     * @return  searchedMovies
     */
    public ArrayList<Movie> searchByTitle(String partTitle) throws NullPointerException
    {
        ArrayList<Movie> searchedMovies = new ArrayList<>();
        for (Movie aMovie : movieList)
            if (aMovie.getTitle().toLowerCase().contains(partTitle.toLowerCase()))
                searchedMovies.add(aMovie);
        return searchedMovies;
    }
    
    /**
     * Search movie by director full name.
     * 
     * @param   DirName, string to search for
     * @return  searchedMovies
     */
    public ArrayList<Movie> searchByDirector(String DirName) throws NullPointerException
    {
        ArrayList<Movie> searchedMovies = new ArrayList<>();
        for (Movie aMovie : movieList)
            if (aMovie.getDirector().toLowerCase().equals(DirName.toLowerCase()))
                searchedMovies.add(aMovie);
        return searchedMovies;
    }
    
    /**
     * delete the matched movie from movie collection.
     * 
     * @param   aMovie
     */
    public void deleteMovie(Movie aMovie)
    {
        movieList.remove(aMovie);
    }
    
    /**
     * match a list of movie with the rating not lower than input rating.
     * 
     * @param   favorRate
     * @return  favorMovies, the collection of movies matching the rating
     */
    public ArrayList<Movie> listFavorMovie(int favorRate)
    {
        ArrayList<Movie> favorMovies = new ArrayList<>();
        for (Movie aMovie : movieList)
            if (aMovie.getRating() >= favorRate)
                favorMovies.add(aMovie);
        return favorMovies;
    }
    
    
}
    