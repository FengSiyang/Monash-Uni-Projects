# To add a new cell, type '#%%'
# To add a new markdown cell, type '#%% [markdown]'
#%% Change working directory from the workspace root to the ipynb file location. Turn this addition off with the DataScience.changeDirOnImportExport setting
# ms-python.python added
import os
try:
	os.chdir(os.path.join(os.getcwd(), 'Data Wrangling\\Project 2'))
	print(os.getcwd())
except:
	pass
#%%
from IPython import get_ipython

#%% [markdown]
# # FIT5196 Task 1 in Assessment 2
# #### Student Name: Siyang Feng
# #### Student ID: 28246993
# 
# Date: 13/05/2018
# 
# Version: 2.0
# 
# Environment: Python 3.6.2 and Anaconda 4.3.29
# 
# Libraries used:
# * pandas 0.20.3 (for data frame, included in Anaconda Python 3.6)
# * numpy 1.13.1 (for data format, included in Anaconda Python 3.6)
# * re 2.2.1 (for regular express, included in Anaconda Python 3.6)
# * requests 2.14.2 (for url request code, included in Anaconda Python 3.6)
# * googlemaps 2.5.1 (for Location check, included in Anaconda Python 3.6)
# 
# ## Introduction
# In this task, you are required to inspect and audit the data (**dataset1_with_error.csv**) to identify the data problems, and then fix the problems. Different generic and major data problems could be found in the data might include:
# * Lexical errors
# * Irregularities
# * Violations of the Integrity constraint.
# * Inconsistency
# * In the end, save the error-free dataset in dataset1_solution.csv.
# 
# | **COLUMN**	| **DESCRIPTION** |
# |:--------------|:----------------|
# | Id	| 8 digit Id of the job advertisement | 
# | Title | Title of the advertised job position | 
# | Location | Location of the advertised job position | 
# | ContractType |	The contract type of the advertised job position, could be full-time, part-time or non-specified. | 
# | ContractTime | The contract time of the advertised job position, could be permanent, contract or non-specified. | 
# | Company | Company (employer) of the advertised job position | 
# | Category | The Category of the advertised job position, e.g., IT jobs, Engineering Jobs, etc. | 
# | Salary per annum | Annual Salary of the advertised job position, e.g., 80000 | 
# | OpenDate | The opening time for applying for the advertised job position, e.g., 20120104T150000, means 3pm, 4th January 2012. | 
# | CloseDate | The closing time for applying for the advertised job position, e.g., 20120104T150000, means 3pm, 4th January 2012. | 
# | SourceName | The website where the job position is advertised.
# 
# ## Import Library

#%%
import sys
import pandas as pd
import numpy as np
import re
import datetime
# get response to check URL
import requests

# Import packadge for Geocoder API to check location
try:
    import googlemaps
except:
    #import pip
    get_ipython().system('{sys.executable} -m pip install googlemaps')
    get_ipython().system('{sys.executable} -m pip install --upgrade pip')
    import googlemaps

import matplotlib as mpl
import matplotlib.pyplot as plt
import matplotlib.pylab as pylab
#import seaborn as sns
# Configure visualisations
get_ipython().run_line_magic('matplotlib', 'inline')
mpl.style.use( 'ggplot' )
#Notebook displace setting
from IPython.core.display import HTML


#%%
print(sys.version_info)
print('Pandas version :', pd.__version__)
print('numpy version :', np.__version__)
print('Regular Expression version :', re.__version__)
print('Gooogle Map API packadge version :', googlemaps.__version__)
print('requests version :', requests.__version__)

#%% [markdown]
# ## Import CSV data and Check Global Info

#%%
ds = pd.read_csv('dataset1_with_error.csv')

#%% [markdown]
# After loading the data into dataframe, we can take an overview of the data:
# * the number of the columns
# * the number of the rows
# * the data type of each attributes

#%%
print(ds.shape)
ds.head()


#%%
ds.describe(include='all')


#%%
ds.info()

