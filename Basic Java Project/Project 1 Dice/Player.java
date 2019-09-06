
/**
 * This class is used to construct player.
 * The player is consisted of name and position.
 * In each game, the player name is record in variable playerName.
 * The variable playerPosition renews position after player rolling dice.
 * 
 * @author      Siyang Feng
 * @version     1.0 (Mar. 28, 2017)
 */
public class Player
{
    // instance variables - player position & player name
    private int playerPosition;
    private String playerName;

    /**
     * Constructor for objects of class Player
     */
    public Player()
    {
        // initialise instance variables
        playerPosition = 0;
        playerName = "";
    }

    /**
     * Set player's name
     * 
     * @param      name
     */
    public void setName(String name)
    {
        playerName = name;
    }

    /**
     * Get player's name from setName(String) method into playerName
     * 
     * @return     the player name which is set before
     */
    public String getName()
    {
        return playerName;
    }

    /**
     * Set player's position
     * 
     * @param      player's position which is set before
     */
    public void setPosition(int position)
    {
        playerPosition = position;
    }

    /**
     * Get player's position from method setPosition(int)
     * 
     * @return     playerPosition
     */
    public int getPosition()
    {
        return playerPosition;
    }
    
    /**
     * Display the player's name and position
     * For testing
     */
    public void display()
    {
        System.out.println(playerName);
        System.out.println(playerPosition);
    }
}
