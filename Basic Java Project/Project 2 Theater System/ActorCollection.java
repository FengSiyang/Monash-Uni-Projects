import java.util.*;
/**
 * The class for actor list.
 * used to record a list of actors in one movie.
 * 
 * @author Siyang Feng
 * @version 1.0 (May 16, 2017)
 */
public class ActorCollection //extends ArrayList<Actor>
{
    ArrayList<Actor> actors;

    /**
     * Constructor for objects of class ActorCollection
     */
    public ActorCollection()
    {
        actors = new ArrayList<>();
    }
    
    /**
     * Add a new actor into actor collection
     * 
     * @param   newActor
     */
    public void addActor(Actor newActor)
    {
        actors.add(newActor);
    }
    
    /**
     * Get one actor from the actor list
     * 
     * @param   i, the sequence of the actor
     * @return  the specific actor object
     */
    public Actor getOneActor(int i)
    {
        return actors.get(i);
    }
    
    /**
     * Set one actor arraylist in to actors
     * 
     * @param   newActors
     */
    public void setActorList(ArrayList<Actor> newActors)
    {
        actors = newActors;
    }
    
    /**
     * Get the actor list
     * 
     * @return  actors
     */
    public ArrayList<Actor> getActorList()
    {
        return actors;
    }
    
    /**
     * get the size of the actor list
     * 
     * @return  collection size
     */
    public Integer actorListSize()
    {
        return actors.size();
    }
}