library(mongolite)

## make a function read mongo collection into R enviroment
read_collection <- function(x) {
  collect <- mongo(collection = x, db = "MelPedTra", url = "mongodb://localhost")
  return(collect)
}
##########################################

collections = c("A2009.csv",
                "A2010.csv",
                "A2011.csv",
                "A2012.csv",
                "April_2013.csv",
                "April_2014.csv",
                "April_2015.csv",
                "April_2016.csv",
                "April_2017.csv",
                "August_2013.csv",
                "August_2014.csv",
                "August_2015.csv",
                "August_2016.csv",
                "August_2017.csv",
                "December_2013.csv",
                "December_2014.csv",
                "December_2015.csv",
                "December_2016.csv",
                "February_2013.csv",
                "February_2014.csv",
                "February_2015.csv",
                "February_2016.csv",
                "February_2017.csv",
                "January_2013.csv",
                "January_2014.csv",
                "January_2015.csv",
                "January_2016.csv",
                "January_2017.csv",
                "July_2013.csv",
                "July_2014.csv",
                "July_2015.csv",
                "July_2016.csv",
                "July_2017.csv",
                "June_2013.csv",
                "June_2014.csv",
                "June_2015.csv",
                "June_2016.csv",
                "June_2017.csv",
                "March_2013.csv",
                "March_2014.csv",
                "March_2015.csv",
                "March_2016.csv",
                "March_2017.csv",
                "May_2013.csv",
                "May_2014.csv",
                "May_2015.csv",
                "May_2016.csv",
                "May_2017.csv",
                "November_2013.csv",
                "November_2014.csv",
                "November_2015.csv",
                "November_2016.csv",
                "October_2013.csv",
                "October_2014.csv",
                "October_2015.csv",
                "October_2016.csv",
                "September_2013.csv",
                "September_2014.csv",
                "September_2015.csv",
                "September_2016.csv")

