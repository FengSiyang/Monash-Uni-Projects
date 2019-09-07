#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <unistd.h>
#include "mpi.h"

// Tag
#define ELECTION 100
#define BACK 101
#define FINISH 102
// Boolean
#define TRUE 1
#define FALSE 0

int main(int argc, char* argv[]) {
	int rank, size, rc, flag = FALSE, ele_msg = 0, state = TRUE, back_msg = 0;

    double timeout = 0, delay = 0, now;

    rc = MPI_Init(&argc, &argv);
    if (rc == MPI_SUCCESS) {
    	MPI_Comm_size(MPI_COMM_WORLD, &size); // get size of the processor
        MPI_Comm_rank(MPI_COMM_WORLD, &rank); // define rank
    } else {
    	printf("MPI initial error.\n");
    	return 0;
    }

    MPI_Status status;  // for blocking recieve
    MPI_Request request; // for non-blocking recieve

    printf("Processor [%d] in state [%d]\n", rank, state);
    usleep(20000);

    if (size == 1) {  // if only one processor, it's leader
    	printf("Processor 0 is leader.");
        MPI_Finalize();  // finalize MPI
    	return 0;
    }

    while (state) {
    	if (rank == 0) {  // rank 0 start election
    		printf("Processor 0 start election.\n");
    		// rank 0 send election msg to all higher rank
		    int i;
    		for (i = rank + 1; i < size; i++) {
    			now = MPI_Wtime();
    			MPI_Send(&rank, 1, MPI_INT, i, ELECTION, MPI_COMM_WORLD);
    			delay = MPI_Wtime() - now;  // calculate delay time of block sending of P0
    		}
    		usleep(20000);
    	} else {
    		now = MPI_Wtime();
    		// other rank recieve massage from start rank 0, no recieve no other process
    		MPI_Recv(&ele_msg, 1, MPI_INT, 0, ELECTION, MPI_COMM_WORLD, &status); 
    		timeout = MPI_Wtime() - now; // calculate timeout time of block recieving.
    		now = MPI_Wtime();
    		MPI_Send(&rank, 1, MPI_INT, 0, BACK, MPI_COMM_WORLD); // send back massage to 0
    		delay = MPI_Wtime() - now;  // calculate blocking delay time of other processors
		    int i;
    		for (i = rank + 1; i < size; i++) {  // send election msg to higher rank
    			MPI_Send(&rank, 1, MPI_INT, i, ELECTION, MPI_COMM_WORLD);
    		}
    		// recieve elections and if recieve rank is smaller than self, back massage.
    		int j;
    		for (j = 1; j < rank; j++) {  // recieve all election msg
    			MPI_Recv(&ele_msg, 1, MPI_INT, MPI_ANY_SOURCE, ELECTION, MPI_COMM_WORLD, &status);
    			if (ele_msg < rank) {
    				MPI_Send(&rank, 1, MPI_INT, status.MPI_SOURCE, BACK, MPI_COMM_WORLD); // back msg to lower rank
    			}
    		}
    	}
        // non-blocking recieve back massage from all other processors
    	MPI_Irecv(&back_msg, 1, MPI_INT, MPI_ANY_SOURCE, BACK, MPI_COMM_WORLD, &request);
    	double tp = MPI_Wtime();
    	MPI_Test(&request, &flag, &status);   // test if any back massage recieved
    	while (!flag) {  // if recieved msg, flag turn from FALSE to TRUE
    		if (MPI_Wtime() -tp >= 1) {  // wait for 1 sec, no recieved -> cancel non-blocking recieve
    			MPI_Cancel(&request);
    			MPI_Request_free(&request);
    			break;
    		}
    		MPI_Test(&request, &flag, &status);
    	}
        // if recieved any back massage, not leader.
    	if (flag == TRUE) { 
    		state = FALSE;  // state change to FALSE
    		printf("Processor %d recieved BACK massage.\n", rank);
    	}
    	else {   // recieved no massage, become leader, state not change
    		printf("Processor %d is now leader.\n", rank);
    	}
        // print out all the status of each processor
    	printf("* Processor [%d] in state [%d]: delay time [%f] time-out [%f]\n", rank, state, delay, timeout);
    }
    MPI_Finalize();  // finalize MPI

    return 0;
}
