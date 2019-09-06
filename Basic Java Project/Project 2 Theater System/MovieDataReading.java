import java.util.*;
import java.io.*;

/**
 * This class is used to read a txt file named myvideos.
 * after reading, the file will be closed.
 * the file is readed into a collection.
 * 
 * @author  Siyang Feng
 * @version 1.0 (May 16, 2017)
 */
public class MovieDataReading
{
    
    /**
     * read the text file to the text line collection
     * each line contains movie title, director, actors and rating.
     * check if the file exist or if is there any I/O error.
     * 
     * @return  movieInfo, a line of a movie information
     */
    public ArrayList<String> readCheckFile(String newFileName)
    {
        ArrayList<String> movieInfo = new ArrayList<>();
        try
        {
            FileReader inputMovieFile = new FileReader(newFileName);
            Scanner parser = new Scanner(inputMovieFile);
            while (parser.hasNextLine())
            {
                movieInfo.add(parser.nextLine());
            }
            inputMovieFile.close();
        }
        catch (FileNotFoundException e)
        {
            System.out.println(newFileName + " not found!");
        }
        catch (IOException e)
        {
            System.out.println("Unexpected I/O error occured");
        }
        return movieInfo;
    } 
}