#%% [markdown]
# ##### What we got from above three cells:
# 1. There are 25077 rows and 11 attributes. 
# 2. The data type of attribute 'id' is int64 and others are object. 
# 3. The id should be unique and it's limited as 8 bits.
# 4. 'Company' attribute contains NAN value because there are only 21242 non-null items.
# 5. For convenience, Salary per annum should be number type and Open and close date should be Date type.
# 
#%% [markdown]
# ## Check ID
# * If id unique
# * If 8-bits length

#%%
# Check if id is unique
ds.Id.nunique()


#%%
not_eight = ds.Id.apply(lambda x: len(str(x)) != 8)
ds[not_eight]

#%% [markdown]
# ##### Id column:
# Everything looks good.
#%% [markdown]
# ## Check Categorical variables
# * ContractType
# * ContractTime
# * Category
#%% [markdown]
# ### 1. Check Contract Type
# ContractType is a categorical variable which contains three categories (full-time, part-time or non-specified).  
# In this column, there is no missed values.  
# However, we find out that the three categories are not available, full-time and part-time. For convenience and consistency, the not available should be modified. "not available" label should be same means as "non_specified".

#%%
ds.ContractType.value_counts()


#%%
ds.ContractType.replace({"not available" : "non-specified", 
                         "full_time":"full-time",
                         "part_time":"part-time"}, inplace=True)
ds.ContractType.value_counts()

#%% [markdown]
# ### 2. Check ContractTime
# The contract time of the advertised job position, could be permanent, contract or non-specified. 
# Thus, it also a categorical variable which contains three categories.  
# From the data below, we can find out that the three categories are marked as permanent, not available and contract. Thus, replace not availible with non_specified.

#%%
ds.ContractTime.value_counts()


#%%
ds.ContractTime.replace({"not available" : "non-specified"}, inplace=True)
ds.ContractTime.value_counts()

#%% [markdown]
# ### 3. Check Category
# From the previous results, we find out there are 8 categories. Here, we should check if it exactly has 8 categories. Check if it contains lexical errors.

#%%
ds.Category.value_counts()

#%% [markdown]
# In Category column, there is no lexical errors.
#%% [markdown]
# ## Check Date Logic
# ### 1. Convert date str into datetime

#%%
# Convert date String into datetime
# leave error converting with NaT
ds_time = ds.copy(deep=True)
ds_time.OpenDate = pd.to_datetime(ds_time.OpenDate, errors='coerce')
ds_time.CloseDate = pd.to_datetime(ds_time.CloseDate, errors='coerce')
ds_time.head()


#%%
# Find out error NaT on OpenDate
open_error = ds_time.query('OpenDate == "NaT"')
open_error


#%%
# find out error NaT on Close Date
close_error = ds_time.query('CloseDate == "NaT"')
close_error

#%% [markdown]
# The above steps shows that：
# * some errors in OpenData column 
# * **no** error in CloseData column
# 
# ** Next Step: ** Print out the error rows and figure out the problems.

#%%
error_fix = ds.loc[open_error.index].copy(deep=True)
error_fix.head()

#%% [markdown]
# From the problem rows printed out, we can find out that the format of 'YearMonthDay' have the Month greater than 12 and Day smaller than 12 which means the the Month and Day may be exchanged their positions.   
# To support my guess, compare the OpenDate and CloseDate which is correct. The Close date should be later than the OpenDate. 

#%%
# Change the OpenDate format as guess
error_fix.OpenDate = pd.to_datetime(error_fix.OpenDate, errors='coerce', format="%Y%d%mT%H%M%S")
error_fix.CloseDate = pd.to_datetime(error_fix.CloseDate, errors='coerce')
error_fix.head()


#%%
# Check if close date earlier than open date
error_fix[error_fix.CloseDate < error_fix.OpenDate]

#%% [markdown]
# As comparing above, the close date is always later than the open date.   
# Thus, what we guess should be correct.  
# 
# Then, convert the date of original dataframe with our detected errors.

