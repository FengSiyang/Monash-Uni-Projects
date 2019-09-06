import java.util.*;

/**
 * This class is wrote for a actor
 * 
 * @author Siyang Feng
 * @version 1.0 (May 16, 2017)
 */
public class Actor 
{
    private String actor;
    /**
     * constructor of actor
     */
    public Actor()
    {
        actor = new String();
    }
    
    /**
     * set the actor's name.
     */
    public void setActorName(String newActor)
    {
        actor = newActor.trim();
    }
    
    /**
     * get the actor's name
     * 
     * @return actor
     */
    public String getActorName()
    {
        return actor;
    }
}