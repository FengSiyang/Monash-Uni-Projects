import java.util.*;

/**
 * Class Game is the main screen showing and the game guide for this game.
 * It will show the main function of the game to users.
 * This game shows the winner whose position is 50 first.
 * The Game clase is the main class to compose this game.
 * This class will invoke the functions in class Player and class Dice.
 * 
 * @author      Siyang Feng 
 * @version     1.0 (Mar. 28, 2017)
 */
public class Game
{
    private ArrayList<Player> players;
    private Dice diceNum;
    
    /**
     * Create dice object that creats the random integer from 1 to 6.
     * Create a new arrayList, players, that records the object of class Player.
     */
    public Game()
    {
        players = new ArrayList<>();
        diceNum = new Dice();
    }
    
    /**
     * Create object of class Player and record in arrayList players.
     */
    public void getPlayer()
    {
        for (int i = 0; i < 2; i++)
        {
            Player playerArray = new Player();
            players.add(playerArray);
        }
    }
    
    /**
     * print the menu.
     */
    public void displayMenu()
    {
        System.out.println("Welcome to the Simple Board Game");
        System.out.println("================================");
        System.out.println("(1) Start/Restart a Game");
        System.out.println("(2) Play One Round");
        System.out.println("(3) Display Players' Positions");
        System.out.println("(4) Display Game Help");
        System.out.println("(5) Exit Game\n");
        System.out.print("Choose an option : ");
    }
    
    /**
     * Typing the operat number and record.
     * 
     * @return      optionString, the typing operate number
     */
    public String inputOption()
    {
        Scanner scan = new Scanner(System.in);
        String optionString = scan.nextLine();
        return optionString;
    }
    
    /**
     * The typed operate number is readed in this method.
     * Option will be choosed for running the correct part of game.
     * Option five will exist game.
     * 
     * @param      optionStr, the typed operate number in inputOption() method
     */
    public void switchResult(String optionStr)
    {
        switch(optionStr)
        {
            case "1":
                operOne();      break;
            case "2":
                operTwo();      break;
            case "3":
                operThree();    break;
            case "4":
                operFour();     break;
            case "5":
                operFive();     break;  
            default:
                otherOp();
        }
    }
    
    /**
     * Method of operation one.
     * Set the name of the players and record.
     */
    public void operOne()
    {
        for (int i = 0; i < players.size(); i++)
        {
            System.out.print("Enter " + (i + 1) + " Player's Name: ");
            nameGet(players.get(i), i);
            // renew the player's position into initializing position
            players.get(i).setPosition(0);  
        }
    } 
    
    /**
     * Method to set player's name and get it.
     * 
     * @param      the object of player
     */
    public void nameGet(Player pl, int i)
    {
        Scanner scan = new Scanner(System.in);
        pl.setName(scan.nextLine());
        pl.setName(pl.getName().trim());  // make sure the inputed name has no useless blank
        if (pl.getName().isEmpty())
        {
            System.out.print("Error: Player's name must not be blank. ");
            System.out.print("Please type again.\nEnter " + (i + 1) + " Player's Name : ");
            nameGet(pl, i);     // iteration
        }
    }
    
    /**
     * Method of opration two.
     * Get new position for each player & judge winner.
     */
    public void operTwo()
    {
        // judge if the game has finished
        if (isWin() == 50)
        {
            System.out.println("Game finished. You must start a new game.");
            if (isDraw())
                System.out.println("The last game was Draw\n");
            else
            {
                System.out.print("The last game was won by Player\t");
                winner();
                System.out.println("\n");
            }
            System.out.println("Please press '1' to start a new game.\n");
        }
        // not finish get new position and compare
        else
        {
            for (int i = 0; i < players.size(); i++)
                positionGet(players.get(i), diceNum);
            if (isDraw())
                System.out.println("The game is a Draw\n");
            else if (isWin() == 50)
            {
                System.out.print("** Congratulations,\t");
                winner();
                System.out.println("have WON this game. **\n");
            }
        }
    }
    