#%%
# Conver date type with changing error into NaT
ds.OpenDate = pd.to_datetime(ds.OpenDate, errors='coerce')
ds.CloseDate = pd.to_datetime(ds.CloseDate, errors='coerce')


#%%
# replace NaT value with already changed format
indexs = list(error_fix.index)
# a = np.array(error_fix.loc[indexs].OpenDate)
for i in indexs:
    ds.at[i, 'OpenDate'] = error_fix.loc[i].OpenDate


#%%
# check replace
ds.query('OpenDate == "NaT"')
# No NaT found after replace.

#%% [markdown]
# ### 2. Check date time logic
# After datetime format are fixed correctly.
# 
# The next step is to find out if the OpenDate and CloseDate follow the logic.  
# Compare the OpenDate and Closedate. If the Opendate is ealier than the close date, the result follow the logic. If not, the problem should be fixed.

#%%
# Check if close date earlier than open date
# in total dataset
ds[ds.CloseDate < ds.OpenDate]

#%% [markdown]
# From the dataset selected above, we find out that there are 8 items with illegal open and close date. The date of open is later than the date of close. There are two probabilities:
# * The position of open date and close date are exchanged
# * open date or/and close date is wrong recorded
# 
# We should consider these two conditions together to find out if the range of open and close date are regular.
# 
# The date range may be influenced by different factors such as category and different companies and others. We should consider which factor will influence the date more. 

#%%
date_wrong = ds[ds.CloseDate < ds.OpenDate].copy(deep=True)
date_wrong


#%%
# Add new column to record the date range of open and close date 
date_wrong['DateRange'] = date_wrong.OpenDate - date_wrong.CloseDate
date_wrong


#%%
# copy a new dataframe and drop the wrong date rows
date_train = ds.drop(list(date_wrong.index)).copy(deep=True)
# get the range date
date_train['DateRange'] = date_train.CloseDate - date_train.OpenDate
date_train.head()


#%%
date_train.DateRange.value_counts()


#%%
date_wrong.DateRange.value_counts()

#%% [markdown]
# From the value above, we find out that the range of date in training set are total four categories:
# * 60 days  -  8404
# * 30 days  -  8318
# * 90 days  -  6100
# * 14 days  -  2247
# 
# Comparing with the selected wrong dataset, there is no anomaly:
# * 90 days  -  4
# * 30 days  -  3
# * 60 days  -  1
# 
# Thus, it is probable that the open date value and the close date value are exchanged with each other. 
# 
# So, we exchange the open and close date to fix this problem.

#%%
# swap the two date value
index_list = list(date_wrong.index)
for i in index_list:
    ds.loc[i, ['OpenDate', 'CloseDate']] = ds.loc[i, ['CloseDate', 'OpenDate']].values 


#%%
# Re-check the date logic
ds[ds.CloseDate < ds.OpenDate]

#%% [markdown]
# Change the datetime type back into string type.

#%%
ds.OpenDate = ds.OpenDate.apply(lambda x: x.strftime('%Y%m%dT%H%M%S'))
ds.CloseDate = ds.CloseDate.apply(lambda x: x.strftime('%Y%m%dT%H%M%S'))
ds.head()

#%% [markdown]
# ## Check Salary
# ### 1. check salary format.  
# Modify the salary format with same represent.

#%%
ds[ds['Salary per annum'].str.contains(r'\D', regex=True)]

#%% [markdown]
# From data above, we find out that the salary pre annum column contains there kind of format:
# * The number 
# * The number followed by char 'K' which represent thousand
# * The salary range
# 
# This time we will fix the number with 'K' into number. And, we will keep the range format.

#%%
# Replace K or k into number '000' means thousand
ds['Salary per annum'].replace(r'[Kk]', '000', regex = True, inplace = True)


#%%
# recheck the salary with non-number charactors
# k or K has replaced
ds[ds['Salary per annum'].str.contains(r'\D', regex=True)]

#%% [markdown]
# ### 2. Check outlier salary
# check if there are some salary records irregulation.
# 
# To check the outlier salary, we should get a new column which convert the type of salary into foalt. As for the range salary, we can get its mean value to compare.

