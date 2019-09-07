#include <stdio.h>
#include <stdlib.h>
#include "mpi.h"
#include <time.h>

// define the min and max location
#define MIN_LOCATION 0
#define MAX_LOCATION 1000

#define TRUE 1

// define the time of total runtime
#define TIME 100.00

// define a sample time
#define SAMPLE_TIME 0.005



int main(int argc, char *argv[])
{
	double strike_num = 0, sample_num = 0;
	int rank, size, rc;
	// define time variable
    double start_time, current_time, timer = 0;

	rc = MPI_Init(&argc, &argv);
	//MPI_Init(&argc, &argv);
	if (rc == MPI_SUCCESS) {
		MPI_Comm_size(MPI_COMM_WORLD, &size);
        MPI_Comm_rank(MPI_COMM_WORLD, &rank);
	}

	MPI_Status status;  // declear status for revieve
	// get start time
	start_time = MPI_Wtime();  // get start time

	while (TRUE) {
		// get current time of one sample
		current_time = MPI_Wtime();  // get current time
		timer = current_time - start_time;  // timer for whole program
		if (timer > TIME) break; // if timer is greater than TIME, stop run
		// braodcast result to all processor to control stop and synchronise the clock of all processors
		MPI_Bcast(&timer, 1, MPI_DOUBLE, 0, MPI_COMM_WORLD);

		// get start time of a sample
		double start_time_in = MPI_Wtime();
		double current_time_in;
		double timer_in = 0;
		
		while (timer_in < SAMPLE_TIME) {
			if (rank == 0) {  // rank 0 is the master processor
				sample_num += 1;

				printf("\n=========================================\n");
				printf("Starting sample # %.0f\n", sample_num);
				printf(" Timer : %lf\n", timer_in);
				fflush(stdout);
			}

			// get clock current time
			current_time_in = MPI_Wtime();
			timer_in = current_time_in - start_time_in;  // get sample timer
			MPI_Bcast(&timer_in, 1, MPI_DOUBLE, 0, MPI_COMM_WORLD);  // broadcast sample timer to all slave processors

			// generate a random number between 0 to 999
			srand( (rank+1)*clock() );   // seed
			int loc = rand() % MAX_LOCATION;

			printf(" Processor %d occupy location: %d.\n", rank, loc);
			fflush(stdout);


			if (rank != 0) {
				// sent occupied location to master processor 0
				MPI_Send(&loc, 1, MPI_INT, 0, 0, MPI_COMM_WORLD);
			} 
			else {
				// define a new structure to record occupied positions
				struct Map {
					struct Location {
    					int vessel[size]; // record the renk of vessel in each location
    					int vessel_num; // record vessels number in each location of map
    				} location[MAX_LOCATION]; // location will record 1000 map point from 0 to 999.
				} map;
				// initialize occupied map
				int l_index;
				for (l_index = 0; l_index < MAX_LOCATION; l_index++) {
					map.location[l_index].vessel_num = 0;
				}
				// update map about processor 0
				map.location[loc].vessel_num ++;  // record vessel number of map selected location
				map.location[loc].vessel[0] = 0;  // record proc 0 into map location

				// receive from all processors except itself
				int proc;   // rank number recieve from other rank
				for (proc = 1; proc < size; proc++) {

					//Declare a variable to store the income location
					int loc_store;
					MPI_Recv(&loc_store, 1, MPI_INT, proc, 0, MPI_COMM_WORLD, &status);

					// save in map
					int last_index = map.location[loc_store].vessel_num++;
					map.location[loc_store].vessel[last_index] = proc;
				}

				// verify map and find out number of strikes
				int loc_index;
				for (loc_index = 0; loc_index < MAX_LOCATION; loc_index++) {
					// find out all the location which is occupied by at least 3 vessels
                    if (map.location[loc_index].vessel_num > 2) {
                        
                        //int location = loc_index + 1;
                        int ves_num = map.location[loc_index].vessel_num;
                        
                        int odd_count = 0;
                        int even_count = 0;
                        
                        int vessel_index;
                        for (vessel_index = 0; vessel_index < ves_num; vessel_index++) {
                            int vessel = map.location[loc_index].vessel[vessel_index];  // get every vessel rank of one position
                            // check even or odd
                            if (vessel % 2 == 0) {
                                even_count++;
                            } else {
                                odd_count++;
                            }
                        }
                        // strike, at least one odd two even
                        if ( (odd_count >= 1) && (even_count >= 2) ) {
                            strike_num += 1;  // record strike
                        }
                    }
                }
			}

		}
	}

	// Print findings
    sleep(2);
    if (rank == 0) {
        printf("\n*******************************************\n");
        printf("\nFinally:\n");
        printf("\nTotal Strikes generated : %.0f\n", strike_num);
        printf("\nTotal Sample sessions : %.0f\n", sample_num);
        printf("\nStrike Rate : %f\n\n", strike_num/sample_num);
        fflush(stdout);
    }


    MPI_Finalize();


	return 0;
}
