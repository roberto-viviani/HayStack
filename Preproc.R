#Preproc script: preprocessing of data
library(dplyr)
library(stringr)
library(tidyr)

scales <- read.table("DatabaseFull.txt", header=T, sep="\t")
demographics <- read.table("SocioDemographicsFull.txt", header=T, sep="\t")

#Preparation demographics/scales
demographics$Sex[demographics$Sex == ""] <- NA
demographics$Edu[demographics$Edu == ""] <- NA
scales$response[scales$response == ""] <- NA

#Clean up scales
#Delete individuals that took less than 2 sec on average to do the SST
scales2 <- anti_join(scales, scales %>% group_by(subjectID) %>% summarize(mnRT = mean(RT)) %>% filter(mnRT < 2000))

#Find out which participants completed the session and delete all not completed sessions
complete <- scales2 %>% filter(testID == "Ukraine") %>% group_by(sessionID) %>% summarise (n = n()) %>% filter (n > 1)
demographics2 <- semi_join(demographics, complete, by = "sessionID")
scales3 <- semi_join(scales2, complete, by = "sessionID")

#Combine both tables
demographics3 <- demographics2 %>% select(subjectID, Age, Sex, Edu, Occupation, RiskAttitude)
data <- left_join(scales3, demographics3, by = "subjectID")

#Delete all people that completed more than one session
duplicates <- data %>% select(subjectID) %>% distinct()
data2 <- inner_join(duplicates, data, by = "subjectID")

#Delete participants that failed practice trials with timeout -> Not possible, no RT captured
#Delete participants if response in practice trials is > 1 Miss)
Practice <- data2 %>% group_by(subjectID) %>% filter(type=="AP") %>% filter(response=="MISS") %>% summarise (count = n()) %>% filter(count > 1)
data3 <- anti_join(data2, Practice, by = "subjectID")

#remove neutral sentences and practice trials of the SST
data4 <- data3 %>% group_by(subjectID) %>% filter(type != "AP") %>% filter(type != "N")

#Select responses in SST
POS <- data4 %>% select (trialID, testID, response, subjectID) %>% filter(testID == "SST_DarkPersonality_V1" & response == "POS" | response == "NEG")
POS <- POS %>% select(response, trialID, subjectID) %>% rename("POS"="response")
data5 <- left_join(data4, POS, by = c("subjectID", "trialID"))
data5$POS <- recode(data5$POS, NEG = 0, POS = 1)

#filter individuals that made more than ten errors or misses
Error <- data5 %>% group_by(subjectID) %>% select(subjectID, response) %>% filter(response == "MISS" | response == "ERROR" ) %>% summarise(count = n()) %>% filter(count > 10)
data6 <- anti_join(data5, Error, by = "subjectID")

#create "sentenceID"
sentenceID <- data6 %>% group_by(subjectID) %>% filter(grepl("^H.*|^J.*", itemID))
sentenceID <- sentenceID %>% select(subjectID, trialID, itemID)
data6 <- left_join(data6, sentenceID, by = c("subjectID", "trialID")) %>% rename("sentenceID" = "itemID.y")

#scales
#ADS (higher scores = higher depression scores)
# -> Calculated sum (see manual)

ADS.pol <- data6 %>% select(testID, subjectID, response, polarity) %>% filter(testID == "ADS")
ADS <- mutate (ADS.pol, response = if_else(polarity==1, as.integer(response), as.integer(3)- as.integer(response)))
ADS <- ADS %>% group_by(subjectID) %>% summarise(ADS = sum(as.integer(response)))
data7 <- left_join(data6, ADS, by = "subjectID")

#SD4 (higher scores = higher scores in dark personality)
# -> Calculated mean

SD4.pol <- data7 %>% select(testID, subjectID, response, polarity) %>% filter(testID == "SD4")
SD4.total <- SD4.pol %>% group_by(subjectID) %>% summarise(SD4.total = mean(as.integer(response)))
data7 <- left_join(data7, SD4.total, by = "subjectID")

SD4.Mach <- data7 %>% select(testID, subjectID, response, polarity, type) %>% filter(type == "Mach") %>% group_by(subjectID) %>% summarise(SD4.Mach = mean(as.integer(response)))
data7 <- left_join(data7, SD4.Mach, by = "subjectID")

SD4.Narc <- data7 %>% select(testID, subjectID, response, polarity, type) %>% filter(type == "Narc") %>% group_by(subjectID) %>% summarise(SD4.Narc = mean(as.integer(response)))
data7 <- left_join(data7, SD4.Narc, by = "subjectID")

SD4.Psy <- data7 %>% select(testID, subjectID, response, polarity, type) %>% filter(type == "Psyc") %>% group_by(subjectID) %>% summarise(SD4.Psy = mean(as.integer(response)))
data7 <- left_join(data7, SD4.Psy, by = "subjectID")