    /**
     * Judge the game is draw.
     * 
     * @return      boolean variable true -> draw, false -> not draw
     */
    public boolean isDraw()
    {
        boolean judge = true;  // assume result is draw
        for (int i = 0; i < players.size(); i++)
            if (players.get(i).getPosition() != 50)
            {
                judge = false;  // not draw
                break;
            }
        return judge;
    }
    
    /**
     * judge if the game is finished nor not.
     * 
     * @return      the largest position of player
     */
    public int isWin()
    {
        int judge = players.get(0).getPosition();
        for (int i = 1; i < players.size(); i++)
            if (players.get(i).getPosition() > judge)
                judge = players.get(i).getPosition();  //get largest position
        return judge;
    }
    
    /**
     * print out the winner's name.
     */
    public void winner()
    {
        for (int i = 0; i < players.size(); i++)
            if (players.get(i).getPosition() == 50)
                System.out.print(players.get(i).getName() + "\t");
    }
    
    /**
     * This method is used to get new position for each player.
     * Every time, after rolling dice, the new position will be record.
     * 
     * @param      object of class Player, object of class Dice
     */
    public void positionGet(Player playerObj, 
                                Dice diceRoll)
    {
        int posit = playerObj.getPosition();  // record last position 
        int dice = diceRoll.rollDice();      // record dice number
        playerObj.setPosition(playerObj.getPosition() + dice);
        if (playerObj.getPosition() % 11 == 0 && 
            playerObj.getPosition() <= 50)
        {
            playerObj.setPosition(playerObj.getPosition() - 5);
            System.out.println(playerObj.getName() + " rolled a " + dice + ", and from position " + 
                                    posit + " to " + playerObj.getPosition() + " (penalty)");
        }
        else
        {
            if (playerObj.getPosition() >= 50)
                playerObj.setPosition(50);  // max position is 50
            System.out.println(playerObj.getName() + " rolled a " + dice + ", and from position " + 
                                    posit + " to " + playerObj.getPosition());        
        }
    }
    
    /**
     * method for operation three.
     * show the players' opsition.
     */
    public void operThree()
    {
        for (int i = 0; i < players.size(); i++)
            System.out.println("Player " + players.get(i).getName() + 
                                    " is no position " + players.get(i).getPosition());
        System.out.println();
    }
    
    /**
     * method for operation four.
     * display the game help.
     */
    public void operFour()
    {
        System.out.println("**********  GAME HELP  **********");
        System.out.println("Enter '1' to start a new game and set players.\n" + 
                              "Enter '2' to roll dice and get new position.\n" + 
                              "Be careful of penalty if your position is 11,22,33,44.\n" + 
                              "The winner is the one who arrive 50 first.\n" + 
                              "Enter '5' to exit game.\nLet's start!\n");
    }
    
    /**
     * method for operation five.
     * display the game exit.
     */
    public void operFive()
    {
        System.out.println("**** Game Exit ****\n");
    }
    
    /**
     * operat number input is illegal.
     */
    public void otherOp()
    {
        System.out.println("   *** ERROR ***");
        System.out.println("Your input is illegal.\n");
    }
    
    /**
     * the main method for this game.
     * method for doing the loop of the whole game.
     * judge the sequence of input operat number is illegal.
     */
    public void playGame()
    {
        String optionString = "";
        getPlayer();
        do
        {
            displayMenu();
            optionString = inputOption();
            // Judge that the input option is in correct sequence.
            if ((optionString.equals("2") || 
                 optionString.equals("3")) && 
                 players.get(0).getName().equals(""))
            {
                System.out.println("Error : players has not been set up!\n\n");
                continue;
            }
            switchResult(optionString);
            System.out.println("\n");
        } while(!optionString.equals("5"));
        players.clear();    // clear the items of arrayList<>()
    }
}