# read collections into R environment
A2009 <- read_collection(collections[1])
A2010 <- read_collection(collections[2])
A2011 <- read_collection(collections[3])
A2012 <- read_collection(collections[4])
April_2013 <- read_collection(collections[5])
April_2014 <- read_collection(collections[6])
April_2015 <- read_collection(collections[7])
April_2016 <- read_collection(collections[8])
April_2017 <- read_collection(collections[9])
August_2013 <- read_collection(collections[10])
August_2014 <- read_collection(collections[11])
August_2015 <- read_collection(collections[12])
August_2016 <- read_collection(collections[13])
August_2017 <- read_collection(collections[14])
December_2013 <- read_collection(collections[15])
December_2014 <- read_collection(collections[16])
December_2015 <- read_collection(collections[17])
December_2016 <- read_collection(collections[18])
February_2013 <- read_collection(collections[19])
February_2014 <- read_collection(collections[20])
February_2015 <- read_collection(collections[21])
February_2016 <- read_collection(collections[22])
February_2017 <- read_collection(collections[23])
January_2013 <- read_collection(collections[24])
January_2014 <- read_collection(collections[25])
January_2015 <- read_collection(collections[26])
January_2016 <- read_collection(collections[27])
January_2017 <- read_collection(collections[28])
July_2013 <- read_collection(collections[29])
July_2014 <- read_collection(collections[30])
July_2015 <- read_collection(collections[31])
July_2016 <- read_collection(collections[32])
July_2017 <- read_collection(collections[33])
June_2013 <- read_collection(collections[34])
June_2014 <- read_collection(collections[35])
June_2015 <- read_collection(collections[36])
June_2016 <- read_collection(collections[37])
June_2017 <- read_collection(collections[38])
March_2013 <- read_collection(collections[39])
March_2014 <- read_collection(collections[40])
March_2015 <- read_collection(collections[41])
March_2016 <- read_collection(collections[42])
March_2017 <- read_collection(collections[43])
May_2013 <- read_collection(collections[44])
May_2014 <- read_collection(collections[45])
May_2015 <- read_collection(collections[46])
May_2016 <- read_collection(collections[47])
May_2017 <- read_collection(collections[48])
November_2013 <- read_collection(collections[49])
November_2014 <- read_collection(collections[50])
November_2015 <- read_collection(collections[51])
November_2016 <- read_collection(collections[52])
October_2013 <- read_collection(collections[53])
October_2014 <- read_collection(collections[54])
October_2015 <- read_collection(collections[55])
October_2016 <- read_collection(collections[56])
September_2013 <- read_collection(collections[57])
September_2014 <- read_collection(collections[58])
September_2015 <- read_collection(collections[59])
September_2016 <- read_collection(collections[60])





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
  for (i in 1:31) {
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
  for (i in 1:31) {
    for (j in mon) {
      for (k in 09:17) {
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


# select the day in June
June2012 <- D2012[c(D2012$Date >= "2012-06-01" & D2012$Date <= "2012-06-30"), ]
June2011 <- D2011[c(D2012$Date >= "2012-06-01" & D2012$Date <= "2012-06-30"), ]
June2010 <- D2010[c(D2012$Date >= "2012-06-01" & D2012$Date <= "2012-06-30"), ]  # All NA, 2010 has no data on June
rm(June2010)  # remove June2010

# Select the weekends data which will more represent the shopping traffic rather than work
Weekend2014 <- June2014[weekdays(as.Date(June2014$Date))=="Sunday" | weekdays(as.Date(June2014$Date))=="Saturday", ]
Weekend2013 <- June2013[weekdays(as.Date(June2013$Date))=="Sunday" | weekdays(as.Date(June2013$Date))=="Saturday", ]
Weekend2012 <- June2012[weekdays(as.Date(June2012$Date))=="Sunday" | weekdays(as.Date(June2012$Date))=="Saturday", ]
Weekend2011 <- June2011[weekdays(as.Date(June2011$Date))=="Sunday" | weekdays(as.Date(June2011$Date))=="Saturday", ]

# calculate average Pedestrain in each place a day
attach(Weekend2014)
padesAday2014 <- aggregate(Weekend2014, by=list(Date), FUN = mean)
attach(Weekend2013)
padesAday2013 <- aggregate(Weekend2013, by=list(Date), FUN = mean)
attach(Weekend2012)
padesAday2012 <- aggregate(Weekend2012, by=list(Date), FUN = mean)
attach(Weekend2011)
padesAday2011 <- aggregate(Weekend2011, by=list(Date), FUN = mean)

install.packages("ggplot2")
library(ggplot2)

pl1 <- qplot(weekdays(as.Date(padesAday2014$Date)), padesAday2014$`Melbourne Central`, geom = c("point", "jitter"), color = "2014") + scale_colour_manual(values = c("black"))
pl2 <- qplot(weekdays(as.Date(padesAday2013$Date)), padesAday2013$`Melbourne Central`, geom = c("point", "jitter"), color = "2013") + scale_colour_manual(values = c("red"))
pl3 <- qplot(weekdays(as.Date(padesAday2012$Date)), padesAday2012$`Melbourne Central`, geom = c("point", "jitter"), color = "2012") + scale_colour_manual(values = c("blue"))
pl4 <- qplot(weekdays(as.Date(padesAday2011$Date)), padesAday2011$`Melbourne Central`, geom = c("point", "jitter"), color = "2011") + scale_colour_manual(values = c("green"))
grid.arrange(pl1, pl2, pl3, pl4, ncol=4)



# plot pedestrian density in every hour on weekend 
install.packages("gridExtra")
library(gridExtra)
require(gridExtra)
plot1 <- qplot(Weekend2014$Hour, Weekend2014$`Melbourne Central`, geom = c("point", "smooth"), color = "2014") + scale_colour_manual(values = c("black"))
plot2 <- qplot(Weekend2013$Hour, Weekend2013$`Melbourne Central`, geom = c("point", "smooth"), color = "2013") + scale_colour_manual(values = c("red"))
plot3 <- qplot(Weekend2012$Hour, Weekend2012$`Melbourne Central`, geom = c("point", "smooth"), color = "2012") + scale_colour_manual(values = c("blue"))
plot4 <- qplot(Weekend2011$Hour, Weekend2011$`Melbourne Central`, geom = c("point", "smooth"), color = "2011") + scale_colour_manual(values = c("green"))
grid.arrange(plot1, plot2, plot3, plot4, ncol=4)

View(Weekend2014)
View(Weekend2013)
View(Weekend2012)
View(Weekend2011)
View(padesAday2014)
View(padesAday2013)
View(padesAday2012)
View(padesAday2011)