#%%
ind = list(ds[ds['Salary per annum'].str.contains(r'\D', regex=True)].index)

# add new column 'Normalize Salary'
ds['Normalize Salary'] = ds['Salary per annum']

# Change the range item in normalize salary column into mean of the range
for i in ind:
    ls = ds['Normalize Salary'][i].split('-')
    ds.at[i, 'Normalize Salary'] = np.mean(list(map(lambda x: float(x), ls)))
    #print(ds['Normalize Salary'][i])


#%%
# Convert str into number in normalize salary column
ds['Normalize Salary'] = pd.to_numeric(ds['Normalize Salary'])


#%%
boxlist = ds[['Category', 'Normalize Salary']]
boxlist.boxplot(by='Category')
plt.xticks(rotation=90)

#%% [markdown]
# Plot boxplot with salary in different Categories because different categories should have their own salary range. If we don't seperate the salary into different categories, the value willn't be such reliable.   
# We find out that no value is greater than the triple times of med value (Q2) in each category. Thus, we can say that there is no salary outlier.  
# > Salary column is no need to be modified.
#%% [markdown]
# ## Check SourceName
# From the previous information, we know that there are 90 unique sources of job advertisement. Here, we should check if the 90 unique source are all spelled correctly.  
# 
# We believe the spelling errors are usaully rare. Thus, we should pay our attention on the sources with only little records. Here, we consider that the value_counts result smaller than 10 may has wrong URL.
# 

#%%
ds.SourceName.value_counts().tail()


#%%
# count the source record
ls = ds.SourceName.value_counts()[ds.SourceName.value_counts().values < 10]


#%%
urls = list(ls.index)
urls

#%% [markdown]
# Here we use URL request to cheack if the url is valid or not. Response code 404 means the page not find. Also, the exception value also means the bad url. After the request checking, we should go through it by eye. Because, the invalid url at this time doesn't means the url is incorresct. We should re-check is manually.
# 
# > This method works only if it connects to web.

#%%
def url_validation(url):
    header = ['http://www.', 'https://www.', 'http://', 'https://']
    for i in header:
        temp_url = i + url
        try:
            response = requests.head(temp_url, allow_redirects=True)
            print(temp_url)
            if response.status_code != 404:
                return
            else:
                return url
        except:
            if i != 'https://':
                continue
            return url


#%%
for j in urls:
    print(url_validation(j))

#%% [markdown]
# From the output of response checking, we find out two bad URLs: 
# * monashstudent : it cannot be a UK job seek url
# * jobcareer
# 
# Another unusual website is __'admin@caterer.com'__ which appears only once and it contains an unusual symbol @.
# 
# These two URL has no head and tails. And then, we find out each of these two URLs only appears once and manually check this two URLs. We find that the it's surely wrong.
# 
# 
# #### First : Check item with SourceName `'monashstudent'`

#%%
ds[ds.SourceName == 'monashstudent']


#%%
ds[ds.Company == 'The A24 Group']

#%% [markdown]
# From the data above, we find out that the item with wrong source name comes from the company, The A24 Group. Thus to fix this problem, we can consider that if the company always release their adv at same web. Thus, I check all the data comes from `The A24 Group`. From the data, we find out that almost all the adv comes from a same website `staffnurse.com` except `monashstudent` which is certainlly wrong. 
# 
# Thus, we can consider that the wrong source name should also be `staffnurse.com`.
#%% [markdown]
# #### Second : Check item with SourceName `'jobcareer'`
# First of all, we should consider is there any other item use the similiar url. If yes, we can compare these two source name.

#%%
lst = []
for i in list(ds.SourceName.unique()):
    lst + re.findall(r'.*job.*career.*', i)
    
lst

#%% [markdown]
# Cannot find out the similiar URL with `'jobcareer'`. Thus, we should find out the whole item to try to find out same relations.

#%%
ds[ds.SourceName == 'jobcareer']

