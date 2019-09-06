
/**
 * this class Dice is about user to deviced the steps.
 * the Dice will generate a integer for each players between 1 to 6 rendomly.
 * this is used by program to simulate a doce roll operation.
 * the return value in this class will be used in Player class
 * 
 * @author      Siyang Feng 
 * @version     1.0 (Mar. 28, 2017)
 */

public class Dice
{
    /**
     * This method creat the action dice rolling
     * Result will be a integer between 1 to 6
     * 
     * @return     1 + (int)(Math.random()*6), the random integer between 1 to 6
     */
    public int rollDice()
    {
        // dice should genarate a number in equal random rate
        return 1 + (int)(Math.random() * 6);
    }

    /**
     * This method is used to test the rendom result
     * For testing
     */
    public void displayDice()
    {
        System.out.println(rollDice());
    }
}
