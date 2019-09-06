import java.util.*;
import java.io.*;

/**
 * Write a description of class WriteMovieData here.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */
public class MovieDataWriting
{
    /**
     * Check if the file exist
     */
    public void writeFileCheck(ArrayList<Movie> movies, String fileName)
    {
        try
        {
            writeToFile(movies, fileName);
        }
        catch (IOException e)
        {
            System.out.println("Unexpected I/O error occured");
        }
    } 
    
    /**
     * write the movie collection in to the file
     * 
     * @param   movies, the movie collection
     *          fileName, inut the file name
     */
    private void writeToFile(ArrayList<Movie> movies, String fileName) throws IOException
    {
        PrintWriter outputMovieFile = new PrintWriter(fileName);
        // System.out.println(movies.size());
        for (Movie oneMovie : movies)
        {    
            outputMovieFile.print(oneMovie.getTitle() + ", " + 
                                        oneMovie.getDirector() + ", ");
            for (int i = 0; i < oneMovie.getActorList().actorListSize(); i++)
                outputMovieFile.print(oneMovie.getActorList().getOneActor(i).getActorName()+ ", ");
            outputMovieFile.println(oneMovie.getRating());
        }
        outputMovieFile.close();
    }
}