#%% [markdown]
# Get information with each Common factors and find out if there is any possible to figure out the URL.  
# This time, we can compare the source name in same location and same category. Because people in different location or category may prefer different website. Thus, we can find out what websites there companies would like to release their adv.  
# After that, we can find out the website the company, `Brightwater Group`, prefer. Thses reference will be very useful for us to fix the source name.

#%%
# location
ds[(ds.Location == 'Belfast') & (ds.Category == 'IT Jobs')].SourceName.value_counts()


#%%
ds[ds.Company == 'Brightwater Group']


#%%
ds[ds.Company == 'Brightwater Group'].SourceName.value_counts()

#%% [markdown]
# #### Third : Check item with SourceName `'admin@caterer.com'`
# Even this website can pass the request test. But it is still strange with the symbol @. Thus, we will check if this website is correct or not. In this website, the 'admin' seems like a manager count of a website. Thus, we only select the substring of 'caterer' to match other source.

#%%
ds[ds.SourceName.str.contains('caterer')].SourceName.value_counts()

#%% [markdown]
# The above data shows us that the source `'admin@caterer.com'` is very similiar to `'caterer.com'` which appears 1047 time. We can trust the source `'admin@caterer.com'` is not correct and it should be `'caterer.com'`.
#%% [markdown]
# From data above, we push out the data with location of Belfast and it job hiring. We find out that most of the adv comes from `'nijobs.com'`. What's more, the data of the company `'Brightwater Group'` shows that almost all the advertisments about this company can be find from the website `'nijobs.com'` except the error data `'jobcareer'`.
# 
# Thus, we should believe that the error data should be fixed into `'jobcareer'`.
# * monashstudent -> my.monash.edu.au
# * jobcareer -> nijobs.com
# * admin@caterer.com -> caterer.com

#%%
ds.SourceName.replace({'monashstudent': 'staffnurse.com', 'jobcareer': 'nijobs.com', 'admin@caterer.com':'caterer.com'}, inplace=True)


#%%
ds[ds.SourceName == 'monashstudent']


#%%
ds[ds.SourceName == 'jobcareer']


#%%
ds[ds.SourceName == 'admin@caterer.com']

#%% [markdown]
# ## Check Location
# The key of location checking is to find out that if there is any spelling error in location. Also, the spelling error is usually rare. Thus, we can count the frequency of each location and check the spelling of low frequency location name.
# 
# Thus, we can guess the spelling error should not exist more than five times for each location.

#%%
# get the data with low frequency
error_list = ds.Location.value_counts()[ds.Location.value_counts() <= 10]
error_list.head()


#%%
candi_loc = list(error_list.index)
print(candi_loc)


#%%
# get the items with locations in low frequency
new_ds = ds[ds.Location.isin(candi_loc)]
print(new_ds.shape)
new_ds.head()

#%% [markdown]
# ### 1. Check location by title information
# Observe the selected data above, we can find out that the information of title may contains the location. Thus, we can check if the title contains location. 
# 
# If is contains, the location should be correct. If not, we will check it through another way in next step.

#%%
def titleContainsLocation(new_ds):
    """
    find out if the location information is in title
    
    @Arguements:
    new_ds -- input dataframe to find
    
    @return:
    contains_index -- list satisfing the consitions with the index of new_ds
    """
    contains_index = []
    for i in list(new_ds.index):
        pattern = '\s' + new_ds.loc[i].Location.lower() + '[,.\s]'
        #print(pattern)
        pr = re.compile(pattern)
        #print(pr)
        #if new_ds.loc[i].Location in new_ds.loc[i].Title:
        if bool(pr.search(new_ds.loc[i].Title.lower())):
        #print(bool(pr.search(new_ds.loc[i].Title.lower())))
            contains_index.append(i)
    return contains_index


#%%
right_list = titleContainsLocation(new_ds)
print(right_list)


#%%
# drop the rows with no problem
new_ds1 = new_ds.drop(right_list)
new_ds1

