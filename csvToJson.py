import csv
import json

wave_num = 6
fields = { "F115": "avoiding a fare on public transport",
"F116": "tax cheating",
"F117": "bribe accept",
"F118": "homosexuality",
"F119": "prostitution",
"F120": "abortion",
"F121": "divorce",
"F122": "euthanasia",
"F123": "suicide"}

data = {}
countries = {}
with open("wave.csv", "r") as csvfile:
	d = csv.reader(csvfile)
	cols = d.next()
	for line in d:
		continent = line[cols.index("continent")]
		wave = line[cols.index("wave")]
		name = line[cols.index("name")]
		c3 = line[cols.index("c3")]
		if c3 not in countries:
			countries[c3] = [line[cols.index("c2")], name, line[cols.index("continent")], line[cols.index("sum")]]
		if data.get(continent) is None:
			data[continent] = {}
		if data[continent].get(c3) is None:
			data[continent][c3] = [[] for i in range(wave_num)]
		for var in fields.keys():
			data[continent][c3][int(wave)-1].append({
				"axis": fields[var],
				"value": float(line[cols.index(var)])
				})

print countries
for continent in data:
	for country in data[continent]:
		for wave in data[continent][country]:
			if len(wave) != 0:
				continue
			for var in fields.keys():
				wave.append({
					"axis": fields[var],
					"value": 0
					})

with open("wave.json", "w") as wfile:
	json.dump(data, wfile)