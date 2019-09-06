import java.util.*;

/**
 * This class of one movie.
 * One movie contains the movie title, director,
 * one object of actor and rating.
 * 
 * @author Siyang Feng
 * @version 1.0 (May 16, 2017)
 */
public class Movie
{
    private String title;
    private String director;
    private ActorCollection actors;
    private int rating;
    
    /**
     * Constructor for objects of class Movie
     */
    public Movie()
    {
        title = "";
        director = "";
        actors = new ActorCollection();
        rating = 0;
    }
    
    public Movie(String newTitle, String newDirector, ActorCollection newActors, int newRating)
    {
        title = newTitle;
        director = newDirector;
        actors = newActors;
        rating = newRating;
    }
    
    /**
     * Set the movie title.
     * 
     * @param   newTitle the readed title
     */
    public void setTitle(String newTitle)
    {
        title = newTitle.trim();
    }
    
    /**
     * Get the movie title
     * 
     * @return  title the title of a movie
     */
    public String getTitle()
    {
        return title;
    }
    
    /**
     * set the director of one movie
     * 
     * @param   newDirector, the readed director
     */
    public void setDirector(String newDirector)
    {
        director = newDirector.trim();
    }
    
    /**
     * get the director
     * 
     * @return  director
     */
    public String getDirector()
    {
        return director;
    }
    
    /**
     * set the actor list.
     * 
     * @param   newActor a object of actor class
     */
    public void setActorList(ActorCollection newActorList)
    {
        actors = newActorList;
    }
    
    /**
     * get the actor list
     * 
     * @return  actorList object of class Actor
     */
    public ActorCollection getActorList()
    {
        return actors;
    }
    
    /**
     * set a rating of movie
     * 
     * @param   newRating
     * @return  boolean, newRating is integer -> true
     *                   otherwise -> false
     */
    public boolean setRating(String newRating)
    {
        try
        {
            rating = Integer.parseInt(newRating.trim());
        }
        catch (NumberFormatException e)
        {
            return false;
        }
        return true;
    }
    
    /**
     * get a rating of movie.
     * 
     * @return rating
     */
    public int getRating()
    {
        return rating;
    }
    
    /**
     * Display for testing
     */
    public void display()
    {
        System.out.println(title + ", " + director + ", " + actors.getOneActor(0).getActorName() + ", " + 
                                actors.getOneActor(1).getActorName() + ", " + 
                                actors.getOneActor(2).getActorName() + ", " + rating);
    }
}