#%% [markdown]
# Cross validate the candidate location list and the dropped correct location list. I this step, we search that if the location in candidate wrong location list is also in the correct location list. If yes, we should drop it from the candidate list.
# 
# After that, we generate a new list which will be smaller than before.

#%%
# create check list for location
# Locations in this list are all right
loc_check = new_ds.loc[right_list].Location.unique().tolist()
print(loc_check)


#%%
# record the location in candi_loc1 list which is not in the loc_check list
candi_loc1 = []   # recoed candidate wrong location
for i in new_ds1.Location.unique().tolist():
    if i in loc_check:
        continue
    candi_loc1.append(i)
    
print(candi_loc1)

#%% [markdown]
# Crossing validate the candidate wrong location, we reduce the check range into 62 locations.
# 
# Then, we can check the candidate location by API. 
# * _API: Google Map Geocoder_
# * _Python Packadge: googlemaps_
# 
# Moreover, all the recorded data are come from the UK website, thus, all the location should in UK.

#%%
# Replace the API key below with a valid API key.
gmaps = googlemaps.Client(key='Google API Key')
for i in candi_loc1:
    try:
        geocode_result = gmaps.geocode(i + ', UK')
        addr_search = geocode_result[0]['formatted_address'].lower().replace('.', '')
        new_i = i.lower().replace('.', '')
        if new_i not in addr_search:
            print('Error spell:', i, '-> to ->', addr_search)
    except:
        print('Error:', i)

#%% [markdown]
# From the above print, we find out that all the candidate locations in UK but there are some spelling errors. The six print out lines may cantain errors. This time we should check them one by one.
# 
# We find out that:
# * 'Surrey' is wrong spelled into 'Survey'
# * 'Reading' is wrong spelled into 'Reeding'
# * 'Leeds' is wrong spelled into 'Leads'
# * 'Nottingham' is wrong spelled into 'Nottinham'
# * 'Oxford' is wrong spelled into 'Oxfords'
# 
# As for the other two:
# * Google map records 'Southampton International Airport' into 'southampton airport (sou)'. But it's not the error.
# * Google map records 'Glasgow East Investment Park' into 'glasgow g32 8yl' and it still not a problem.
# 
# Thus, there are four mistake Locations in total to fixed.

#%%
ds.Location.replace({'Surey':'Surrey', 'Reeding':'Reading', 'Leads':'Leeds', 'Nottinham':'Nottingham', 'Oxfords':'Oxford'}, inplace=True)


#%%
# Check fix result.
ds[ds.Location.isin(['Surey', 'Reeding', 'Leads', 'Nottinham', 'Oxfords'])]

#%% [markdown]
# All the potential problems we find have been fixed. This time, drop the column which is not in original dataset.

#%%
ds.drop(['Normalize Salary'], axis=1, inplace=True)
ds.head()

#%% [markdown]
# Drop original index column and change ID column as index column.

#%%
ds = ds.set_index(ds['Id'].values)
ds.index.name = 'Id'
ds.drop('Id', 1, inplace=True)
ds.head()

#%% [markdown]
# ## Export dataframe
# Export this cleaned dataframe into new CSV fine named `dataset1_solution.csv`

#%%
ds.to_csv('dataset1_solution.csv', encoding = 'utf-8')

#%% [markdown]
# ## Summary
#%% [markdown]
# This task test the understanding of auditing and cleansing the dataset.
# * Check dataset column by column and think of all the possible problems and check.
# * Good use of `info()` and `describe()` functions to have a global view of dataset.
# * Find wrong item and modify it reasonable is important. It is important to modify one item with overview all the items and find some connection of wrong and correct item and modify it through correct part.
# * Use network request code to check if the source is correct. Understand the which kind of code we need. Also, regular expression can also use to check URL. But it is unwork when the structure of URL is correct but invalid such as code 404.
# * For the address, it's very hard to check one by one. It is important concept that error always occure rarely. Thus, we can check the frequence to reduce the workload. And compare with other information to reduce continuately. Then, googlemap api will help us to check the rest address. The drawback of this method is slow processing. Thus, reducing the workload is the key point for this part.