SD4.Sad <- data7 %>% select(testID, subjectID, response, polarity, type) %>% filter(type == "Sad") %>% group_by(subjectID) %>% summarise(SD4.Sad = mean(as.integer(response)))
data7 <- left_join(data7, SD4.Sad, by = "subjectID")

#LPFS (higher score = lower personality functioning)
# -> calculated mean
LPFS.pol <- data7 %>% select(testID, subjectID, response, polarity) %>% filter(testID == "LPFSBF")
LPFS.total <- LPFS.pol %>% group_by(subjectID) %>% summarise(LPFS.total = mean(as.integer(response)))
data7 <- left_join(data7, LPFS.total, by = "subjectID")

LPFS.self <- data7 %>% select(testID, subjectID, response, polarity, type) %>% filter(type == "self") %>% group_by(subjectID) %>% summarise(LPFS.self = mean(as.integer(response)))
data7 <- left_join(data7, LPFS.self, by = "subjectID")

LPFS.other <- data7 %>% select(testID, subjectID, response, polarity, type) %>% filter(type == "interpersonal") %>% group_by(subjectID) %>% summarise(LPFS.other = mean(as.integer(response)))
data7 <- left_join(data7, LPFS.other, by = "subjectID")

#PID5
# -> calculated mean

PID.pol <- data7 %>% select(testID, subjectID, response, polarity) %>% filter(testID == "PID5BF34")
PID.total <- PID.pol %>% group_by(subjectID) %>% summarise(PID.total = mean(as.integer(response)))
data7 <- left_join(data7, PID.total, by = "subjectID")

Anancasm <- data7 %>% select(testID, subjectID, response, polarity, type) %>% filter(type == "anancasm") %>% group_by(subjectID) %>% summarise(anancasm = mean(as.integer(response)))
data7 <- left_join(data7, Anancasm, by = "subjectID")

Antagonism <- data7 %>% select(testID, subjectID, response, polarity, type) %>% filter(type == "antagonism") %>% group_by(subjectID) %>% summarise(antagonism = mean(as.integer(response)))
data7 <- left_join(data7, Antagonism, by = "subjectID")

Detachment <- data7 %>% select(testID, subjectID, response, polarity, type) %>% filter(type == "detachment") %>% group_by(subjectID) %>% summarise(detachment = mean(as.integer(response)))
data7 <- left_join(data7, Detachment, by = "subjectID")

Disinhibition <- data7 %>% select(testID, subjectID, response, polarity, type) %>% filter(type == "disinhibition") %>% group_by(subjectID) %>% summarise(disinhibition = mean(as.integer(response)))
data7 <- left_join(data7, Disinhibition, by = "subjectID")

NegAff <- data7 %>% select(testID, subjectID, response, polarity, type) %>% filter(type == "negaffect") %>% group_by(subjectID) %>% summarise(negaffect = mean(as.integer(response)))
data7 <- left_join(data7, NegAff, by = "subjectID")

Psychoticism <- data7 %>% select(testID, subjectID, response, polarity, type) %>% filter(type == "psychoticism") %>% group_by(subjectID) %>% summarise(psychoticism = mean(as.integer(response)))
data7 <- left_join(data7, Psychoticism, by = "subjectID")

#standardized variables
data7$Age.z <- scale(data7$Age)
data7$ADS.z <- scale(data7$ADS)
data7$SD4total.z <- scale(data7$SD4.total)
data7$Mach.z <- scale(data7$SD4.Mach)
data7$Narc.z <- scale(data7$SD4.Narc)
data7$Psy.z <- scale(data7$SD4.Psy)
data7$Sad.z <- scale(data7$SD4.Sad)
data7$LPFStotal.z <- scale(data7$LPFS.total)
data7$LPFSself.z <- scale(data7$LPFS.self)
data7$LPFSother.z <- scale(data7$LPFS.other)
data7$PIDtotal.z <- scale(data7$PID.total)
data7$anancasm.z <- scale(data7$anancasm)
data7$antagonism.z <- scale(data7$antagonism)
data7$detachment.z <- scale(data7$detachment)
data7$disinhibition.z <- scale(data7$disinhibition)
data7$negaffect.z <- scale(data7$negaffect)
data7$psychoticism.z <- scale(data7$psychoticism)


#recode Sex (0/1)
data7$female <- recode(data7$Sex, male = 0, female = 1)

#table (each participant one row)
#with distinct()


#Verschiedene Zeitangaben .x/.y drinnen lassen zum Vergleich???????
#these individuals left the test and went on later on
#filter(data, testID == "SSTValidationV2" & (response == "POS" | response == "NEG")) %>%
#left_join(scales, by = "subjectID") %>% filter(source.x != source.y) %>% 
#select(subjectID) %>% distinct()
