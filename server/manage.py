from flask import url_for
from flask_script import Manager
from app import app


manager = Manager(app)

@manager.command
def list_routes():
	""" :link: http://flask.pocoo.org/snippets/117/ """

	import urllib
	output = []
	for rule in app.url_map.iter_rules():

		options = {}
		for arg in rule.arguments:
			options[arg] = "[{0}]".format(arg)

		methods = ','.join(rule.methods)
		url = url_for(rule.endpoint, **options)
		line = urllib.unquote("{:50s} {:20s} {}".format(rule.endpoint, methods, url))
		output.append(line)

	for line in sorted(output):
		print line


@manager.command
def run():
	app.run()


if __name__ == "__main__":
	manager.run()