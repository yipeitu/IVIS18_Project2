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
countries = []
with open("wave.csv", "r") as csvfile:
	d = csv.reader(csvfile)
	cols = d.next()
	for line in d:
		continent = line[cols.index("continent")]
		wave = line[cols.index("wave")]
		name = line[cols.index("name")]
		c3 = line[cols.index("c3")]
		if c3 not in countries:
			countries.append(c3)
		if data.get(continent) is None:
			data[continent] = {}
		if data.get(name) is None:
			data[continent][name] = [[] for i in range(wave_num)]
		for var in fields.keys():
			data[continent][name][int(wave)-1].append({
				"axis": fields[var],
				"value": float(line[cols.index(var)])
				})

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