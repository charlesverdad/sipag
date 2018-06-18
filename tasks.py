
from collections import Counter

from tools.windows import get_window_name

usage = Counter()

def log_usage():
	'''
	Increment window usage
	'''
	usage[get_window_name()] += 1

def update_storage():
	'''
	Save the current day's log into the storage
	'''
	pass
	# this could be a dump of `usage` into a *.json file or a full-fledged database.

