library(data.table)
setwd("/Users/yipeitu/Desktop/DH2321 Visualization/Project 2/IVIS18_Project2/")
# load("/Users/yipeitu/Desktop/DH2321 Visualization/Project 2/WVS_Longitudinal_1981_2014_R_v2015_04_18.rdata")

# d = WVS_Longitudinal_1981_2014_R_v2015_04_18
country = c("AU", "BD", "BR", "CA", "CH", "CN", 
			"CO", "CY", "DE", "ES", "FI", "FR",
			"GB-GBN", "HK", "ID", "IL", "IN",
			"IR", "IT", "JP", "KR", "LB", "MX", 
			# "MY", "NG", "NL", "NO", "NZ", "PH",
			"RU", "SE", "SG", "TH", "TW", "US", "VE") 
questions = c("F115","F116", "F117", "F118", "F119", "F120", "F121", "F122", "F123",
"S002", "S003", "S009", "S020")

countryList = data.table(read.csv("coutry.csv"))
# questions = c("F115","F116", "F117", "F118", "F119", "F120", "F121", "F122", "F123",
# 	"E069_01", "E069_06", "E069_11", "E069_16", "E069_21", "E069_26", "E069_31", "E069_36", "E069_41", "E069_46", "E069_51", "E069_57", 
# "E069_02", "E069_07", "E069_12", "E069_17", "E069_22", "E069_27", "E069_32", "E069_37", "E069_42", "E069_47", "E069_52", "E069_58", 
# "E069_03", "E069_08", "E069_13", "E069_18", "E069_23", "E069_28", "E069_33", "E069_38", "E069_43", "E069_48", "E069_54", "E069_59", 
# "E069_04", "E069_09", "E069_14", "E069_19", "E069_24", "E069_29", "E069_34", "E069_39", "E069_44", "E069_49", "E069_55", "E069_60", 
# "E069_05", "E069_10", "E069_15", "E069_20", "E069_25", "E069_30", "E069_35", "E069_40", "E069_45", "E069_50", "E069_56",
# "S002", "S003", "S009", "S020")

temp = data.table(d[d$S009 %in% country, questions])
# temp = data.table(d[, questions])

# write.table(temp, file = "data.csv", sep = ",", row.names=FALSE)

cols = questions[which(!(questions %in% tail(questions,4)))]

for(col in cols) set(temp, i=which(temp[[col]]==-4), j=col, value=6)

temp[, sapply(.SD, function(x) list(mean = mean(x))), .SDcols = cols, by = list(S003, S009, S002)]


wave = temp[, sapply(.SD, function(x) list(mean = round(mean(x), 2))), .SDcols = cols, by=list(S003, S009, S002)]
names(wave) = c("code", "country", "wave", cols)
wave = merge(wave, countryList, by="code")
wave[, sum := rowSums(.SD, na.rm = TRUE), .SDcols = grep("F1", names(wave))] 

year = temp[, sapply(.SD, function(x) list(mean = round(mean(x), 2))), .SDcols = cols, by=list(S003, S009, S020)]
names(year) = c("code", "country", "year", cols)
year = merge(year, countryList, by="code")
year[, sum := rowSums(round(.SD, 2), na.rm = TRUE), .SDcols = grep("F1", names(year))] 

# countryAvg = year[, sapply(.SD, function(x) list(mean = mean(x))), .SDcols = cols, by=list(code)]
countryAvg = year[, sapply(.SD, function(x) list(mean = round(mean(x), 2))), .SDcols = c(cols, "sum"), by=list(code)]
names(countryAvg) = c("code", cols, "sum")
countryAvg = merge(countryAvg, countryList, by="code")

write.table(wave, file = "wave.csv", sep = ",", row.names=FALSE)
write.table(year, file = "year.csv", sep = ",", row.names=FALSE)
write.table(countryAvg, file="countryAvg.csv", sep = ",", row.names=FALSE)

# A025: 
# F115:	Justifiable: avoiding a fare on public transport 
# F116:	Justifiable: cheating on taxes 
# F117:	Justifiable: someone accepting a bribe 
# F118:	Justifiable: homosexuality 
# F119:	Justifiable: prostitution 
# F120:	Justifiable: abortion 
# F121:	Justifiable: divorce 
# F122:	Justifiable: euthanasia 
# F123:	Justifiable: suicide 
# G001: 
# G006: How proud of nationality 
# S002: wave
# S003: country code, http://161.111.170.202/herb/countrycodes.html
# S009: country name
# S020: year survey


c("F115","F116", "F117", "F118", "F119", "F120", "F121", "F122", "F123")
