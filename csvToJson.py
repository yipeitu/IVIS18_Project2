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
country = []
with open("wave.csv", "r") as csvfile:
	d = csv.reader(csvfile)
	cols = d.next()
	for line in d:
		wave = line[cols.index("wave")]
		name = line[cols.index("name")]
		c3 = line[cols.index("c3")]
		if c3 not in country:
			country.append(c3)
		if data.get(name) is None:
			data[name] = [[] for i in range(wave_num)]
		for var in fields.keys():
			data[name][int(wave)-1].append({
				"axis": fields[var],
				"value": float(line[cols.index(var)])
				})
with open("wave.json", "w") as wfile:
	json.dump(data, wfile)