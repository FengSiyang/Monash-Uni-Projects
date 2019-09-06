library(mongolite)


collections = c("A2009.csv",
                "A2010.csv",
                "A2011.csv",
                "A2012.csv",
                "April_2013.csv",
                "April_2014.csv",
                "August_2013.csv",
                "August_2014.csv",
                "December_2013.csv",
                "December_2014.csv",
                "February_2013.csv",
                "February_2014.csv",
                "February_2015.csv",
                "January_2013.csv",
                "January_2014.csv",
                "January_2015.csv",
                "July_2013.csv",
                "July_2014.csv",
                "June_2013.csv",
                "June_2014.csv",
                "March_2013.csv",
                "March_2014.csv",
                "May_2013.csv",
                "May_2014.csv",
                "November_2013.csv",
                "November_2014.csv",
                "October_2013.csv",
                "October_2014.csv",
                "September_2013.csv",
                "September_2014.csv")

# read collections into R environment
A2009 <- read_collection(collections[1])
A2010 <- read_collection(collections[2])
A2011 <- read_collection(collections[3])
A2012 <- read_collection(collections[4])
April_2013 <- read_collection(collections[5])
April_2014 <- read_collection(collections[6])
August_2013 <- read_collection(collections[7])
August_2014 <- read_collection(collections[8])
December_2013 <- read_collection(collections[9])
December_2014 <- read_collection(collections[10])
February_2013 <- read_collection(collections[11])
February_2014 <- read_collection(collections[12])
February_2015 <- read_collection(collections[13])
January_2013 <- read_collection(collections[14])
January_2014 <- read_collection(collections[15])
January_2015 <- read_collection(collections[16])
July_2013 <- read_collection(collections[17])
July_2014 <- read_collection(collections[18])
June_2013 <- read_collection(collections[19])
June_2014 <- read_collection(collections[20])
March_2013 <- read_collection(collections[21])
March_2014 <- read_collection(collections[22])
May_2013 <- read_collection(collections[23])
May_2014 <- read_collection(collections[24])
November_2013 <- read_collection(collections[25])
November_2014 <- read_collection(collections[26])
October_2013 <- read_collection(collections[27])
October_2014 <- read_collection(collections[28])
September_2013 <- read_collection(collections[29])
September_2014 <- read_collection(collections[30])


# search Info in June from 2010 to 2014
# it the month for a fiscal year with get more releationships with commercial business
June2014 <- June_2014$find('{}')
June2013 <- June_2013$find('{}')
D2012 <- A2012$find('{}')
D2011 <- A2011$find('{}')
D2010 <- A2010$find('{}')


# clean date character
### only clean the date into standerd format in 2013 June
cleanDate2013 <- function(dateSet) {
  for (i in 1:30) {
    dateSet <- gsub(paste(i,"-Jun-13", sep=""), paste(i, "/06/2013", sep=""), dateSet)
  }
  return(dateSet)
}

### only clean the date into standerd format in 2012 all month
cleanDate2012 <- function(dateSet) {
  mon <- c("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec")
  monNum <- c(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12)
  Monpair <- setNames(as.list(monNum), mon)
  for (i in 1:30) {
    for (j in mon) {
      dateSet <- gsub(paste(i,"-", j, "-12", sep=""), paste(i, "/", Monpair[j], "/2012", sep=""), dateSet)
    }
  }
  return(dateSet)
}


### clean the date into standerd format in year 2009 to 2014 and all month
cleanDate20xx <- function(dateSet) {
  mon <- c("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec")
  monNum <- c(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12)
  Monpair <- setNames(as.list(monNum), mon)
  for (i in 1:30) {
    for (j in mon) {
      for (k in 09:14) {
        dateSet <- gsub(paste(i,"-", j, "-", k, sep=""), paste(i, "/", Monpair[j], "/20", k, sep=""), dateSet)
      }
    }
  }
  return(dateSet)
}

## cleaning
June2013$Date <- cleanDate2013(June2013$Date)
D2012$Date <- cleanDate2012(D2012$Date)
D2011$Date <- cleanDate20xx(D2011$Date)


# find the variable type of the date
class(June2013$Date)


# process the date variable from charactor into date type
June2014$Date <- as.Date(June2014$Date, format = "%d/%m/%Y")
D2010$Date <- as.Date(D2010$Date, format = "%d/%m/%Y")
June2013$Date <- as.Date(June2013$Date, format = "%d/%m/%Y")
D2011$Date <- as.Date(D2011$Date, format = "%d/%m/%Y")
D2012$Date <- as.Date(D2012$Date, format = "%d/%m/%Y")


# check the date type
class(June2014$Date)
class(June2013$Date)
class(D2012$Date)
class(D2011$Date)
class(D2010$Date)


getWeekdays = weekdays(as.Date(June2013$Date))
June2012 <- D2012[c()]
